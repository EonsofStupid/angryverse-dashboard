import { useTheme } from "@/hooks/useTheme";

export const DesktopHero = () => {
  const { currentTheme } = useTheme();
  
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-bold text-center">
          Welcome to the Future
        </h1>
      </div>
    </section>
  );
};