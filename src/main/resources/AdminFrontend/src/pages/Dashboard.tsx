import { 
  DollarSign, 
  Package, 
  Users, 
  TrendingUp,
  AlertTriangle,
  Calendar,
  Clock,
  ShoppingCart,
  Pill,
  FileText,
  Heart
} from "lucide-react";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { AlertCard } from "@/components/Dashboard/AlertCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // Sample data - in real app, this would come from API
  const metrics = [
    {
      title: "Today's Sales",
      value: "LKR 125,430",
      description: "15 transactions completed",
      icon: <DollarSign className="h-4 w-4" />,
      trend: { value: 12, isPositive: true },
      variant: "success" as const,
    },
    {
      title: "Total Medicines",
      value: "1,248",
      description: "847 in stock, 401 low stock",
      icon: <Package className="h-4 w-4" />,
      trend: { value: 5, isPositive: false },
    },
    {
      title: "Active Staff",
      value: "12",
      description: "8 on duty, 4 off duty",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Monthly Revenue",
      value: "LKR 2.8M",
      description: "Target: LKR 3.2M",
      icon: <TrendingUp className="h-4 w-4" />,
      trend: { value: 8, isPositive: true },
      variant: "success" as const,
    },
  ];

  const alerts = [
    {
      title: "Low Stock Alert",
      count: 15,
      description: "Medicines running low",
      icon: <AlertTriangle className="h-5 w-5" />,
      actionText: "View Low Stock",
      severity: "medium" as const, // Red for low stock
      items: [
        { name: "Paracetamol 500mg", detail: "5 remaining" },
        { name: "Amoxicillin 250mg", detail: "3 remaining" },
        { name: "Ibuprofen 400mg", detail: "8 remaining" },
      ],
    },
    {
      title: "Expiry Alert",
      count: 8,
      description: "Medicines expiring soon",
      icon: <Calendar className="h-5 w-5" />,
      actionText: "View Expiring Items",
      severity: "low" as const, // Yellow for expired soon
      items: [
        { name: "Aspirin 100mg", detail: "Expires in 5 days" },
        { name: "Vitamin C", detail: "Expires in 10 days" },
        { name: "Cough Syrup", detail: "Expires in 15 days" },
      ],
    },
    {
      title: "Pending Orders",
      count: 6,
      description: "Awaiting approval",
      icon: <FileText className="h-5 w-5" />,
      actionText: "Review Orders",
      severity: "low" as const,
      items: [
        { name: "Order #ORD001", detail: "Kamal Silva" },
        { name: "Order #ORD002", detail: "Sita Perera" },
        { name: "Order #ORD003", detail: "Ruwan Jayasinghe" },
      ],
    },
  ];

  const recentActivities = [
    {
      type: "sale",
      description: "Sale completed - Invoice #INV001",
      time: "2 minutes ago",
      icon: <ShoppingCart className="h-4 w-4 text-success" />,
    },
    {
      type: "prescription",
      description: "New prescription added by Dr. Silva",
      time: "15 minutes ago",
      icon: <FileText className="h-4 w-4 text-secondary" />,
    },
    {
      type: "stock",
      description: "Stock updated for Paracetamol 500mg",
      time: "30 minutes ago",
      icon: <Package className="h-4 w-4 text-warning" />,
    },
    {
      type: "staff",
      description: "Staff member clocked in - John Doe",
      time: "1 hour ago",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to Raj Pharmacy Management System - Real-time overview of your operations
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Alerts */}
        <div className="space-y-4 md:col-span-2">
          <h2 className="text-xl font-semibold text-primary">System Alerts</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {alerts.map((alert, index) => (
              <AlertCard
                key={index}
                {...alert}
                onAction={() => console.log(`Action for ${alert.title}`)}
              />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">Quick Stats</h2>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Pill className="h-4 w-4 text-primary" />
                Stock Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>In Stock</span>
                  <span className="font-medium text-green-700">68%</span>
                </div>
                <Progress value={68} className="h-2 bg-green-700" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Low Stock</span>
                  <span className="font-medium text-red-500">25%</span>
                </div>
                <Progress value={25} className="h-2 bg-red-700" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Out of Stock</span>
                  <span className="font-medium text-destructive">7%</span>
                </div>
                <Progress value={7} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-success">Online</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Services</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-success">Online</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Backup System</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-success">Online</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-primary">Recent Activity</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                <div className="flex-shrink-0">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}