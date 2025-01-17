import { Button } from "@/components/ui/button";
import { Database, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminOptionsProps {
  onClose: () => void;
}

export const AdminOptions = ({ onClose }: AdminOptionsProps) => {
  const navigate = useNavigate();

  const handleAdminNavigation = (route: string) => {
    console.log('Navigating to admin route:', route);
    navigate(route);
    onClose();
  };

  return (
    <>
      <Button
        variant="ghost"
        className="justify-start gap-2 hover:bg-primary/10 hover:text-primary"
        onClick={() => handleAdminNavigation("/admin/portal")}
      >
        <LayoutDashboard className="h-5 w-5" />
        Portal
      </Button>
      <Button
        variant="ghost"
        className="justify-start gap-2 hover:bg-primary/10 hover:text-primary"
        onClick={() => handleAdminNavigation("/admin")}
      >
        <Database className="h-5 w-5" />
        Admin Dashboard
      </Button>
    </>
  );
};