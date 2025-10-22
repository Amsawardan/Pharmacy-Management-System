import { useState } from "react";
import { 
  Package, 
  Search, 
  Plus, 
  Filter, 
  AlertTriangle, 
  Calendar,
  Edit,
  Trash2,
  Eye
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

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Sample inventory data removed - starting with empty inventory
  const inventory = [];

  const getStatusBadge = (status: string, stock: number, minStock: number) => {
    if (stock === 0) {
      return <Badge className="bg-red-700 text-white">Out of Stock</Badge>;
    } else if (stock <= minStock) {
      return <Badge className="bg-red-700 text-white">Low Stock</Badge>;
    } else if (status === "expiring-soon") {
      return <Badge className="bg-yellow-700 text-white">Expiring Soon</Badge>;
    } else {
      return <Badge className="bg-green-700 text-white">In Stock</Badge>;
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const stockSummary = {
    total: inventory.length,
    inStock: inventory.filter(item => item.stock > item.minStock).length,
    lowStock: inventory.filter(item => item.stock <= item.minStock && item.stock > 0).length,
    outOfStock: inventory.filter(item => item.stock === 0).length,
    expiringSoon: inventory.filter(item => item.status === "expiring-soon").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Inventory Management</h1>
        <p className="text-muted-foreground">
          Manage your pharmacy stock, track medicine availability, and monitor expiry dates
        </p>
      </div>

      {/* Stock Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stockSummary.total}</p>
                <p className="text-xs text-muted-foreground">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-success rounded-full" />
              <div>
                <p className="text-2xl font-bold text-success">{stockSummary.inStock}</p>
                <p className="text-xs text-muted-foreground">In Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">{stockSummary.lowStock}</p>
                <p className="text-xs text-muted-foreground">Low Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-destructive rounded-full" />
              <div>
                <p className="text-2xl font-bold text-destructive">{stockSummary.outOfStock}</p>
                <p className="text-xs text-muted-foreground">Out of Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-alert-expiry/20 bg-alert-expiry/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-alert-expiry" />
              <div>
                <p className="text-2xl font-bold text-alert-expiry">{stockSummary.expiringSoon}</p>
                <p className="text-xs text-muted-foreground">Expiring Soon</p>
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
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Pain Relief">Pain Relief</SelectItem>
              <SelectItem value="Antibiotics">Antibiotics</SelectItem>
              <SelectItem value="Cardiovascular">Cardiovascular</SelectItem>
              <SelectItem value="Vitamins">Vitamins</SelectItem>
              <SelectItem value="Respiratory">Respiratory</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => window.open('http://localhost:8082/Medicine.html', '_blank')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Medicine
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Medicine Inventory ({filteredInventory.length} items)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price (LKR)</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.supplier}</p>
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.stock}</p>
                        <p className="text-xs text-muted-foreground">Min: {item.minStock}</p>
                      </div>
                    </TableCell>
                    <TableCell>{item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.expiry}</TableCell>
                    <TableCell>{getStatusBadge(item.status, item.stock, item.minStock)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}