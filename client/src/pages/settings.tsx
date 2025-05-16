import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import { motion } from "framer-motion";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { 
  Settings as SettingsIcon, 
  Cpu, 
  Network, 
  KeyRound, 
  PencilRuler, 
  Save,
  User,
  Moon,
  Sun,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useTheme } from "@/hooks/use-theme";

export default function Settings() {
  // Get theme from hook
  const { theme, setTheme } = useTheme();

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
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
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <SettingsIcon className="h-5 w-5 text-primary" />
              </div>
              <TextShimmer 
                as="h1" 
                className="text-3xl font-bold"
              >
                Settings
              </TextShimmer>
            </div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* AI Model Settings */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Cpu className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>AI Model Settings</CardTitle>
                      <CardDescription>Configure the AI model provider and parameters</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="provider">AI Provider</Label>
                        <Select defaultValue="groq">
                          <SelectTrigger id="provider">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="groq">Groq</SelectItem>
                            <SelectItem value="openrouter">OpenRouter</SelectItem>
                            <SelectItem value="langbase">LangBase</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Select defaultValue="mixtral-8x7b">
                          <SelectTrigger id="model">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="llama3-70b">Llama 3 70B</SelectItem>
                            <SelectItem value="mixtral-8x7b">Mixtral 8x7B</SelectItem>
                            <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="temperature">Temperature</Label>
                        <span className="text-sm text-muted-foreground">0.7</span>
                      </div>
                      <Slider
                        id="temperature"
                        defaultValue={[0.7]}
                        max={1}
                        step={0.1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Higher values (closer to 1) make output more random, lower values make it more deterministic.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="max-tokens">Max Tokens</Label>
                      <Input id="max-tokens" type="number" defaultValue={4096} />
                      <p className="text-xs text-muted-foreground">
                        Maximum length of generated responses.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* API Keys */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <KeyRound className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>API Keys</CardTitle>
                      <CardDescription>Manage your API keys for different providers</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="groq-key">Groq API Key</Label>
                        <Input id="groq-key" type="password" placeholder="••••••••••••••••••••••••••" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="openrouter-key">OpenRouter API Key</Label>
                        <Input id="openrouter-key" type="password" placeholder="••••••••••••••••••••••••••" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="langbase-key">LangBase API Key</Label>
                        <Input id="langbase-key" type="password" placeholder="••••••••••••••••••••••••••" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Appearance & Interface */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Palette className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>Appearance & Interface</CardTitle>
                      <CardDescription>Customize the look and feel of the application</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Toggle between light and dark theme
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Sun className="h-4 w-4 text-muted-foreground" />
                        <Switch 
                          id="dark-mode" 
                          checked={theme === 'dark'}
                          onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                        />
                        <Moon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="animations">Enable Animations</Label>
                        <p className="text-sm text-muted-foreground">
                          Show smooth animations throughout the interface
                        </p>
                      </div>
                      <Switch id="animations" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Profile Settings */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription>Manage your account details</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="display-name">Display Name</Label>
                        <Input id="display-name" defaultValue="User" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="user@example.com" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
}