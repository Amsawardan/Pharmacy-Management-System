import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  DollarSign, 
  Package, 
  Users, 
  UserCheck,
  UserCircle,
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
  const navigate = useNavigate();
  const [totalStaff, setTotalStaff] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalMedicines, setTotalMedicines] = useState<number>(0);
  const [lowStockMedicines, setLowStockMedicines] = useState<any[]>([]);
  const [expiredMedicines, setExpiredMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch staff statistics
      const staffResponse = await fetch('http://localhost:8082/admin/statistics');
      if (staffResponse.ok) {
        const staffStats = await staffResponse.json();
        setTotalStaff(staffStats.total || 0);
      }

      // Fetch users data
      const usersResponse = await fetch('http://localhost:8082/user');
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setTotalUsers(usersData.length || 0);
      }

      // Fetch medicines data
      const medicinesResponse = await fetch('http://localhost:8082/api/medicines/list');
      if (medicinesResponse.ok) {
        const medicinesData = await medicinesResponse.json();
        setTotalMedicines(medicinesData.length || 0);
      }

      // Fetch low stock medicines
      const lowStockResponse = await fetch('http://localhost:8082/api/medicines/low-stock');
      if (lowStockResponse.ok) {
        const lowStockData = await lowStockResponse.json();
        setLowStockMedicines(lowStockData || []);
      }

      // Fetch expired medicines
      const expiredResponse = await fetch('http://localhost:8082/api/medicines/expired');
      if (expiredResponse.ok) {
        const expiredData = await expiredResponse.json();
        setExpiredMedicines(expiredData || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

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
      value: loading ? "..." : totalMedicines.toString(),
      description: "All medicines in inventory",
      icon: <Package className="h-4 w-4" />,
    },
    {
      title: "Total Staff",
      value: loading ? "..." : totalStaff.toString(),
      description: "All staff members",
      icon: <UserCheck className="h-4 w-4" />,
    },
    {
      title: "Total Users",
      value: loading ? "..." : totalUsers.toString(),
      description: "All registered users",
      icon: <UserCircle className="h-4 w-4" />,
    },
  ];

  const alerts = [
    {
      title: "Low Stock Alert",
      count: lowStockMedicines.length,
      description: "Medicines running low",
      icon: <AlertTriangle className="h-5 w-5" />,
      severity: "medium" as const,
    },
    {
      title: "Expiry Alert",
      count: expiredMedicines.length,
      description: "Medicines expiring soon",
      icon: <Calendar className="h-5 w-5" />,
      severity: "low" as const,
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
          <MetricCard 
            key={index} 
            {...metric} 
            onClick={
              metric.title === "Total Users" ? () => navigate('/users') :
              metric.title === "Total Medicines" ? () => window.open('http://localhost:8082/home.html', '_blank') :
              undefined
            }
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Alerts */}
        <div className="space-y-4 md:col-span-2">
          <h2 className="text-xl font-semibold text-primary">System Alerts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {alerts.map((alert, index) => (
              <AlertCard
                key={index}
                {...alert}
                onAction={() => {}}
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