import { Code, Cpu, Palette, Lightbulb, ImagePlus, Zap } from "lucide-react";

export default function FeatureOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {/* Feature 1 */}
      <div className="bg-secondary/50 rounded-lg p-5 hover:bg-secondary/80 transition-colors">
        <div className="h-10 w-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center mb-4">
          <Lightbulb className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-medium mb-2">No-code needed</h3>
        <p className="text-muted-foreground">
          Tell Agent your app or website idea, and it will build it for you automatically. 
          It's like having an entire team of software engineers on demand.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="bg-secondary/50 rounded-lg p-5 hover:bg-secondary/80 transition-colors">
        <div className="h-10 w-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
          <Zap className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-medium mb-2">From idea to prototype</h3>
        <p className="text-muted-foreground">
          The best tool for both technical & non-technical creators. Agent 
          walks you through it step-by-step in plain English.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="bg-secondary/50 rounded-lg p-5 hover:bg-secondary/80 transition-colors">
        <div className="h-10 w-10 rounded-lg bg-green-600/20 text-green-400 flex items-center justify-center mb-4">
          <ImagePlus className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-medium mb-2">Inspiration to implementation</h3>
        <p className="text-muted-foreground">
          See an app or website that inspires you? Simply screenshot, upload, and Agent 
          will build it for you with customizations.
        </p>
      </div>

      {/* Feature 4 */}
      <div className="bg-secondary/50 rounded-lg p-5 hover:bg-secondary/80 transition-colors">
        <div className="h-10 w-10 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center mb-4">
          <Code className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-medium mb-2">Write faster code</h3>
        <p className="text-muted-foreground">
          Generate large chunks of code at once, useful when writing small 
          programs or several related functions in one shot.
        </p>
      </div>

      {/* Feature 5 */}
      <div className="bg-secondary/50 rounded-lg p-5 hover:bg-secondary/80 transition-colors">
        <div className="h-10 w-10 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4">
          <Cpu className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-medium mb-2">Intelligent optimization</h3>
        <p className="text-muted-foreground">
          Refactor your code to run faster, translate it into another language, 
          and make it easier to read and maintain.
        </p>
      </div>

      {/* Feature 6 */}
      <div className="bg-secondary/50 rounded-lg p-5 hover:bg-secondary/80 transition-colors">
        <div className="h-10 w-10 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center mb-4">
          <Palette className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-medium mb-2">UI/UX expertise</h3>
        <p className="text-muted-foreground">
          Get help designing beautiful, responsive interfaces with optimized 
          user experiences across all devices.
        </p>
      </div>
    </div>
  );
}