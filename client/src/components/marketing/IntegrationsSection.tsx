import { Database, GitBranch, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function IntegrationsSection() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Integrations</h2>
      <p className="text-muted-foreground mb-6">
        You can integrate with third-party services to enhance your projects. Currently, Likhon Sheikh AI Agent supports various integrations:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Database Connections</h3>
            <p className="text-sm text-muted-foreground">
              Connect to PostgreSQL, MySQL, MongoDB and other database systems
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-green-600/20 text-green-400 flex items-center justify-center flex-shrink-0">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium mb-1">API Services</h3>
            <p className="text-sm text-muted-foreground">
              Connect to external APIs and third-party services with secure authentication
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center flex-shrink-0">
            <GitBranch className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Version Control</h3>
            <p className="text-sm text-muted-foreground">
              Integrate with Git repositories for seamless development workflow
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-secondary/30 p-4 rounded-lg border border-border">
        <p className="text-sm">
          <strong>Note:</strong> When you add an integration requiring an environment variable outside of general setup, 
          you will be prompted in the chat to add the necessary variables. You can also add your own 
          environment variables anytime from the project settings sidebar.
        </p>
      </div>
    </div>
  );
}