import { DesktopLayout } from "@/desktop/layouts/DesktopLayout";
import { DesktopHero } from "@/desktop/components/hero/DesktopHero";
import { DesktopFeatures } from "@/desktop/components/features/DesktopFeatures";
import { DesktopVisualDatabase } from "@/desktop/components/visual-database/DesktopVisualDatabase";
import { ThemeDebugger } from "@/shared/components/theme/ThemeDebugger";

const DesktopIndex = () => {
  return (
    <DesktopLayout>
      <DesktopHero />
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Visual <span className="text-gradient animate-glow">Database</span>
          </h2>
          <DesktopVisualDatabase />
        </div>
      </section>
      <DesktopFeatures />
      {process.env.NODE_ENV === 'development' && <ThemeDebugger />}
    </DesktopLayout>
  );
};

export default DesktopIndex;