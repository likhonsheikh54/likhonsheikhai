import { Code, Wand2, Braces, Layers, Workflow, Webhook } from "lucide-react";

export default function FeatureOverview() {
  const features = [
    {
      title: "Code Generation",
      description: "Convert natural language descriptions into fully functional code with best practices",
      icon: <Code className="h-6 w-6" />,
      color: "blue"
    },
    {
      title: "AI-Powered Creativity",
      description: "Generate UI components, design patterns, and creative solutions to complex problems",
      icon: <Wand2 className="h-6 w-6" />,
      color: "purple"
    },
    {
      title: "Multiple Languages",
      description: "Support for JavaScript, TypeScript, Python, Rust, Go, and many other languages",
      icon: <Braces className="h-6 w-6" />,
      color: "green"
    },
    {
      title: "Full-Stack Development",
      description: "From frontend UI to backend services, databases, and APIs - all from natural language",
      icon: <Layers className="h-6 w-6" />,
      color: "amber"
    },
    {
      title: "Workflows & Automation",
      description: "Create, edit, and optimize development workflows and CI/CD pipelines",
      icon: <Workflow className="h-6 w-6" />,
      color: "rose"
    },
    {
      title: "API Integration",
      description: "Seamlessly connect with external services, craft webhooks, and implement auth flows",
      icon: <Webhook className="h-6 w-6" />,
      color: "indigo"
    }
  ];
  
  const getColorClasses = (color: string) => {
    const colorMap: {[key: string]: {bg: string, text: string, border: string}} = {
      blue: { bg: "bg-blue-100 dark:bg-blue-950", text: "text-blue-600 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
      purple: { bg: "bg-purple-100 dark:bg-purple-950", text: "text-purple-600 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800" },
      green: { bg: "bg-green-100 dark:bg-green-950", text: "text-green-600 dark:text-green-300", border: "border-green-200 dark:border-green-800" },
      amber: { bg: "bg-amber-100 dark:bg-amber-950", text: "text-amber-600 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800" },
      rose: { bg: "bg-rose-100 dark:bg-rose-950", text: "text-rose-600 dark:text-rose-300", border: "border-rose-200 dark:border-rose-800" },
      indigo: { bg: "bg-indigo-100 dark:bg-indigo-950", text: "text-indigo-600 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-800" }
    };
    
    return colorMap[color] || colorMap.blue;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => {
        const colors = getColorClasses(feature.color);
        
        return (
          <div 
            key={index} 
            className={`p-5 rounded-lg border ${colors.border} ${colors.bg} flex flex-col`}
          >
            <div className={`${colors.text} mb-3`}>
              {feature.icon}
            </div>
            <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
}