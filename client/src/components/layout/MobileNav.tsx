import { User, Monitor, Package, Settings, MessageSquare, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "wouter";

type NavItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  {
    id: "chat",
    name: "Chat",
    icon: <MessageSquare className="h-5 w-5" />,
    path: "/",
  },
  {
    id: "projects",
    name: "Projects",
    icon: <Monitor className="h-5 w-5" />,
    path: "/projects",
  },
  {
    id: "modules",
    name: "Modules",
    icon: <Package className="h-5 w-5" />,
    path: "/modules",
  },
  {
    id: "docs",
    name: "Docs",
    icon: <BookOpen className="h-5 w-5" />,
    path: "/docs",
  },
  {
    id: "settings",
    name: "Settings",
    icon: <Settings className="h-5 w-5" />,
    path: "/settings",
  },
];

export default function MobileNav() {
  const [activePath, setActivePath] = useState("/");

  return (
    <nav className="md:hidden flex items-center justify-around border-t border-border bg-background/95 backdrop-blur-sm py-2 sticky bottom-0 z-10 shadow-md">
      {navItems.map((item) => (
        <div key={item.id} className="w-full">
          <Link
            href={item.path}
            onClick={() => setActivePath(item.path)}
          >
            <div
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded transition-colors duration-200",
                activePath === item.path 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="text-xs mt-1 font-medium">{item.name}</span>
              {activePath === item.path && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary"/>
              )}
            </div>
          </Link>
        </div>
      ))}
    </nav>
  );
}
