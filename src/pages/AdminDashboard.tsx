import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/useAuthStore";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { UserManagement } from "@/components/admin/UserManagement";
import { Settings } from "@/components/admin/Settings";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { user, isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, isAdmin, navigate, toast]);

  if (!user || !isAdmin) return null;

  return (
    <AdminLayout>
      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDashboard;