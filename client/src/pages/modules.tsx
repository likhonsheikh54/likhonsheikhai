import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import { motion } from "framer-motion";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Package, ArrowRight, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Modules() {
  // Animation variants for list items
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

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
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div>
                <TextShimmer 
                  as="h1" 
                  className="text-3xl md:text-4xl font-bold mb-2"
                >
                  Modules & Extensions
                </TextShimmer>
                
                <p className="text-muted-foreground">
                  Expand your AI Agent capabilities with specialized modules.
                </p>
              </div>
              
              <Button className="mt-4 md:mt-0 gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Module
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="space-y-6"
              >
                {/* Module Cards */}
                {['Database', 'Serverless', 'Authentication'].map((name, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="border rounded-lg p-6 bg-card hover:shadow-md transition-all hover:border-primary/50"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{name} Module</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {name === 'Database' 
                        ? 'Connect and manage databases with AI assistance.' 
                        : name === 'Serverless' 
                        ? 'Deploy serverless functions with minimal configuration.'
                        : 'Implement secure authentication with multiple providers.'}
                    </p>
                    <Button variant="ghost" className="gap-2 text-primary">
                      Explore Module <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="space-y-6"
              >
                {/* Module Cards */}
                {['UI Generator', 'API Gateway', 'Testing'].map((name, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="border rounded-lg p-6 bg-card hover:shadow-md transition-all hover:border-primary/50"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{name} Module</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {name === 'UI Generator' 
                        ? 'Generate UI components from natural language descriptions.' 
                        : name === 'API Gateway' 
                        ? 'Create and manage API endpoints for your applications.'
                        : 'Automatically generate tests for your code.'}
                    </p>
                    <Button variant="ghost" className="gap-2 text-primary">
                      Explore Module <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="space-y-6 lg:col-span-1 md:col-span-2 col-span-1">
                <div className="border rounded-lg p-6 bg-card">
                  <h3 className="text-xl font-semibold mb-4">Popular Extensions</h3>
                  <div className="space-y-3">
                    {['React Framework', 'Next.js Integration', 'TypeScript Support'].map((name, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-2 border rounded-md">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-3">
                            <span className="text-xs font-medium">{i + 1}</span>
                          </div>
                          <span>{name}</span>
                        </div>
                        <Button variant="outline" size="sm">Install</Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-lg p-6 bg-gradient-to-br from-primary/5 to-primary/20">
                  <h3 className="text-xl font-semibold mb-2">Need Custom Module?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get a custom module built for your specific needs.
                  </p>
                  <Button>Request Custom Module</Button>
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