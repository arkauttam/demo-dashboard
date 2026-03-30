import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  FileText,
  BarChart3,
  Settings,
  Mail,
  Calendar,
  X,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard", badge: null },
  { label: "Analytics", icon: BarChart3, path: "/dashboard/analytics", badge: null },
  { label: "eCommerce", icon: ShoppingCart, path: "/dashboard/ecommerce", badge: "New" },
  { label: "Users", icon: Users, path: "/dashboard/users", badge: null },

];

const DashboardSidebar = ({ collapsed, mobileOpen, onToggleMobile }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={onToggleMobile}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          ${collapsed ? "w-[70px]" : "w-[260px]"}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-5 border-b border-sidebar-border shrink-0">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-foreground"
              />
            </svg>
          </div>

          {!collapsed && (
            <span className="text-lg font-bold text-foreground tracking-tight">
              Dashboard
            </span>
          )}

          <button
            onClick={onToggleMobile}
            className="ml-auto lg:hidden text-muted-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
         

          <ul className="space-y-1">
            {menuItems.map((item) => {
              const active =
                item.path === "/dashboard"
                  ? location.pathname === "/dashboard"
                  : location.pathname.startsWith(item.path);

              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 h-10 rounded-md text-sm font-medium transition-colors
          ${active
                        ? "bg-primary text-primary-foreground sneat-shadow"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }
        `}
                  >
                    <item.icon size={20} className="shrink-0" />
                    {!collapsed && <span className="flex-1">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;