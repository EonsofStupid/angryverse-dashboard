import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeDocumentation } from "./sections/ThemeDocumentation";
import { RLSDocumentation } from "./sections/RLSDocumentation";
import { AuthDocumentation } from "./sections/AuthDocumentation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">System Documentation</h1>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="themes">Theme System</TabsTrigger>
          <TabsTrigger value="rls">RLS Policies</TabsTrigger>
          <TabsTrigger value="auth">Authorization</TabsTrigger>
        </TabsList>

        <TabsContent value="themes">
          <ThemeDocumentation data={docs?.find(d => d.category === 'themes')} />
        </TabsContent>

        <TabsContent value="rls">
          <RLSDocumentation data={docs?.find(d => d.category === 'rls')} />
        </TabsContent>

        <TabsContent value="auth">
          <AuthDocumentation data={docs?.find(d => d.category === 'authorization')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};