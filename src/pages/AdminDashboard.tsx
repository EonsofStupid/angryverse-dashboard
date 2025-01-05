import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/useAuthStore";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { UserManagement } from "@/components/admin/UserManagement";
import { Settings } from "@/components/admin/Settings";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { MediaLibrary } from "@/components/admin/content/MediaLibrary";
import { CategoriesManagement } from "@/components/admin/content/CategoriesManagement";
import { CommentsManagement } from "@/components/admin/content/CommentsManagement";
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
      <Tabs defaultValue="dashboard" className="w-full" onValueChange={(value) => navigate(`/admin/${value}`)}>
        <TabsList>
          <TabsTrigger value="">Dashboard</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="">
          <DashboardOverview />
        </TabsContent>
        
        <TabsContent value="posts">
          <Outlet />
        </TabsContent>
        
        <TabsContent value="media">
          <MediaLibrary />
        </TabsContent>
        
        <TabsContent value="categories">
          <CategoriesManagement />
        </TabsContent>
        
        <TabsContent value="comments">
          <CommentsManagement />
        </TabsContent>
        
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