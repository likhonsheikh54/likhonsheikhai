import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import { motion } from "framer-motion";
import { TextShimmer } from "@/components/ui/text-shimmer";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";

export default function Projects() {
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
                Projects Dashboard
              </TextShimmer>
              
              <p className="text-muted-foreground max-w-2xl">
                Create, manage, and collaborate on AI-assisted coding projects. 
                Build faster with the help of Likhon Sheikh AI.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-10">
              <div className="w-full max-w-sm">
                <DatabaseWithRestApi 
                  title="AI-Generated Projects" 
                  lightColor="#4f46e5"
                  badgeTexts={{
                    first: "WEB",
                    second: "APP",
                    third: "API",
                    fourth: "UI"
                  }}
                  buttonTexts={{
                    first: "Your Projects",
                    second: "Recent"
                  }}
                  circleText="PRO"
                />
              </div>
              
              <div className="w-full">
                <div className="border rounded-lg p-6 bg-card">
                  <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                  <div className="space-y-4">
                    {/* Project Items */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border rounded-md p-4 hover:bg-accent/5 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Project Example {i}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Last edited 2 days ago
                            </p>
                          </div>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Active
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
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