import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import ChatInterface from "@/components/chat/ChatInterface";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex overflow-hidden">
        <Sidebar />
        <ChatInterface />
      </main>
      
      <MobileNav />
    </div>
  );
}
