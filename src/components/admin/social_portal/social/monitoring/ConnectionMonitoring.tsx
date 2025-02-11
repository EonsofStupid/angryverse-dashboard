import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Activity, AlertCircle, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { SocialConnection } from "@/types/social";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ConnectionMonitoringProps {
  connection: SocialConnection;
  onRefresh: () => void;
}

export const ConnectionMonitoring = ({ connection, onRefresh }: ConnectionMonitoringProps) => {
  const handleRefresh = async () => {
    try {
      const { error } = await supabase
        .from("social_connections")
        .update({ last_sync_at: new Date().toISOString() })
        .eq("id", connection.id);

      if (error) throw error;
      
      onRefresh();
      toast.success("Connection refreshed successfully");
    } catch (error) {
      console.error("Error refreshing connection:", error);
      toast.error("Failed to refresh connection");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Activity className="h-4 w-4" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Connection Status</h4>
            <div className="text-sm">
              <p>Last synced: {connection.last_sync_at ? 
                formatDistanceToNow(new Date(connection.last_sync_at), { addSuffix: true }) : 
                'Never'}
              </p>
              {connection.performance_metrics && (
                <div className="mt-2">
                  <p className="font-medium">Performance Metrics</p>
                  <pre className="mt-1 text-xs">
                    {JSON.stringify(connection.performance_metrics, null, 2)}
                  </pre>
                </div>
              )}
              {connection.error_logs && connection.error_logs.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium text-destructive flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Recent Errors
                  </p>
                  <ul className="mt-1 text-xs space-y-1">
                    {connection.error_logs.slice(0, 3).map((log: any, index: number) => (
                      <li key={index} className="text-destructive">
                        {log.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={handleRefresh}
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
};