import { useState } from "react";
import {
  TrendingUp, TrendingDown, Eye, MousePointer, Clock, Users,
  ArrowUpRight, ArrowDownRight, Activity,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const trafficData = [
  { month: "Jan", organic: 12400, paid: 5200, referral: 3100 },
  { month: "Feb", organic: 15800, paid: 6100, referral: 4200 },
  { month: "Mar", organic: 13200, paid: 4800, referral: 3800 },
  { month: "Apr", organic: 19500, paid: 7200, referral: 5100 },
  { month: "May", organic: 22100, paid: 8400, referral: 6200 },
  { month: "Jun", organic: 20300, paid: 7800, referral: 5600 },
  { month: "Jul", organic: 26700, paid: 9100, referral: 7400 },
];

const bounceData = [
  { day: "Mon", rate: 42 },
  { day: "Tue", rate: 38 },
  { day: "Wed", rate: 45 },
  { day: "Thu", rate: 35 },
  { day: "Fri", rate: 40 },
  { day: "Sat", rate: 52 },
  { day: "Sun", rate: 48 },
];

const pageData = [
  { page: "/home", views: 24500, unique: 18200, bounce: "38%", duration: "2m 14s" },
  { page: "/products", views: 18300, unique: 14100, bounce: "42%", duration: "3m 08s" },
  { page: "/about", views: 9200, unique: 7800, bounce: "55%", duration: "1m 32s" },
  { page: "/pricing", views: 15600, unique: 12400, bounce: "34%", duration: "4m 21s" },
  { page: "/blog", views: 11800, unique: 9600, bounce: "48%", duration: "5m 02s" },
];

const deviceData = [
  { name: "Desktop", value: 54, color: "hsl(258, 90%, 66%)" },
  { name: "Mobile", value: 36, color: "hsl(199, 89%, 48%)" },
  { name: "Tablet", value: 10, color: "hsl(38, 92%, 50%)" },
];

const stats = [
  { label: "Total Visitors", value: "84,320", change: "+18.2%", up: true, icon: Users, color: "bg-primary/10 text-primary" },
  { label: "Page Views", value: "241,800", change: "+22.4%", up: true, icon: Eye, color: "bg-info/10 text-info" },
  { label: "Avg. Session", value: "3m 42s", change: "+4.8%", up: true, icon: Clock, color: "bg-success/10 text-success" },
  { label: "Bounce Rate", value: "41.6%", change: "+2.1%", up: false, icon: Activity, color: "bg-warning/10 text-warning" },
];

const ranges = ["7D", "30D", "90D", "1Y"];

export default function Analytics() {
  const [activeRange, setActiveRange] = useState("30D");

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your site performance and visitor insights.</p>
        </div>
        <div className="flex gap-1 bg-secondary rounded-lg p-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeRange === r
                  ? "bg-card text-foreground sneat-shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
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

      {/* Traffic Sources Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        <div className="lg:col-span-4 bg-card rounded-lg p-5 sneat-shadow">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-foreground">Traffic Sources</h3>
            <p className="text-xs text-muted-foreground">Organic, paid & referral breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="gOrganic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(258, 90%, 66%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(258, 90%, 66%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gPaid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gRef" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 91%)", boxShadow: "0 2px 6px rgba(67,89,113,0.12)" }} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Area type="monotone" dataKey="organic" stroke="hsl(258, 90%, 66%)" fill="url(#gOrganic)" strokeWidth={2} />
              <Area type="monotone" dataKey="paid" stroke="hsl(199, 89%, 48%)" fill="url(#gPaid)" strokeWidth={2} />
              <Area type="monotone" dataKey="referral" stroke="hsl(142, 71%, 45%)" fill="url(#gRef)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bounce Rate */}
        <div className="lg:col-span-3 bg-card rounded-lg p-5 sneat-shadow">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-foreground">Bounce Rate</h3>
            <p className="text-xs text-muted-foreground">Daily bounce percentage</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={bounceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} axisLine={false} tickLine={false} domain={[25, 60]} />
              <Tooltip formatter={(v) => [`${v}%`, "Bounce Rate"]} contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 91%)" }} />
              <Line type="monotone" dataKey="rate" stroke="hsl(258, 90%, 66%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(258, 90%, 66%)" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Device Breakdown */}
        <div className="lg:col-span-2 bg-card rounded-lg p-5 sneat-shadow">
          <h3 className="text-base font-semibold text-foreground mb-1">Device Breakdown</h3>
          <p className="text-xs text-muted-foreground mb-5">Traffic by device type</p>
          <div className="space-y-4">
            {deviceData.map((d) => (
              <div key={d.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-foreground font-medium">{d.name}</span>
                  <span className="text-muted-foreground">{d.value}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${d.value}%`, backgroundColor: d.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border">
            <div className="grid grid-cols-3 gap-2 text-center">
              {deviceData.map((d) => (
                <div key={d.name}>
                  <p className="text-lg font-bold text-foreground">{d.value}%</p>
                  <p className="text-xs text-muted-foreground">{d.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="lg:col-span-3 bg-card rounded-lg p-5 sneat-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">Top Pages</h3>
              <p className="text-xs text-muted-foreground">Most visited pages this period</p>
            </div>
            <button className="text-xs text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left pb-2 font-medium">Page</th>
                  <th className="text-right pb-2 font-medium">Views</th>
                  <th className="text-right pb-2 font-medium hidden sm:table-cell">Unique</th>
                  <th className="text-right pb-2 font-medium hidden md:table-cell">Bounce</th>
                  <th className="text-right pb-2 font-medium">Duration</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((p) => (
                  <tr key={p.page} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 font-mono text-xs text-primary">{p.page}</td>
                    <td className="py-3 text-right text-foreground font-medium">{p.views.toLocaleString()}</td>
                    <td className="py-3 text-right text-muted-foreground hidden sm:table-cell">{p.unique.toLocaleString()}</td>
                    <td className="py-3 text-right hidden md:table-cell">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        parseInt(p.bounce) < 40
                          ? "bg-success/10 text-success"
                          : parseInt(p.bounce) < 50
                          ? "bg-warning/10 text-warning"
                          : "bg-destructive/10 text-destructive"
                      }`}>{p.bounce}</span>
                    </td>
                    <td className="py-3 text-right text-muted-foreground">{p.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}