import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlatformConnection } from "../types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Loader2, RefreshCw, X } from "lucide-react";

interface PlatformConnectionCardProps {
  connection: PlatformConnection;
  isLoading: boolean;
  onInitialize: () => void;
  onRefresh: () => void;
  onClear: () => void;
  hasContent: boolean;
}

export const PlatformConnectionCard = ({
  connection,
  isLoading,
  onInitialize,
  onRefresh,
  onClear,
  hasContent,
}: PlatformConnectionCardProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {connection.avatar_url && (
              <img
                src={connection.avatar_url}
                alt={connection.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <div>
              <div>{connection.name || connection.connection_name}</div>
              <div className="text-sm text-muted-foreground">
                {connection.platform_username}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {!hasContent ? (
              <Button
                onClick={() => setShowConfirm(true)}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Initialize Feed
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={onRefresh}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  onClick={onClear}
                  disabled={isLoading}
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Initialize Feed</AlertDialogTitle>
            <AlertDialogDescription>
              This will fetch the latest content from your account. Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowConfirm(false);
              onInitialize();
            }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};