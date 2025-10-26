import { useState, useEffect } from "react";
import { 
  Package, 
  Search, 
  Plus, 
  Filter, 
  AlertTriangle, 
  Calendar
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
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8082/api/medicines/list');
      if (response.ok) {
        const medicinesData = await response.json();
        setMedicines(medicinesData);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  const inventory = medicines.map(med => ({
    id: med.id,
    name: med.name,
    category: med.category,
    stock: med.stock || 0,
    minStock: 10, // Assuming min stock level
    price: med.price || 0,
    expiry: med.expiryDate || 'N/A',
    supplier: `Supplier ID: ${med.supplierId || 'N/A'}`,
    status: med.stock > 10 ? 'in-stock' : med.stock > 0 ? 'low-stock' : 'out-of-stock',
    batchNo: med.batchNo || 'N/A'
  }));

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
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      item.name.toLowerCase().includes(searchLower) ||
      item.id.toString().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      item.batchNo.toLowerCase().includes(searchLower) ||
      item.supplier.toLowerCase().includes(searchLower);
    const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const stockSummary = {
    total: inventory.length,
    inStock: inventory.filter(item => item.stock > item.minStock).length,
    lowStock: inventory.filter(item => item.stock <= item.minStock && item.stock > 0).length,
    outOfStock: inventory.filter(item => item.stock === 0).length,
    expiringSoon: inventory.filter(item => item.status === "expiring-soon").length,
  };

  // Get unique categories from medicines
  const uniqueCategories = Array.from(new Set(inventory.map(item => item.category))).sort();

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
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => window.open('http://localhost:8082/Medicine.html', '_blank')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Medicine
        </Button>
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
                  <TableHead>Batch No</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <span className="ml-3 text-muted-foreground">Loading medicines...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredInventory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No medicines found. Add medicines to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInventory.map((item) => (
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
                      <TableCell>LKR {item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.expiry}</TableCell>
                      <TableCell>{getStatusBadge(item.status, item.stock, item.minStock)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.batchNo}</TableCell>
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