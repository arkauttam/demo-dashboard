import {
  DollarSign,
  TrendingUp,
  Users,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 18000, expenses: 12000 },
  { month: "Feb", revenue: 22000, expenses: 14000 },
  { month: "Mar", revenue: 19500, expenses: 11000 },
  { month: "Apr", revenue: 27000, expenses: 16000 },
  { month: "May", revenue: 31000, expenses: 18000 },
  { month: "Jun", revenue: 28000, expenses: 15000 },
  { month: "Jul", revenue: 35000, expenses: 20000 },
];

const weeklyData = [
  { day: "Mon", sales: 45 },
  { day: "Tue", sales: 52 },
  { day: "Wed", sales: 38 },
  { day: "Thu", sales: 65 },
  { day: "Fri", sales: 48 },
  { day: "Sat", sales: 72 },
  { day: "Sun", sales: 58 },
];

const pieData = [
  { name: "Electronics", value: 35, color: "hsl(258, 90%, 66%)" },
  { name: "Fashion", value: 25, color: "hsl(142, 71%, 45%)" },
  { name: "Grocery", value: 20, color: "hsl(199, 89%, 48%)" },
  { name: "Others", value: 20, color: "hsl(38, 92%, 50%)" },
];

const transactions = [
  { id: 1, name: "Stripe Payment", amount: "+$2,450", status: "Completed", type: "up" },
  { id: 2, name: "PayPal Refund", amount: "-$450", status: "Pending", type: "down" },
  { id: 3, name: "Bank Transfer", amount: "+$5,200", status: "Completed", type: "up" },
  { id: 4, name: "Apple Pay", amount: "+$890", status: "Completed", type: "up" },
  { id: 5, name: "Wire Transfer", amount: "-$1,200", status: "Failed", type: "down" },
];

const stats = [
  { label: "Total Revenue", value: "$42,580", change: "+12.5%", up: true, icon: DollarSign, color: "bg-primary/10 text-primary" },
  { label: "Total Orders", value: "1,284", change: "+8.2%", up: true, icon: ShoppingCart, color: "bg-success/10 text-success" },
  { label: "New Customers", value: "856", change: "+5.1%", up: true, icon: Users, color: "bg-info/10 text-info" },
  { label: "Growth Rate", value: "28.6%", change: "-2.4%", up: false, icon: TrendingUp, color: "bg-warning/10 text-warning" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back, John! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-lg p-5 sneat-shadow animate-fade-in">
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-4 bg-card rounded-lg p-5 sneat-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">Revenue Overview</h3>
              <p className="text-xs text-muted-foreground">Monthly revenue & expenses</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(258, 90%, 66%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(258, 90%, 66%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 91%)", boxShadow: "0 2px 6px rgba(67,89,113,0.12)" }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(258, 90%, 66%)" fill="url(#colorRevenue)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" stroke="hsl(38, 92%, 50%)" fill="url(#colorExpenses)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Sales */}
        <div className="lg:col-span-3 bg-card rounded-lg p-5 sneat-shadow">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-foreground">Weekly Sales</h3>
            <p className="text-xs text-muted-foreground">Daily order count</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 91%)" }} />
              <Bar dataKey="sales" fill="hsl(258, 90%, 66%)" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Category Distribution */}
        <div className="lg:col-span-2 bg-card rounded-lg p-5 sneat-shadow">
          <h3 className="text-base font-semibold text-foreground mb-1">Sales by Category</h3>
          <p className="text-xs text-muted-foreground mb-4">Product category breakdown</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={4}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 91%)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-semibold text-foreground ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-3 bg-card rounded-lg p-5 sneat-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">Recent Transactions</h3>
              <p className="text-xs text-muted-foreground">Latest payment activities</p>
            </div>
            <button className="text-xs text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${tx.type === "up" ? "bg-success/10" : "bg-destructive/10"}`}>
                  {tx.type === "up" ? (
                    <ArrowUpRight size={18} className="text-success" />
                  ) : (
                    <ArrowDownRight size={18} className="text-destructive" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{tx.name}</p>
                  <p className={`text-xs font-medium ${
                    tx.status === "Completed" ? "text-success" : tx.status === "Pending" ? "text-warning" : "text-destructive"
                  }`}>{tx.status}</p>
                </div>
                <span className={`text-sm font-semibold ${tx.type === "up" ? "text-success" : "text-destructive"}`}>
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
