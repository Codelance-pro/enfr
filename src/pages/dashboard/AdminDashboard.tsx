import { motion } from "framer-motion";
import { Package, Users, TrendingUp, DollarSign, Activity, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  { icon: Package, label: "Total Products", value: "10,234", change: "+12%", color: "text-primary" },
  { icon: Users, label: "Active Vendors", value: "542", change: "+8%", color: "text-accent" },
  { icon: ShoppingCart, label: "Orders Today", value: "1,234", change: "+23%", color: "text-success" },
  { icon: DollarSign, label: "Revenue", value: "₹45.2L", change: "+15%", color: "text-warning" },
];

const revenueData = [
  { month: "Jan", revenue: 30 },
  { month: "Feb", revenue: 45 },
  { month: "Mar", revenue: 38 },
  { month: "Apr", revenue: 52 },
  { month: "May", revenue: 48 },
  { month: "Jun", revenue: 65 },
];

const categoryData = [
  { name: "Software", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Hardware", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Services", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Furniture", value: 20, color: "hsl(var(--chart-4))" },
];

const recentOrders = [
  { id: "#12345", vendor: "Tech Solutions", amount: "₹99,999", status: "Completed" },
  { id: "#12346", vendor: "Office Supplies", amount: "₹45,500", status: "Processing" },
  { id: "#12347", vendor: "Industrial Corp", amount: "₹2,49,999", status: "Pending" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your platform performance</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    <span className="text-sm font-medium text-success">{stat.change}</span>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div className="flex-1">
                      <div className="font-semibold">{order.id}</div>
                      <div className="text-sm text-muted-foreground">{order.vendor}</div>
                    </div>
                    <div className="text-right mr-8">
                      <div className="font-semibold">{order.amount}</div>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "Completed"
                            ? "bg-success/10 text-success"
                            : order.status === "Processing"
                            ? "bg-warning/10 text-warning"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
