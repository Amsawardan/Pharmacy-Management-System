import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  Building,
  Users,
  Shield,
  Bell,
  Database,
  Palette,
  Globe,
  Save,
  Edit,
  Key,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitch } from "@/components/ui/theme-switch";

export default function Settings() {
  const [pharmacyInfo, setPharmacyInfo] = useState({
    name: "MediStore",
    address: "123 Main Street, Colombo 07, Sri Lanka",
    phone: "0771089061",
    email: "info@medistore.com",
    licenseNumber: "PH-2024-001",
    establishedYear: "2019",
    description: "Leading pharmacy management system providing quality healthcare services",
  });

  const [notifications, setNotifications] = useState({
    lowStockAlerts: true,
    expiryAlerts: true,
    salesReports: true,
    staffSchedule: false,
    systemUpdates: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const userRoles = [
    {
      id: "admin",
      name: "Administrator",
      description: "Full system access and management",
      permissions: ["all"],
      userCount: 2,
      color: "destructive",
    },
    {
      id: "pharmacist",
      name: "Lead Pharmacist",
      description: "Prescription management and inventory oversight",
      permissions: ["prescriptions", "inventory", "reports"],
      userCount: 3,
      color: "primary",
    },
    {
      id: "staff",
      name: "Pharmacy Staff",
      description: "Daily operations and customer service",
      permissions: ["sales", "customer_service", "basic_inventory"],
      userCount: 7,
      color: "secondary",
    },
  ];

  const systemSettings = {
    autoBackup: true,
    backupFrequency: "daily",
    dataRetention: "2-years",
    timezone: "Asia/Colombo",
    language: "english",
    currency: "LKR",
    taxRate: "18",
    lowStockThreshold: "20",
    expiryWarningDays: "90",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Settings</h1>
        <p className="text-muted-foreground">
          Manage pharmacy information, user permissions, and system configuration
        </p>
      </div>

      <Tabs defaultValue="pharmacy" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="pharmacy">Pharmacy Info</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="pharmacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Pharmacy Information
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Update your pharmacy's basic information and contact details
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pharmacy-name">Pharmacy Name</Label>
                  <Input
                    id="pharmacy-name"
                    value={pharmacyInfo.name}
                    onChange={(e) => setPharmacyInfo({ ...pharmacyInfo, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="license-number">License Number</Label>
                  <Input
                    id="license-number"
                    value={pharmacyInfo.licenseNumber}
                    onChange={(e) => setPharmacyInfo({ ...pharmacyInfo, licenseNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={pharmacyInfo.address}
                  onChange={(e) => setPharmacyInfo({ ...pharmacyInfo, address: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="phone"
                      value={pharmacyInfo.phone}
                      onChange={(e) => setPharmacyInfo({ ...pharmacyInfo, phone: e.target.value })}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      value={pharmacyInfo.email}
                      onChange={(e) => setPharmacyInfo({ ...pharmacyInfo, email: e.target.value })}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="established">Established Year</Label>
                  <Input
                    id="established"
                    value={pharmacyInfo.establishedYear}
                    onChange={(e) => setPharmacyInfo({ ...pharmacyInfo, establishedYear: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={pharmacyInfo.description}
                  onChange={(e) => setPharmacyInfo({ ...pharmacyInfo, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                User Roles & Permissions
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage user roles and their access permissions
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userRoles.map((role) => (
                  <div key={role.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{role.name}</h4>
                          <Badge variant={role.color as any}>{role.userCount} users</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                        <div className="flex gap-1 mt-2">
                          {role.permissions.slice(0, 3).map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission.replace('_', ' ')}
                            </Badge>
                          ))}
                          {role.permissions.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Permissions
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Users
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex gap-2">
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Add New Role
                </Button>
                <Button variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Permission Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure how and when you receive notifications
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="low-stock">Low Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when inventory is running low</p>
                  </div>
                  <Switch
                    id="low-stock"
                    checked={notifications.lowStockAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, lowStockAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="expiry">Expiry Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about medicines nearing expiry</p>
                  </div>
                  <Switch
                    id="expiry"
                    checked={notifications.expiryAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, expiryAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sales-reports">Sales Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive daily and weekly sales summaries</p>
                  </div>
                  <Switch
                    id="sales-reports"
                    checked={notifications.salesReports}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, salesReports: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="staff-schedule">Staff Schedule Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about staff schedule changes</p>
                  </div>
                  <Switch
                    id="staff-schedule"
                    checked={notifications.staffSchedule}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, staffSchedule: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-updates">System Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about system maintenance</p>
                  </div>
                  <Switch
                    id="system-updates"
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, systemUpdates: checked })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Channels</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, smsNotifications: checked })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
                <Button variant="outline">Test Notifications</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                System Configuration
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure system-wide settings and preferences
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue={systemSettings.timezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Colombo">Asia/Colombo (UTC+5:30)</SelectItem>
                      <SelectItem value="Asia/Dhaka">Asia/Dhaka (UTC+6:00)</SelectItem>
                      <SelectItem value="Asia/Karachi">Asia/Karachi (UTC+5:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue={systemSettings.language}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="sinhala">Sinhala</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Theme</Label>
                  <ThemeSwitch showLabel={true} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue={systemSettings.currency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LKR">Sri Lankan Rupee (LKR)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input
                    id="tax-rate"
                    defaultValue={systemSettings.taxRate}
                    placeholder="18"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
                  <Input
                    id="low-stock-threshold"
                    defaultValue={systemSettings.lowStockThreshold}
                    placeholder="20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiry-warning">Expiry Warning (Days)</Label>
                  <Input
                    id="expiry-warning"
                    defaultValue={systemSettings.expiryWarningDays}
                    placeholder="90"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Backup & Data Retention</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-backup">Automatic Backup</Label>
                    <p className="text-sm text-muted-foreground">Enable automatic data backup</p>
                  </div>
                  <Switch
                    id="auto-backup"
                    defaultChecked={systemSettings.autoBackup}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue={systemSettings.backupFrequency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Every Hour</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Data Retention</Label>
                    <Select defaultValue={systemSettings.dataRetention}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-year">1 Year</SelectItem>
                        <SelectItem value="2-years">2 Years</SelectItem>
                        <SelectItem value="5-years">5 Years</SelectItem>
                        <SelectItem value="indefinite">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Backup Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security Settings
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage security policies and access controls
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <Badge className="bg-success text-success-foreground">Enabled</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Additional security layer for user accounts
                  </p>
                  <Button variant="outline" size="sm">Configure 2FA</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Password Policy</h4>
                    <Badge variant="outline">Standard</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Minimum 8 characters, uppercase, lowercase, and numbers required
                  </p>
                  <Button variant="outline" size="sm">Update Policy</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Session Timeout</h4>
                    <Badge variant="outline">30 minutes</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Automatic logout after period of inactivity
                  </p>
                  <Button variant="outline" size="sm">Change Timeout</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">IP Restrictions</h4>
                    <Badge variant="secondary">Not Configured</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Restrict access to specific IP addresses or ranges
                  </p>
                  <Button variant="outline" size="sm">Configure IPs</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Audit & Logging</h4>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <Label>User Activity Logging</Label>
                      <p className="text-xs text-muted-foreground">Track user actions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <Label>Failed Login Attempts</Label>
                      <p className="text-xs text-muted-foreground">Log failed logins</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <Label>Data Access Logs</Label>
                      <p className="text-xs text-muted-foreground">Track data access</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <Label>System Changes</Label>
                      <p className="text-xs text-muted-foreground">Log system modifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
                <Button variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Audit
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}