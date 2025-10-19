import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  BarChart3,
  Settings,
  Pill,
  AlertTriangle,
  History,
  ClipboardCheck,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    name: "Order",
    href: "/orders",
    icon: FileText,
  },
  {
    name: "Staff",
    href: "/staff",
    icon: Users,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const quickActions = [
  {
    name: "Low Stock Alert",
    href: "/inventory/alerts",
    icon: AlertTriangle,
    badge: "5",
  },
  {
    name: "Expiry Alert",
    href: "/inventory/expiry",
    icon: Pill,
    badge: "12",
  },
  {
    name: "Recent Orders",
    href: "/orders/recent",
    icon: ClipboardCheck,
  },
  {
    name: "Transaction History",
    href: "/transactions",
    icon: History,
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 transform bg-card border-r transition-transform duration-300 ease-in-out md:relative md:top-0 md:h-[calc(100vh-4rem)] md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            <div className="space-y-1">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Main Menu
              </h2>
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-muted-foreground"
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-6 space-y-1">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Quick Actions
              </h2>
              {quickActions.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => onClose()}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </div>
                  {item.badge && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* System Info */}
          <div className="border-t p-4">
            <div className="rounded-lg bg-gradient-primary p-3 text-primary-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-medium">System Online</span>
              </div>
              <p className="text-xs opacity-90 mt-1">All services running</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}