import { motion } from "framer-motion";
import { Package, TrendingUp, ShoppingCart, Eye, Plus, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const stats = [
  { icon: Package, label: "Active Products", value: "24", color: "text-primary" },
  { icon: ShoppingCart, label: "Orders", value: "142", color: "text-accent" },
  { icon: TrendingUp, label: "Revenue", value: "₹8.5L", color: "text-success" },
  { icon: Eye, label: "Profile Views", value: "1,234", color: "text-warning" },
];

const products = [
  { id: 1, name: "Enterprise Software License", stock: 50, price: "₹99,999", status: "Active" },
  { id: 2, name: "Industrial Equipment", stock: 12, price: "₹2,49,999", status: "Active" },
  { id: 3, name: "Office Furniture Set", stock: 0, price: "₹75,999", status: "Out of Stock" },
  { id: 4, name: "Network Security System", stock: 8, price: "₹3,49,999", status: "Active" },
];

const recentInvoices = [
  { id: "INV-001", date: "2024-01-15", amount: "₹99,999", status: "Paid" },
  { id: "INV-002", date: "2024-01-14", amount: "₹2,49,999", status: "Pending" },
  { id: "INV-003", date: "2024-01-13", amount: "₹1,75,500", status: "Paid" },
];

export default function VendorDashboard() {
  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Vendor Dashboard</h1>
            <p className="text-muted-foreground">Manage your products and track performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
            <Button className="gap-2 bg-gradient-primary">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
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
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Products</CardTitle>
              <Button variant="outline" size="sm">Manage All</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.status === "Active" ? "default" : "secondary"}
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Invoices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Invoices</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div className="flex-1">
                      <div className="font-semibold">{invoice.id}</div>
                      <div className="text-sm text-muted-foreground">{invoice.date}</div>
                    </div>
                    <div className="text-right mr-8">
                      <div className="font-semibold">{invoice.amount}</div>
                    </div>
                    <div>
                      <Badge variant={invoice.status === "Paid" ? "default" : "secondary"}>
                        {invoice.status}
                      </Badge>
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
