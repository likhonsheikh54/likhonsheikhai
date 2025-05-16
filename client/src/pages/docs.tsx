import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import { motion } from "framer-motion";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Search, BookOpen, FileText, Code, Wand2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Docs() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const categories = [
    {
      title: "Getting Started",
      icon: <BookOpen className="h-5 w-5" />,
      items: ["Introduction", "Installation", "Quick Start Guide"]
    },
    {
      title: "Core Concepts",
      icon: <FileText className="h-5 w-5" />,
      items: ["AI Agent Basics", "Provider Settings", "Chat Interface"]
    },
    {
      title: "API Reference",
      icon: <Code className="h-5 w-5" />,
      items: ["REST API", "WebSocket API", "Authentication"]
    },
    {
      title: "Advanced Usage",
      icon: <Wand2 className="h-5 w-5" />,
      items: ["Custom Prompts", "Model Fine-tuning", "Agent Customization"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col items-center justify-center mb-12 text-center">
              <TextShimmer 
                as="h1" 
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Documentation & Resources
              </TextShimmer>
              
              <p className="text-muted-foreground max-w-2xl mb-8">
                Explore comprehensive guides, API references, and examples to get the most out of the Likhon Sheikh AI Coding Agent.
              </p>
              
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search documentation..." 
                  className="pl-10 pr-10"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                >
                  Search
                </Button>
              </div>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {categories.map((category, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="border rounded-lg p-6 bg-card hover:shadow-md transition-all hover:border-primary/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      {category.icon}
                    </div>
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                  </div>
                  
                  <ul className="space-y-3 ml-3">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 group">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/50"></div>
                        <a 
                          href="#" 
                          className="text-muted-foreground hover:text-foreground transition-colors group-hover:ml-1 duration-200"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 text-xs border-dashed border text-muted-foreground hover:text-primary"
                  >
                    View All
                  </Button>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-12 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Need Further Assistance?</h2>
                  <p className="text-muted-foreground">
                    Our support team is ready to help you with any questions or issues.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">Discord Community</Button>
                  <Button>Contact Support</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
}