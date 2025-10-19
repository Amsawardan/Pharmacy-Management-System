import { useState } from "react";
import { 
  BarChart3, 
  Download, 
  Calendar,
  TrendingUp,
  DollarSign,
  Package,
  FileText,
  Filter,
  Eye,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function Reports() {
  const [dateRange, setDateRange] = useState("last-30-days");
  const [reportType, setReportType] = useState("all");

  // Sample reports data
  const availableReports = [
    {
      id: "RPT001",
      name: "Daily Sales Report",
      type: "sales",
      description: "Comprehensive daily sales analysis with transaction details",
      generatedDate: "2024-09-24",
      period: "September 24, 2024",
      size: "1.2 MB",
      format: "PDF",
      status: "ready",
      metrics: {
        totalSales: "LKR 125,430",
        transactions: 45,
        avgTransaction: "LKR 2,787",
      },
    },
    {
      id: "RPT002",
      name: "Monthly Inventory Report",
      type: "inventory",
      description: "Stock levels, low stock alerts, and inventory movement analysis",
      generatedDate: "2024-09-23",
      period: "September 2024",
      size: "2.8 MB",
      format: "Excel",
      status: "ready",
      metrics: {
        totalItems: 1248,
        lowStock: 15,
        outOfStock: 8,
      },
    },
    {
      id: "RPT003",
      name: "Prescription Analytics",
      type: "prescriptions",
      description: "Prescription trends, doctor analysis, and medication patterns",
      generatedDate: "2024-09-22",
      period: "August 2024",
      size: "1.8 MB",
      format: "PDF",
      status: "ready",
      metrics: {
        totalPrescriptions: 156,
        approved: 142,
        rejected: 14,
      },
    },
    {
      id: "RPT004",
      name: "Staff Performance Report",
      type: "staff",
      description: "Staff productivity, hours worked, and performance metrics",
      generatedDate: "2024-09-21",
      period: "August 2024",
      size: "945 KB",
      format: "PDF",
      status: "ready",
      metrics: {
        totalStaff: 12,
        activeHours: 1840,
        efficiency: "94%",
      },
    },
    {
      id: "RPT005",
      name: "Financial Summary",
      type: "financial",
      description: "Revenue, expenses, profit analysis and financial health overview",
      generatedDate: "2024-09-20",
      period: "Q3 2024",
      size: "3.2 MB",
      format: "Excel",
      status: "processing",
      metrics: {
        totalRevenue: "LKR 2.8M",
        profit: "LKR 420K",
        growth: "+12%",
      },
    },
  ];

  const quickReports = [
    {
      name: "Today's Sales Summary",
      icon: <DollarSign className="h-5 w-5" />,
      description: "Real-time sales data for today",
      action: "Generate Now",
      type: "instant",
    },
    {
      name: "Current Stock Levels",
      icon: <Package className="h-5 w-5" />,
      description: "Live inventory status report",
      action: "Generate Now",
      type: "instant",
    },
    {
      name: "Pending Prescriptions",
      icon: <FileText className="h-5 w-5" />,
      description: "All pending prescription approvals",
      action: "Generate Now",
      type: "instant",
    },
    {
      name: "Weekly Performance",
      icon: <TrendingUp className="h-5 w-5" />,
      description: "7-day business performance overview",
      action: "Generate Now",
      type: "instant",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-success text-success-foreground">Ready</Badge>;
      case "processing":
        return <Badge className="bg-warning text-warning-foreground">Processing</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sales":
        return <DollarSign className="h-4 w-4 text-success" />;
      case "inventory":
        return <Package className="h-4 w-4 text-secondary" />;
      case "prescriptions":
        return <FileText className="h-4 w-4 text-primary" />;
      case "staff":
        return <TrendingUp className="h-4 w-4 text-warning" />;
      case "financial":
        return <BarChart3 className="h-4 w-4 text-destructive" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const filteredReports = availableReports.filter(report => {
    return reportType === "all" || report.type === reportType;
  });

  const reportStats = {
    total: availableReports.length,
    ready: availableReports.filter(r => r.status === "ready").length,
    processing: availableReports.filter(r => r.status === "processing").length,
    thisMonth: availableReports.filter(r => r.generatedDate.includes("2024-09")).length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Generate, view, and export comprehensive business reports
        </p>
      </div>

      {/* Report Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold">{reportStats.total}</p>
                <p className="text-xs text-muted-foreground">Total Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-success rounded-full" />
              <div>
                <p className="text-2xl font-bold text-success">{reportStats.ready}</p>
                <p className="text-xs text-muted-foreground">Ready for Download</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-warning rounded-full animate-pulse" />
              <div>
                <p className="text-2xl font-bold text-warning">{reportStats.processing}</p>
                <p className="text-xs text-muted-foreground">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{reportStats.thisMonth}</p>
                <p className="text-xs text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">All Reports</TabsTrigger>
          <TabsTrigger value="quick">Quick Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sales">Sales Reports</SelectItem>
                  <SelectItem value="inventory">Inventory Reports</SelectItem>
                  <SelectItem value="prescriptions">Prescription Reports</SelectItem>
                  <SelectItem value="staff">Staff Reports</SelectItem>
                  <SelectItem value="financial">Financial Reports</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full sm:w-48">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="this-quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>

          {/* Reports Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-card transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(report.type)}
                      <div>
                        <CardTitle className="text-base">{report.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                    </div>
                    {getStatusBadge(report.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Period:</span>
                      <span className="font-medium">{report.period}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Generated:</span>
                      <span className="font-medium">{report.generatedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium">{report.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format:</span>
                      <Badge variant="outline">{report.format}</Badge>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="pt-3 border-t space-y-2">
                    <p className="text-sm font-medium">Key Metrics:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(report.metrics).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1" disabled={report.status !== "ready"}>
                      <Download className="h-3 w-3 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quick" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Report Generation</CardTitle>
              <p className="text-sm text-muted-foreground">
                Generate instant reports for immediate business insights
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {quickReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="text-primary">{report.icon}</div>
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                    </div>
                    <Button size="sm">
                      {report.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <p className="text-sm text-muted-foreground">
                Create custom reports with specific date ranges and filters
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Report Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales Analysis</SelectItem>
                      <SelectItem value="inventory">Inventory Report</SelectItem>
                      <SelectItem value="prescriptions">Prescription Summary</SelectItem>
                      <SelectItem value="staff">Staff Performance</SelectItem>
                      <SelectItem value="financial">Financial Overview</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Date Range</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Format</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1">
                  Generate Custom Report
                </Button>
                <Button variant="outline">
                  Save as Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <p className="text-sm text-muted-foreground">
                Automatically generated reports delivered on schedule
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Daily Sales Summary</h4>
                    <p className="text-sm text-muted-foreground">Generated every day at 9:00 PM</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-success text-success-foreground">Active</Badge>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Weekly Inventory Report</h4>
                    <p className="text-sm text-muted-foreground">Generated every Monday at 8:00 AM</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-success text-success-foreground">Active</Badge>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Monthly Financial Summary</h4>
                    <p className="text-sm text-muted-foreground">Generated on the 1st of each month</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Paused</Badge>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule New Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}