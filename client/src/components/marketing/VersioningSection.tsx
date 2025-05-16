import { History, Clock, RefreshCw } from "lucide-react";

export default function VersioningSection() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Version Control & History</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-secondary/50 rounded-lg p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <History className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Smart Versioning</h3>
              <p className="text-sm text-muted-foreground">
                When the agent updates a code block from a message, it creates a new version. 
                Non-message actions (such as editing code or modifying files directly) do not generate new versions.
              </p>
            </div>
          </div>
          
          <div className="mt-4 pl-4 border-l-2 border-muted">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Linear version history for easy tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
                <span>Restoring an old version creates a new, most recent version</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-muted p-3 rounded text-center">
              <span className="text-xs text-muted-foreground">Version 1</span>
            </div>
            <div className="bg-muted p-3 rounded text-center">
              <span className="text-xs text-muted-foreground">Version 2</span>
            </div>
            <div className="bg-primary/20 p-3 rounded text-center">
              <span className="text-xs text-primary">Current</span>
            </div>
          </div>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1">Blocks</h3>
              <p className="text-sm text-muted-foreground">
                Blocks are unique content types which unlock new functionality. When the agent generates a Block, 
                you'll see the Block's content in a new window on the right of your chat UI.
              </p>
            </div>
          </div>
          
          <div className="mt-4 space-y-4">
            <div className="bg-muted p-3 rounded flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-sm">UI Generation Block</span>
                <p className="text-xs text-muted-foreground">Generate client-side UI components in React, Vue, Svelte, and HTML</p>
              </div>
            </div>
            
            <div className="bg-muted p-3 rounded flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-amber-600/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-sm">Code Explanation Block</span>
                <p className="text-xs text-muted-foreground">Understand complex code quickly with detailed explanations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}