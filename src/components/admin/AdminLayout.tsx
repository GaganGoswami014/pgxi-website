import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logoDark from "@/assets/logo-dark.png";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/blog", icon: FileText, label: "Blog" },
  { to: "/admin/leads", icon: Users, label: "Leads" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out", description: "You have been logged out." });
    navigate("/login");
  };

  const SidebarContent = () => (
    <nav className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-4 py-5 border-b border-white/10 flex items-center gap-3">
        <img
          src={logoDark}
          alt="PG-XI Creatives"
          className={cn("shrink-0 transition-all", sidebarOpen || mobileSidebarOpen ? "h-10" : "h-8")}
        />
      </div>

      {/* Nav items */}
      <div className="flex-1 py-4 px-2 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileSidebarOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="w-4 h-4 shrink-0" />
                {(sidebarOpen || mobileSidebarOpen) && (
                  <>
                    <span className="flex-1">{label}</span>
                    {isActive && <ChevronRight className="w-3 h-3" />}
                  </>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* User info + logout */}
      <div className="p-3 border-t border-white/10">
        {(sidebarOpen || mobileSidebarOpen) && (
          <div className="mb-3 px-2">
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Signed in as</p>
            <p className="text-white/70 text-xs truncate">{user?.email}</p>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className={cn(
            "w-full text-white/60 hover:text-white hover:bg-white/10 justify-start gap-3",
            !sidebarOpen && !mobileSidebarOpen && "justify-center"
          )}
          size="sm"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {(sidebarOpen || mobileSidebarOpen) && "Sign Out"}
        </Button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col shrink-0 transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-56" : "w-16"
        )}
        style={{ background: "hsl(var(--admin-sidebar-bg))" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <aside
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ background: "hsl(var(--admin-sidebar-bg))" }}
      >
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileSidebarOpen(false)}
            className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header
          className="h-14 flex items-center gap-4 px-4 border-b border-border shrink-0"
          style={{ background: "hsl(var(--admin-header-bg))" }}
        >
          {/* Toggle sidebar (desktop) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-4 h-4" />
          </Button>

          {/* Toggle sidebar (mobile) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-4 h-4" />
          </Button>

          {/* Page title */}
          {title && (
            <h1 className="text-sm font-semibold text-foreground">{title}</h1>
          )}

          <div className="ml-auto flex items-center gap-2">
            {/* Gold accent tag */}
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
              Admin
            </span>

            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
