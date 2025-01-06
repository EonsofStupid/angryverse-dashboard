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
import { ThemeManagement } from "@/components/admin/ThemeManagement";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Loader2 } from "lucide-react";
import { useRoleCheck } from "@/hooks/useRoleCheck";

const AdminDashboard = () => {
  const { user, isLoading: authLoading } = useAuthStore();
  const { hasRole: isAdmin, isLoading: roleLoading } = useRoleCheck(user, 'admin');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      if (!authLoading && !user) {
        console.log("No user found, redirecting to home");
        toast.error("Please sign in to access the admin dashboard");
        navigate("/");
        return;
      }

      if (!authLoading && !roleLoading && !isAdmin) {
        console.log("User is not admin, redirecting to home");
        toast.error("You don't have permission to access the admin dashboard");
        navigate("/");
      }
    };

    checkAccess();
  }, [user, isAdmin, authLoading, roleLoading, navigate]);

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AdminLayout>
        <Tabs defaultValue="dashboard" className="w-full" onValueChange={(value) => navigate(`/admin/${value}`)}>
          <TabsList>
            <TabsTrigger value="">Dashboard</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="themes">Themes</TabsTrigger>
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
          
          <TabsContent value="themes">
            <ThemeManagement />
          </TabsContent>
          
          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      </AdminLayout>
    </div>
  );
};

export default AdminDashboard;