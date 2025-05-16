import FeatureOverview from "./FeatureOverview";
import IntegrationsSection from "./IntegrationsSection";
import VersioningSection from "./VersioningSection";
import ActionButtons from "./ActionButtons";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <div className="mx-auto h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4">Likhon Sheikh AI Coding Agent</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A pair programmer that lets you describe your ideas in natural language and generates both the code and UI for your project.
        </p>
        
        <ActionButtons />
      </div>
      
      <Separator className="my-10" />
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <FeatureOverview />
      </section>
      
      <IntegrationsSection />
      
      <VersioningSection />
      
      <section className="mt-16 bg-secondary/30 rounded-lg p-6 border border-border">
        <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            The Likhon Sheikh AI Coding Agent begins with a chat-based interface, where users can input prompts and attach files. 
            The agent can respond with text, code, or specialized content blocks.
          </p>
          
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">For best results:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
              <li>Be specific about what you want to build</li>
              <li>Break complex projects into smaller components</li>
              <li>Ask for explanations if you don't understand something</li>
              <li>Use screenshots or references when describing UI components</li>
              <li>Review and provide feedback to improve results</li>
            </ol>
          </div>
          
          <div className="flex items-center gap-3 mt-6">
            <Button onClick={() => {}} className="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Start a New Project
            </Button>
            <Button onClick={() => {}} variant="outline" className="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              View Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}