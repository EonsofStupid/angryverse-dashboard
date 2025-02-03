import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RolePermissions } from "./RolePermissions";
import { UserRoles } from "./UserRoles";

export const PermissionManagement = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Permission Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="roles" className="w-full">
            <TabsList>
              <TabsTrigger value="roles">User Roles</TabsTrigger>
              <TabsTrigger value="permissions">Role Permissions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="roles">
              <UserRoles />
            </TabsContent>
            
            <TabsContent value="permissions">
              <RolePermissions />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};