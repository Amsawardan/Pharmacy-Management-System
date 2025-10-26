import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  ShoppingCart
} from "lucide-react";
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

export default function Prescriptions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from API
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8082/orders');
      if (response.ok) {
        const ordersData = await response.json();
        // Transform API data to match expected format
        const transformedOrders = ordersData.map((order: any) => ({
          id: `ORD${order.orderId.toString().padStart(3, '0')}`,
          customerName: order.orderName || 'Unknown',
          customerId: `CUST${order.orderId.toString().padStart(3, '0')}`,
          orderType: "Prescription Order",
          issueDate: new Date().toISOString().split('T')[0], // Use current date or actual date from API if available
          status: 'pending', // Default status, can be enhanced with actual status field
          items: order.items?.map((item: any, index: number) => ({
            name: item.medicineName || `Medicine ${index + 1}`,
            quantity: item.quantity || 1,
            instructions: item.instructions || 'As prescribed'
          })) || [],
          totalAmount: order.orderVal || 0,
          priority: 'normal',
        }));
        setOrders(transformedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sample order data (fallback)
  const fallbackOrders = [
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
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => window.open('http://localhost:8082/adminorder.html', '_blank')}>
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
      </div>

      {/* Filters and Search */}
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
      </div>

      {/* Order Details Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Order Details ({filteredOrders.length} orders)
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <span className="ml-3 text-muted-foreground">Loading orders...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-xs text-muted-foreground">ID: {order.customerId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.orderType}</TableCell>
                      <TableCell>{order.issueDate}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.items.length} items</p>
                          <p className="text-xs text-muted-foreground">{order.items[0]?.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>LKR {order.totalAmount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}