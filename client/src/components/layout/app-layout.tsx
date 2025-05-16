import { useState } from "react";
import Sidebar from "./sidebar";
import TopNav from "./top-nav";
import ToolPanel from "./tool-panel";
import { useMediaQuery } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTools = () => {
    setToolsOpen(!toolsOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-dark text-foreground">
      {/* Sidebar - hidden on mobile unless toggled */}
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        className={isMobile ? "fixed z-30 transition-transform duration-300 ease-in-out transform shadow-xl" : ""}
        style={isMobile ? { 
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
        } : {}}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopNav onSidebarToggle={toggleSidebar} onToolsToggle={toggleTools} />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </div>
      
      {/* Tools Panel - always fixed on mobile */}
      <ToolPanel 
        open={toolsOpen} 
        onClose={() => setToolsOpen(false)}
        className={isMobile || !toolsOpen ? "fixed right-0 z-30 transition-transform duration-300 ease-in-out transform shadow-xl" : ""}
        style={isMobile || !toolsOpen ? { 
          transform: toolsOpen ? 'translateX(0)' : 'translateX(100%)'
        } : {}}
      />
    </div>
  );
}
