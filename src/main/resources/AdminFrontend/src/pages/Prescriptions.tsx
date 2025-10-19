import { useState } from "react";
import { 
  FileText, 
  Search, 
  Plus, 
  Filter, 
  User, 
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Prescriptions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample order data
  const orders = [
    {
      id: "ORD001",
      customerName: "Kamal Silva",
      customerId: "CUST001",
      orderType: "Prescription Order",
      issueDate: "2024-09-24",
      status: "pending",
      items: [
        { name: "Amoxicillin 500mg", quantity: 21, instructions: "1 tablet 3 times daily for 7 days" },
        { name: "Paracetamol 500mg", quantity: 20, instructions: "1-2 tablets every 6 hours as needed" }
      ],
      totalAmount: 265.50,
      priority: "normal",
    },
    {
      id: "ORD002",
      customerName: "Sita Perera",
      customerId: "CUST002",
      orderType: "Prescription Order",
      issueDate: "2024-09-24",
      status: "approved",
      items: [
        { name: "Aspirin 100mg", quantity: 30, instructions: "1 tablet daily after meals" },
        { name: "Atorvastatin 20mg", quantity: 30, instructions: "1 tablet at bedtime" }
      ],
      totalAmount: 156.25,
      priority: "high",
    },
    {
      id: "ORD003",
      customerName: "Ruwan Jayasinghe",
      customerId: "CUST003",
      orderType: "Prescription Order",
      issueDate: "2024-09-23",
      status: "completed",
      items: [
        { name: "Insulin Glargine", quantity: 1, instructions: "10 units subcutaneous injection daily" },
        { name: "Metformin 500mg", quantity: 60, instructions: "1 tablet twice daily with meals" }
      ],
      totalAmount: 2450.00,
      priority: "urgent",
    },
    {
      id: "ORD004",
      customerName: "Mala Wickramasinghe",
      customerId: "CUST004",
      orderType: "Prescription Order",
      issueDate: "2024-09-23",
      status: "cancelled",
      items: [
        { name: "Codeine 30mg", quantity: 20, instructions: "1 tablet every 4 hours as needed" }
      ],
      totalAmount: 180.00,
      priority: "normal",
      cancellationReason: "Controlled substance - additional authorization required",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-700 text-white">Approved</Badge>;
      case "completed":
        return <Badge className="bg-primary text-primary-foreground">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "high":
        return <Badge className="bg-alert-low-stock text-white">High</Badge>;
      case "normal":
        return <Badge variant="outline">Normal</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    approved: orders.filter(o => o.status === "approved").length,
    completed: orders.filter(o => o.status === "completed").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Order Management</h1>
        <p className="text-muted-foreground">
          Manage customer orders, process prescriptions, and track order fulfillment
        </p>
      </div>

      {/* Order Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold">{orderStats.total}</p>
                <p className="text-xs text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">{orderStats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">{orderStats.approved}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-primary rounded-full" />
              <div>
                <p className="text-2xl font-bold text-primary">{orderStats.completed}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-2xl font-bold text-destructive">{orderStats.cancelled}</p>
                <p className="text-xs text-muted-foreground">Cancelled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Orders Content */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending" className="text-warning">Pending ({orderStats.pending})</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                All Orders ({filteredOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Order Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount (LKR)</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customerName}</p>
                            <p className="text-xs text-muted-foreground">ID: {order.customerId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.orderType}</p>
                          </div>
                        </TableCell>
                        <TableCell>{order.issueDate}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.items.length} items</p>
                            <p className="text-xs text-muted-foreground">{order.items[0]?.name}</p>
                          </div>
                        </TableCell>
                        <TableCell>{order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            {order.status === "pending" && (
                              <>
                                <Button variant="ghost" size="icon" className="text-success hover:text-success">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {orders.filter(o => o.status === "pending").map((order) => (
              <Card key={order.id} className="border-warning/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-warning" />
                        {order.id} - {order.customerName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Type: {order.orderType} • Date: {order.issueDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(order.priority)}
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Order Items:</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-start p-2 bg-muted/30 rounded">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.instructions}</p>
                            </div>
                            <p className="text-sm font-medium">Qty: {item.quantity}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <p className="font-semibold">Total Amount: LKR {order.totalAmount.toFixed(2)}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm">
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-4">
          <div className="grid gap-4">
            {orders.filter(o => o.priority === "urgent").map((order) => (
              <Card key={order.id} className="border-destructive/30 animate-pulse-glow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-destructive">
                        <Badge variant="destructive">URGENT</Badge>
                        {order.id} - {order.customerName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Type: {order.orderType} • Date: {order.issueDate}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Order Items:</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-start p-2 bg-destructive/10 rounded border border-destructive/20">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.instructions}</p>
                            </div>
                            <p className="text-sm font-medium">Qty: {item.quantity}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <p className="font-semibold">Total Amount: LKR {order.totalAmount.toFixed(2)}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Process Immediately
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

    </div>
  );
}