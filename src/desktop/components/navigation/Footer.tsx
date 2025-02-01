import { useTheme } from "@/hooks/useTheme";

export const Footer = () => {
  const { currentTheme } = useTheme();
  
  return (
    <footer className="bg-background/80 backdrop-blur-lg py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p>© 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};