import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const RolePermissions = () => {
  const { data: permissions, isLoading } = useQuery({
    queryKey: ['role-permissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('role_permissions')
        .select('*')
        .order('permission');

      if (error) {
        console.error('Error fetching permissions:', error);
        toast.error('Failed to fetch permissions');
        throw error;
      }

      return data;
    }
  });

  const handlePermissionToggle = async (permission: string, role: string, enabled: boolean) => {
    try {
      if (enabled) {
        const { error } = await supabase
          .from('role_permissions')
          .insert({ permission, role });

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('role_permissions')
          .delete()
          .match({ permission, role });

        if (error) throw error;
      }

      toast.success('Permission updated successfully');
    } catch (error) {
      console.error('Error updating permission:', error);
      toast.error('Failed to update permission');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Get unique permissions
  const uniquePermissions = [...new Set(permissions?.map(p => p.permission))];

  return (
    <div className="mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Permission</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Admin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uniquePermissions.map((permission) => (
            <TableRow key={permission}>
              <TableCell className="font-medium">{permission}</TableCell>
              <TableCell>
                <Switch
                  checked={permissions?.some(p => p.permission === permission && p.role === 'user')}
                  onCheckedChange={(checked) => handlePermissionToggle(permission, 'user', checked)}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={permissions?.some(p => p.permission === permission && p.role === 'admin')}
                  onCheckedChange={(checked) => handlePermissionToggle(permission, 'admin', checked)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};