import { useState } from "react";
import {
  ShoppingCart, Package, RefreshCw, Star, ArrowUpRight, ArrowDownRight,
  TrendingUp, DollarSign, Filter, Search,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const salesTrendData = [
  { month: "Jan", orders: 320, returns: 28 },
  { month: "Feb", orders: 410, returns: 35 },
  { month: "Mar", orders: 380, returns: 22 },
  { month: "Apr", orders: 520, returns: 41 },
  { month: "May", orders: 610, returns: 38 },
  { month: "Jun", orders: 570, returns: 30 },
  { month: "Jul", orders: 740, returns: 52 },
];

const categoryRevenue = [
  { name: "Electronics", revenue: 42000, color: "hsl(258, 90%, 66%)" },
  { name: "Fashion", revenue: 31000, color: "hsl(199, 89%, 48%)" },
  { name: "Grocery", revenue: 24000, color: "hsl(142, 71%, 45%)" },
  { name: "Home", revenue: 18000, color: "hsl(38, 92%, 50%)" },
  { name: "Sports", revenue: 14000, color: "hsl(350, 89%, 60%)" },
];

const topProducts = [
  { id: 1, name: "iPhone 15 Pro", category: "Electronics", price: "$999", sold: 284, revenue: "$283,716", rating: 4.8, stock: "In Stock" },
  { id: 2, name: "Nike Air Max 90", category: "Fashion", price: "$149", sold: 512, revenue: "$76,288", rating: 4.6, stock: "Low Stock" },
  { id: 3, name: "MacBook Pro 14\"", category: "Electronics", price: "$1,999", sold: 98, revenue: "$195,902", rating: 4.9, stock: "In Stock" },
  { id: 4, name: "Organic Coffee Set", category: "Grocery", price: "$34", sold: 1204, revenue: "$40,936", rating: 4.7, stock: "In Stock" },
  { id: 5, name: "Yoga Mat Pro", category: "Sports", price: "$89", sold: 341, revenue: "$30,349", rating: 4.5, stock: "Out of Stock" },
];

const recentOrders = [
  { id: "#ORD-8821", customer: "Sarah Kim", product: "iPhone 15 Pro", amount: "$999", status: "Delivered" },
  { id: "#ORD-8820", customer: "James Patel", product: "Yoga Mat Pro", amount: "$89", status: "Shipped" },
  { id: "#ORD-8819", customer: "Emma Davis", product: "MacBook Pro 14\"", amount: "$1,999", status: "Processing" },
  { id: "#ORD-8818", customer: "Liam Chen", product: "Nike Air Max 90", amount: "$149", status: "Delivered" },
  { id: "#ORD-8817", customer: "Olivia Ruiz", product: "Organic Coffee Set", amount: "$34", status: "Cancelled" },
];

const stats = [
  { label: "Total Sales", value: "$128,450", change: "+14.2%", up: true, icon: DollarSign, color: "bg-primary/10 text-primary" },
  { label: "Total Orders", value: "3,550", change: "+9.6%", up: true, icon: ShoppingCart, color: "bg-success/10 text-success" },
  { label: "Return Rate", value: "6.2%", change: "-1.4%", up: true, icon: RefreshCw, color: "bg-info/10 text-info" },
  { label: "Avg. Order Value", value: "$84.30", change: "+3.8%", up: true, icon: TrendingUp, color: "bg-warning/10 text-warning" },
];

const statusColor = {
  Delivered: "bg-success/10 text-success",
  Shipped: "bg-info/10 text-info",
  Processing: "bg-warning/10 text-warning",
  Cancelled: "bg-destructive/10 text-destructive",
};

const stockColor = {
  "In Stock": "text-success",
  "Low Stock": "text-warning",
  "Out of Stock": "text-destructive",
};

export default function ECommerce() {
  const [search, setSearch] = useState("");

  const filtered = topProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">eCommerce</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your store, products, and orders.</p>
        </div>
        
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
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
        {/* Orders vs Returns */}
        <div className="lg:col-span-4 bg-card rounded-lg p-5 sneat-shadow">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-foreground">Orders vs Returns</h3>
            <p className="text-xs text-muted-foreground">Monthly comparison</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={salesTrendData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 91%)", boxShadow: "0 2px 6px rgba(67,89,113,0.12)" }} />
              <Bar dataKey="orders" fill="hsl(258, 90%, 66%)" radius={[6, 6, 0, 0]} barSize={20} name="Orders" />
              <Bar dataKey="returns" fill="hsl(350, 89%, 60%)" radius={[6, 6, 0, 0]} barSize={20} name="Returns" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Category */}
        <div className="lg:col-span-3 bg-card rounded-lg p-5 sneat-shadow">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-foreground">Revenue by Category</h3>
            <p className="text-xs text-muted-foreground">Sales distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryRevenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} width={70} />
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 91%)" }} />
              <Bar dataKey="revenue" radius={[0, 6, 6, 0]} barSize={16}>
                {categoryRevenue.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryRevenue.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-muted-foreground flex-1">{c.name}</span>
                <span className="font-semibold text-foreground">${c.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-card rounded-lg p-5 sneat-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-semibold text-foreground">Top Products</h3>
            <p className="text-xs text-muted-foreground">Best performing products this month</p>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-2 text-sm bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary w-52"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left pb-3 font-medium">Product</th>
                <th className="text-left pb-3 font-medium hidden sm:table-cell">Category</th>
                <th className="text-right pb-3 font-medium">Price</th>
                <th className="text-right pb-3 font-medium hidden md:table-cell">Sold</th>
                <th className="text-right pb-3 font-medium hidden lg:table-cell">Revenue</th>
                <th className="text-center pb-3 font-medium hidden sm:table-cell">Rating</th>
                <th className="text-center pb-3 font-medium">Stock</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3.5 font-medium text-foreground">{p.name}</td>
                  <td className="py-3.5 hidden sm:table-cell">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{p.category}</span>
                  </td>
                  <td className="py-3.5 text-right text-foreground">{p.price}</td>
                  <td className="py-3.5 text-right text-muted-foreground hidden md:table-cell">{p.sold.toLocaleString()}</td>
                  <td className="py-3.5 text-right font-semibold text-foreground hidden lg:table-cell">{p.revenue}</td>
                  <td className="py-3.5 text-center hidden sm:table-cell">
                    <span className="flex items-center justify-center gap-1 text-xs text-warning font-medium">
                      <Star size={12} className="fill-warning stroke-none" /> {p.rating}
                    </span>
                  </td>
                  <td className="py-3.5 text-center">
                    <span className={`text-xs font-medium ${stockColor[p.stock]}`}>{p.stock}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-lg p-5 sneat-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-foreground">Recent Orders</h3>
            <p className="text-xs text-muted-foreground">Latest customer orders</p>
          </div>
          <button className="text-xs text-primary font-medium hover:underline">View All</button>
        </div>
        <div className="space-y-2">
          {recentOrders.map((o) => (
            <div key={o.id} className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{o.customer}</p>
                <p className="text-xs text-muted-foreground">{o.product} · <span className="font-mono">{o.id}</span></p>
              </div>
              <span className="text-sm font-semibold text-foreground">{o.amount}</span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${statusColor[o.status]}`}>{o.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}