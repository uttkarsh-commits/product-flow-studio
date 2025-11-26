import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  ClipboardCheck,
  Settings,
  BarChart3,
  PlayCircle,
  Activity,
  Cog,
  Package,
  Store,
  Trophy
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Upload Product", url: "/upload", icon: Upload },
  { title: "Review & Approve", url: "/review", icon: ClipboardCheck },
  { title: "Products by Store", url: "/products-by-store", icon: Store },
  { title: "Winner Tracking", url: "/winner-tracking", icon: Trophy },
  { title: "KPI Rules", url: "/kpi-rules", icon: Settings },
  { title: "KPI Dashboard", url: "/kpi-dashboard", icon: BarChart3 },
  { title: "Lifecycle Simulation", url: "/simulation", icon: PlayCircle },
  { title: "Activity Logs", url: "/logs", icon: Activity },
  { title: "Background Worker", url: "/worker", icon: Cog },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground p-2 rounded-lg">
              <Package className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-semibold text-sidebar-foreground">Product Manager</span>
                <span className="text-xs text-sidebar-foreground/70">Lifecycle System</span>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
