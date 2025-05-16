import { User, Monitor, Package, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
  active?: boolean;
};

const navItems: NavItem[] = [
  {
    id: "agent",
    name: "Agent",
    icon: <User className="h-6 w-6" />,
    active: true,
  },
  {
    id: "projects",
    name: "Projects",
    icon: <Monitor className="h-6 w-6" />,
  },
  {
    id: "modules",
    name: "Modules",
    icon: <Package className="h-6 w-6" />,
  },
  {
    id: "settings",
    name: "Settings",
    icon: <Settings className="h-6 w-6" />,
  },
];

export default function MobileNav() {
  return (
    <nav className="md:hidden flex items-center justify-around border-t border-border bg-background py-2 sticky bottom-0 z-10">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={cn(
            "flex flex-col items-center justify-center p-2 rounded",
            item.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.name}</span>
        </button>
      ))}
    </nav>
  );
}
