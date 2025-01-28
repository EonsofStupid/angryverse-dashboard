import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeDocumentation } from "./sections/ThemeDocumentation";
import { RLSDocumentation } from "./sections/RLSDocumentation";
import { AuthDocumentation } from "./sections/AuthDocumentation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { AnimatedLines } from "@/components/backgrounds/AnimatedLines";
import { GlitchOverlay } from "@/components/backgrounds/GlitchOverlay";
import { CyberBackground } from "@/components/backgrounds/CyberBackground";

export const Documentation = () => {
  const [activeTab, setActiveTab] = useState("themes");

  const { data: docs, isLoading } = useQuery({
    queryKey: ["documentation"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documentation")
        .select(`
          *,
          documentation_sections (
            *
          )
        `)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Matrix Rain Effect - Vertical */}
      <AnimatedLines 
        direction="vertical"
        color="var(--theme-colors-cyber-matrix, #00ff00)"
        speed={2}
        spacing={30}
        opacity={0.15}
        className="z-0"
      />
      
      {/* Cyan Lines - Horizontal */}
      <AnimatedLines 
        direction="horizontal"
        color="var(--theme-colors-cyber-cyan-DEFAULT, #1affff)"
        speed={1.5}
        spacing={40}
        opacity={0.1}
        className="z-0"
      />

      {/* Cyber Background with Noise */}
      <CyberBackground 
        color="var(--theme-colors-cyber-purple)"
        opacity={0.08}
        className="z-0"
      />

      {/* Glitch Effect Overlay */}
      <GlitchOverlay 
        intensity={0.3}
        frequency={0.2}
        color="var(--theme-colors-cyber-pink-DEFAULT)"
        className="z-0"
      />

      {/* Main Content */}
      <div className="container mx-auto p-6 relative z-10">
        <h1 className="text-2xl font-bold mb-6 font-cyber">System Documentation</h1>
        
        <Tabs 
          defaultValue={activeTab} 
          onValueChange={setActiveTab}
          className="relative glass"
        >
          <TabsList className="relative backdrop-blur-sm bg-background/30 border border-primary/20">
            <TabsTrigger 
              value="themes"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              Theme System
            </TabsTrigger>
            <TabsTrigger 
              value="rls"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              RLS Policies
            </TabsTrigger>
            <TabsTrigger 
              value="auth"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              Authorization
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 relative glass p-6 backdrop-blur-md bg-background/20 border border-primary/10 rounded-lg shadow-lg">
            <TabsContent value="themes" className="relative z-10">
              <ThemeDocumentation data={docs?.find(d => d.category === 'themes')} />
            </TabsContent>

            <TabsContent value="rls" className="relative z-10">
              <RLSDocumentation data={docs?.find(d => d.category === 'rls')} />
            </TabsContent>

            <TabsContent value="auth" className="relative z-10">
              <AuthDocumentation data={docs?.find(d => d.category === 'authorization')} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};