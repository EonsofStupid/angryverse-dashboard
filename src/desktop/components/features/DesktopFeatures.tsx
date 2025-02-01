import { useTheme } from "@/hooks/useTheme";

export const DesktopFeatures = () => {
  const { currentTheme } = useTheme();
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
      </div>
    </section>
  );
};