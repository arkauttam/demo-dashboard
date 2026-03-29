import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Users, UserCheck, UserX, UserPlus, Search,
    ArrowUpRight, ArrowDownRight, Mail, MoreHorizontal, Shield,
} from "lucide-react";
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer,
} from "recharts";

// shadcn/ui
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

// ─── Zod Schema ───────────────────────────────────────────────────────────────
const addUserSchema = z
    .object({
        firstName: z
            .string()
            .min(2, "First name must be at least 2 characters")
            .max(30, "First name must be at most 30 characters")
            .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters"),

        lastName: z
            .string()
            .min(2, "Last name must be at least 2 characters")
            .max(30, "Last name must be at most 30 characters")
            .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters"),

        email: z
            .string()
            .min(1, "Email is required")
            .email("Please enter a valid email address"),

        role: z.enum(["Admin", "Editor", "Customer"], {
            required_error: "Please select a role",
        }),

        status: z.enum(["Active", "Inactive"], {
            required_error: "Please select a status",
        }),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),

        confirmPassword: z.string().min(1, "Please confirm your password"),

    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// ─── Static data ──────────────────────────────────────────────────────────────
const growthData = [
    { month: "Jan", new: 120, churned: 18 },
    { month: "Feb", new: 145, churned: 22 },
    { month: "Mar", new: 132, churned: 15 },
    { month: "Apr", new: 198, churned: 30 },
    { month: "May", new: 215, churned: 25 },
    { month: "Jun", new: 187, churned: 20 },
    { month: "Jul", new: 264, churned: 28 },
];

const activityData = [
    { day: "Mon", active: 1840 },
    { day: "Tue", active: 2120 },
    { day: "Wed", active: 1960 },
    { day: "Thu", active: 2480 },
    { day: "Fri", active: 2200 },
    { day: "Sat", active: 1580 },
    { day: "Sun", active: 1350 },
];

const initialUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", joined: "Jan 12, 2024", orders: 42, avatar: "AJ" },
    { id: 2, name: "Bob Martinez", email: "bob@example.com", role: "Customer", status: "Active", joined: "Feb 8, 2024", orders: 15, avatar: "BM" },
    { id: 3, name: "Carol White", email: "carol@example.com", role: "Customer", status: "Inactive", joined: "Mar 3, 2024", orders: 7, avatar: "CW" },
    { id: 4, name: "David Lee", email: "david@example.com", role: "Editor", status: "Active", joined: "Apr 19, 2024", orders: 28, avatar: "DL" },
    { id: 5, name: "Eva Brown", email: "eva@example.com", role: "Customer", status: "Active", joined: "May 5, 2024", orders: 33, avatar: "EB" },
    { id: 6, name: "Frank Kim", email: "frank@example.com", role: "Customer", status: "Suspended", joined: "Jun 14, 2024", orders: 2, avatar: "FK" },
    { id: 7, name: "Grace Patel", email: "grace@example.com", role: "Editor", status: "Active", joined: "Jul 1, 2024", orders: 19, avatar: "GP" },
    { id: 8, name: "Henry Zhao", email: "henry@example.com", role: "Customer", status: "Active", joined: "Jul 22, 2024", orders: 11, avatar: "HZ" },
];

const avatarColors = [
    "bg-primary/20 text-primary",
    "bg-success/20 text-success",
    "bg-info/20 text-info",
    "bg-warning/20 text-warning",
    "bg-destructive/20 text-destructive",
];

const statusStyles = {
    Active: "bg-success/10 text-success",
    Inactive: "bg-secondary text-muted-foreground",
    Suspended: "bg-destructive/10 text-destructive",
};

const roleStyles = {
    Admin: "bg-primary/10 text-primary",
    Editor: "bg-info/10 text-info",
    Customer: "bg-secondary text-muted-foreground",
};

const statsBase = [
    { label: "Total Users", value: "12,480", change: "+11.4%", up: true, icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Active Users", value: "9,842", change: "+8.9%", up: true, icon: UserCheck, color: "bg-success/10 text-success" },
    { label: "New This Month", value: "264", change: "+22.1%", up: true, icon: UserPlus, color: "bg-info/10 text-info" },
    { label: "Churned", value: "28", change: "+4.2%", up: false, icon: UserX, color: "bg-destructive/10 text-destructive" },
];

const TABLE_FILTERS = ["All", "Active", "Inactive", "Suspended"];

// ─── Add User Dialog ───────────────────────────────────────────────────────────
function AddUserDialog({ open, onOpenChange, onAdd }) {
    const form = useForm({
        resolver: zodResolver(addUserSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            role: undefined,
            status: "Active",
            password: "",
            confirmPassword: "",
        },
    });

    const { formState: { isSubmitting } } = form;

    function onSubmit(values) {
        const initials =
            values.firstName[0].toUpperCase() + values.lastName[0].toUpperCase();
        const today = new Date().toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
        });
        onAdd({
            id: Date.now(),
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            role: values.role,
            status: values.status,
            joined: today,
            orders: 0,
            avatar: initials,
        });
        form.reset();
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <UserPlus size={16} className="text-primary" />
                        </div>
                        Add New User
                    </DialogTitle>

                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-2">

                        {/* Personal Info */}
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                Personal Information
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Alice" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Johnson" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address <span className="text-destructive">*</span></FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="alice@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Separator />

                        {/* Role & Status */}
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                Role & Permissions
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role <span className="text-destructive">*</span></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Admin">
                                                        <div className="flex items-center gap-2">
                                                            <Shield size={12} className="text-primary" /> Admin
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="Editor">Editor</SelectItem>
                                                    <SelectItem value="Customer">Customer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription className="text-xs">
                                                Controls access level.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status <span className="text-destructive">*</span></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Active">
                                                        <span className="flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-success inline-block" />
                                                            Active
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="Inactive">
                                                        <span className="flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-muted-foreground inline-block" />
                                                            Inactive
                                                        </span>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Security */}
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                Security
                            </p>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                Min 8 chars · uppercase · number · special character.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Separator />



                        <DialogFooter className="gap-2 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => { form.reset(); onOpenChange(false); }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="gap-2">
                                <UserPlus size={15} />
                                {isSubmitting ? "Adding…" : "Add User"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function UsersPage() {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [dialogOpen, setDialogOpen] = useState(false);

    const filtered = users.filter((u) => {
        const matchSearch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
        const matchFilter = activeFilter === "All" || u.status === activeFilter;
        return matchSearch && matchFilter;
    });

    function handleAddUser(newUser) {
        setUsers((prev) => [newUser, ...prev]);
    }

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Users</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage your user base and permissions.</p>
                </div>
                <Button onClick={() => setDialogOpen(true)} className="flex items-center gap-2">
                    <UserPlus size={16} /> Add User
                </Button>
            </div>

            <AddUserDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={handleAddUser} />

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {statsBase.map((stat) => (
                    <div key={stat.label} className="bg-card rounded-lg p-5 sneat-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.up ? "text-success" : "text-destructive"}`}>
                                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                <div className="lg:col-span-4 bg-card rounded-lg p-5 sneat-shadow">
                    <div className="mb-4">
                        <h3 className="text-base font-semibold text-foreground">User Growth</h3>
                        <p className="text-xs text-muted-foreground">New signups vs churned users</p>
                    </div>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={growthData} barGap={4}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 91%)", boxShadow: "0 2px 6px rgba(67,89,113,0.12)" }} />
                            <Bar dataKey="new" fill="hsl(258, 90%, 66%)" radius={[6, 6, 0, 0]} barSize={20} name="New Users" />
                            <Bar dataKey="churned" fill="hsl(350, 89%, 60%)" radius={[6, 6, 0, 0]} barSize={20} name="Churned" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="lg:col-span-3 bg-card rounded-lg p-5 sneat-shadow">
                    <div className="mb-4">
                        <h3 className="text-base font-semibold text-foreground">Daily Active Users</h3>
                        <p className="text-xs text-muted-foreground">Logged-in users per day</p>
                    </div>
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={activityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 91%)" }} />
                            <Line type="monotone" dataKey="active" stroke="hsl(258, 90%, 66%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(258, 90%, 66%)" }} activeDot={{ r: 6 }} name="Active Users" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-card rounded-lg p-5 sneat-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                    <div>
                        <h3 className="text-base font-semibold text-foreground">All Users</h3>
                        <p className="text-xs text-muted-foreground">{filtered.length} users found</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex gap-1 bg-secondary rounded-lg p-1">
                            {TABLE_FILTERS.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeFilter === f
                                            ? "bg-card text-foreground sneat-shadow"
                                            : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-8 pr-4 py-2 text-sm bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary w-48"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-xs text-muted-foreground border-b border-border">
                                <th className="text-left pb-3 font-medium">User</th>
                                <th className="text-left pb-3 font-medium hidden md:table-cell">Role</th>
                                <th className="text-center pb-3 font-medium">Status</th>
                                <th className="text-right pb-3 font-medium hidden sm:table-cell">Joined</th>
                                <th className="text-right pb-3 font-medium hidden lg:table-cell">Orders</th>
                                <th className="text-center pb-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((u, i) => (
                                <tr key={u.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                                    <td className="py-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                                                {u.avatar}
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{u.name}</p>
                                                <p className="text-xs text-muted-foreground">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 hidden md:table-cell">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 w-fit ${roleStyles[u.role]}`}>
                                            {u.role === "Admin" && <Shield size={10} />}
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="py-3 text-center">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[u.status] ?? "bg-secondary text-muted-foreground"}`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="py-3 text-right text-muted-foreground text-xs hidden sm:table-cell">{u.joined}</td>
                                    <td className="py-3 text-right font-medium text-foreground hidden lg:table-cell">{u.orders}</td>
                                    <td className="py-3 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <button className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                                                <Mail size={14} />
                                            </button>
                                            <button className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                                                <MoreHorizontal size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">Showing {filtered.length} of {users.length} users</p>
                    <div className="flex gap-1">
                        <button className="px-3 py-1.5 text-xs rounded-md border border-border text-muted-foreground hover:bg-secondary transition-colors">Prev</button>
                        <button className="px-3 py-1.5 text-xs rounded-md bg-primary text-primary-foreground">1</button>
                        <button className="px-3 py-1.5 text-xs rounded-md border border-border text-muted-foreground hover:bg-secondary transition-colors">2</button>
                        <button className="px-3 py-1.5 text-xs rounded-md border border-border text-muted-foreground hover:bg-secondary transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}