import { FaDatabase, FaAws } from "react-icons/fa";
import { 
  SiVercel, 
  SiOpenai, 
  SiReplit, 
  SiSupabase,
  SiFirebase, 
  SiMongodb, 
  SiGithub 
} from "react-icons/si";

export default function IntegrationsSection() {
  // Array of integrations with their icons, names, and descriptions
  const integrations = [
    {
      name: "OpenAI",
      description: "Leverage OpenAI's powerful models for code generation, editing, and explanation",
      icon: <SiOpenai className="h-8 w-8" />,
      color: "text-green-500"
    },
    {
      name: "Vercel",
      description: "Deploy and host your applications with Vercel's global edge network",
      icon: <SiVercel className="h-8 w-8" />,
      color: "text-gray-800 dark:text-gray-200"
    },
    {
      name: "Replit",
      description: "Develop, collaborate, and deploy applications directly from your browser",
      icon: <SiReplit className="h-8 w-8" />,
      color: "text-blue-500"
    },
    {
      name: "Supabase",
      description: "Integrate with Supabase for authentication, database, and storage solutions",
      icon: <SiSupabase className="h-8 w-8" />,
      color: "text-emerald-500"
    },
    {
      name: "Firebase",
      description: "Add Firebase for real-time databases, authentication, and cloud functions",
      icon: <SiFirebase className="h-8 w-8" />,
      color: "text-amber-500"
    },
    {
      name: "AWS",
      description: "Configure AWS services for scalable and reliable cloud infrastructure",
      icon: <FaAws className="h-8 w-8" />,
      color: "text-orange-500"
    },
    {
      name: "MongoDB",
      description: "Set up MongoDB Atlas for flexible document-based data storage",
      icon: <SiMongodb className="h-8 w-8" />,
      color: "text-green-600"
    },
    {
      name: "GitHub",
      description: "Connect with GitHub for version control, CI/CD, and collaborative workflows",
      icon: <SiGithub className="h-8 w-8" />,
      color: "text-gray-800 dark:text-gray-200"
    }
  ];

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Integrations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg border border-border bg-secondary/20 flex items-start gap-4"
          >
            <div className={`${integration.color} flex-shrink-0`}>
              {integration.icon}
            </div>
            <div>
              <h3 className="font-medium mb-1">{integration.name}</h3>
              <p className="text-sm text-muted-foreground">{integration.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}