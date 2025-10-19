import { useState } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Clock,
  Calendar,
  Phone,
  Mail,
  Edit,
  MoreHorizontal,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Staff() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Sample staff data
  const staff = [
    {
      id: "ST001",
      name: "Dr. Nimal Fernando",
      role: "Lead Pharmacist",
      department: "Pharmacy",
      email: "nimal.fernando@medistore.com",
      phone: "077-123-4567",
      status: "active",
      shift: "morning",
      avatar: "/avatars/staff1.jpg",
      joinDate: "2020-03-15",
      lastActive: "2024-09-24 09:30",
      permissions: ["inventory_manage", "prescriptions_approve", "staff_view"],
      currentTask: "Reviewing pending prescriptions",
    },
    {
      id: "ST002",
      name: "Kamani Rajapaksa",
      role: "Senior Pharmacist",
      department: "Pharmacy",
      email: "kamani.rajapaksa@medistore.com",
      phone: "077-234-5678",
      status: "active",
      shift: "evening",
      avatar: "/avatars/staff2.jpg",
      joinDate: "2021-07-20",
      lastActive: "2024-09-24 08:45",
      permissions: ["inventory_view", "prescriptions_view", "sales"],
      currentTask: "Managing inventory updates",
    },
    {
      id: "ST003",
      name: "Ruwan Silva",
      role: "Pharmacy Assistant",
      department: "Pharmacy",
      email: "ruwan.silva@medistore.com",
      phone: "077-345-6789",
      status: "on-break",
      shift: "morning",
      avatar: "/avatars/staff3.jpg",
      joinDate: "2022-01-10",
      lastActive: "2024-09-24 10:15",
      permissions: ["inventory_view", "sales"],
      currentTask: "Customer service",
    },
    {
      id: "ST004",
      name: "Sita Wickramasinghe",
      role: "Inventory Manager",
      department: "Operations",
      email: "sita.wickramasinghe@osro.lk",
      phone: "077-456-7890",
      status: "off-duty",
      shift: "day",
      avatar: "/avatars/staff4.jpg",
      joinDate: "2019-11-05",
      lastActive: "2024-09-23 17:30",
      permissions: ["inventory_manage", "reports_view", "suppliers"],
      currentTask: "Stock audit completion",
    },
    {
      id: "ST005",
      name: "Priyantha Perera",
      role: "Cashier",
      department: "Sales",
      email: "priyantha.perera@osro.lk",
      phone: "077-567-8901",
      status: "active",
      shift: "evening",
      avatar: "/avatars/staff5.jpg",
      joinDate: "2023-04-12",
      lastActive: "2024-09-24 11:00",
      permissions: ["sales", "customer_service"],
      currentTask: "Processing customer payments",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case "on-break":
        return <Badge className="bg-warning text-warning-foreground">On Break</Badge>;
      case "off-duty":
        return <Badge variant="secondary">Off Duty</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getShiftBadge = (shift: string) => {
    switch (shift) {
      case "morning":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Morning</Badge>;
      case "evening":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Evening</Badge>;
      case "day":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Day</Badge>;
      case "night":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Night</Badge>;
      default:
        return <Badge variant="outline">{shift}</Badge>;
    }
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const staffStats = {
    total: staff.length,
    active: staff.filter(s => s.status === "active").length,
    onBreak: staff.filter(s => s.status === "on-break").length,
    offDuty: staff.filter(s => s.status === "off-duty").length,
  };

  const todaySchedule = [
    { time: "08:00 - 16:00", staff: "Dr. Nimal Fernando, Ruwan Silva", shift: "Morning Shift" },
    { time: "16:00 - 00:00", staff: "Kamani Rajapaksa, Priyantha Perera", shift: "Evening Shift" },
    { time: "00:00 - 08:00", staff: "Night duty staff", shift: "Night Shift" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Staff Management</h1>
        <p className="text-muted-foreground">
          Manage staff schedules, monitor activities, and assign roles and permissions
        </p>
      </div>

      {/* Staff Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold">{staffStats.total}</p>
                <p className="text-xs text-muted-foreground">Total Staff</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">{staffStats.active}</p>
                <p className="text-xs text-muted-foreground">Active Now</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">{staffStats.onBreak}</p>
                <p className="text-xs text-muted-foreground">On Break</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-300/20 bg-gray-50/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold text-muted-foreground">{staffStats.offDuty}</p>
                <p className="text-xs text-muted-foreground">Off Duty</p>
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
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Pharmacy">Pharmacy</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Staff Member
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      <Tabs defaultValue="staff" className="space-y-4">
        <TabsList>
          <TabsTrigger value="staff">All Staff</TabsTrigger>
          <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
          <TabsTrigger value="active">Active ({staffStats.active})</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStaff.map((member) => (
              <Card key={member.id} className="hover:shadow-card transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{member.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <p className="text-xs text-muted-foreground">{member.department}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          View Schedule
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Remove Access
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    {getStatusBadge(member.status)}
                    {getShiftBadge(member.shift)}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Last active: {member.lastActive}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium text-foreground">Current Task:</p>
                    <p className="text-xs text-muted-foreground">{member.currentTask}</p>
                  </div>

                  <div className="flex gap-1 flex-wrap">
                    {member.permissions.slice(0, 2).map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission.replace('_', ' ')}
                      </Badge>
                    ))}
                    {member.permissions.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{member.permissions.length - 2} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Schedule - September 24, 2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-medium">{schedule.shift}</h4>
                      <p className="text-sm text-muted-foreground">{schedule.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{schedule.staff}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {staff.filter(member => member.status === "active").map((member) => (
              <Card key={member.id} className="border-success/30 hover:shadow-card transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-success rounded-full border-2 border-white animate-pulse" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{member.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <Badge className="bg-success text-success-foreground mt-1">ACTIVE</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-success" />
                      <span className="text-muted-foreground">Active since: {member.lastActive}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-success/20">
                    <p className="text-sm font-medium text-foreground">Current Task:</p>
                    <p className="text-xs text-muted-foreground">{member.currentTask}</p>
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