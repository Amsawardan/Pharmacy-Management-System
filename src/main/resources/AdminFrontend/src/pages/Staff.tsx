import { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Clock,
  Phone,
  Mail,
  Edit,
  Trash2,
  MoreHorizontal
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
import AddStaffDialog from "@/components/Staff/AddStaffDialog";
import EditStaffDialog from "@/components/Staff/EditStaffDialog";
import DeleteStaffDialog from "@/components/Staff/DeleteStaffDialog";

export default function Staff() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  // Fetch staff data from API
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8082/admin/all');
      
      if (response.ok) {
        const staffData = await response.json();
        setStaff(staffData);
      } else {
        // Fallback to sample data if API fails
        setStaff(getSampleStaffData());
      }
    } catch (error) {
      console.error('Error fetching staff data:', error);
      // Fallback to sample data if API fails
      setStaff(getSampleStaffData());
    } finally {
      setLoading(false);
    }
  };

  const getSampleStaffData = () => [
    // Sample data removed - starting with empty staff list
  ];


  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.staffID.toString().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });


  const staffStats = {
    total: staff.length,
  };

  const handleStaffAdded = (newStaff: any) => {
    setStaff(prevStaff => [...prevStaff, newStaff]);
  };

  const handleEditStaff = (staffMember: any) => {
    setSelectedStaff(staffMember);
    setEditDialogOpen(true);
  };

  const handleDeleteStaff = (staffMember: any) => {
    setSelectedStaff(staffMember);
    setDeleteDialogOpen(true);
  };

  const handleStaffUpdated = (updatedStaff: any) => {
    setStaff(prevStaff => 
      prevStaff.map(member => 
        member.staffID === updatedStaff.staffID ? updatedStaff : member
      )
    );
  };

  const handleStaffDeleted = (staffId: number) => {
    setStaff(prevStaff => prevStaff.filter(member => member.staffID !== staffId));
  };


  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage staff schedules, monitor activities, and assign roles and permissions
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading staff data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Staff Management</h1>
        <p className="text-muted-foreground">
          Manage staff members, view information, and add new staff
        </p>
      </div>

      {/* Staff Summary Cards */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
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
          <AddStaffDialog onStaffAdded={handleStaffAdded} />
        </div>
      </div>

      {/* Staff List */}
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredStaff.map((member) => (
            <Card key={member.staffID} className="hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {member.fullName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{member.fullName}</CardTitle>
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
                      <DropdownMenuItem onClick={() => handleEditStaff(member)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDeleteStaff(member)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Access
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
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
                    <span className="text-muted-foreground">Last active: {new Date(member.lastActive).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Staff Dialog */}
      <EditStaffDialog
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        staff={selectedStaff}
        onStaffUpdated={handleStaffUpdated}
      />

      {/* Delete Staff Dialog */}
      <DeleteStaffDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        staff={selectedStaff}
        onStaffDeleted={handleStaffDeleted}
      />
    </div>
  );
}