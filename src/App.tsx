import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { PostsManagement } from "@/components/admin/content/PostsManagement";
import { CategoriesManagement } from "@/components/admin/content/CategoriesManagement";
import { CommentsManagement } from "@/components/admin/content/CommentsManagement";
import { MediaManagement } from "@/components/admin/content/MediaManagement";
import { Settings } from "@/components/settings/Settings";
import { UserManagement } from "@/components/admin/UserManagement";
import { UserProfileEdit } from "@/components/admin/UserProfileEdit";
import { ThemeManagement } from "@/components/admin/ThemeManagement";
import { useAuthStore } from "@/store/useAuthStore";
import Index from "@/pages/Index";

export default function App() {
  const user = useAuthStore(state => state.user);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      
      {/* Protected Admin Routes */}
      <Route path="/admin" element={<AdminLayout>
        <Routes>
          <Route index element={<DashboardOverview />} />
          <Route path="posts" element={<PostsManagement />} />
          <Route path="categories" element={<CategoriesManagement />} />
          <Route path="comments" element={<CommentsManagement />} />
          <Route path="media" element={<MediaManagement />} />
          <Route path="themes" element={<ThemeManagement />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="profile" element={<UserProfileEdit userId={user?.id || ''} />} />
        </Routes>
      </AdminLayout>} />
    </Routes>
  );
}