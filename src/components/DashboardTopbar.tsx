import { Bell, Search, Menu, User, LogOut, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface TopbarProps {
  onToggleSidebar: () => void;
}

const DashboardTopbar = ({ onToggleSidebar }: TopbarProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  const handleProfile = () => {
    console.log("Navigate to profile");
    // navigate("/profile");
    setIsUserMenuOpen(false);
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 sneat-shadow sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="lg:hidden text-muted-foreground hover:text-foreground transition-colors">
          <Menu size={22} />
        </button>
        <div className="hidden sm:flex items-center gap-2 bg-secondary rounded-md px-3 h-9 w-64">
          <Search size={16} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative w-9 h-9 rounded-md hover:bg-secondary flex items-center justify-center transition-colors">
          <Bell size={20} className="text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        
        {/* User Menu Dropdown */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 hover:bg-secondary rounded-md px-2 py-1.5 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={16} className="text-primary" />
            </div>
            <span className="hidden md:block text-sm font-medium text-foreground">John Doe</span>
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-card rounded-md shadow-lg border border-border overflow-hidden animate-fade-in">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground mt-0.5">john.doe@example.com</p>
              </div>
              
              <div className="py-1">
                <button
                  onClick={handleProfile}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <User size={16} className="text-muted-foreground" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => {
                    console.log("Settings");
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <Settings size={16} className="text-muted-foreground" />
                  <span>Settings</span>
                </button>
                <div className="border-t border-border my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;