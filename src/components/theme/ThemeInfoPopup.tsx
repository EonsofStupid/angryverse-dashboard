import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { Code2, Palette, Sparkles, Layers } from "lucide-react";

export const ThemeInfoPopup = () => {
  const { currentTheme } = useTheme();

  if (!currentTheme) return null;

  const { colors, typography, effects } = currentTheme.configuration;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="ml-4 px-3 py-1 rounded border border-cyan-400/30 text-cyan-400 text-sm hover:bg-cyan-400/10 transition-colors">
          Theme Info
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-gradient-to-br from-[#1a1b26]/95 via-[#1a1b26]/98 to-[#1a1b26]/95 border-cyan-500/20 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {currentTheme.name}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="colors" className="mt-4">
          <TabsList className="grid w-full grid-cols-4 bg-background/50 backdrop-blur">
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="effects" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Effects
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(colors.cyber).map(([key, value]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-lg glass"
                >
                  <h3 className="text-lg font-semibold capitalize mb-2">{key}</h3>
                  {typeof value === 'object' ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: value.DEFAULT }}
                        />
                        <span className="text-sm opacity-80">Default: {value.DEFAULT}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: value.hover }}
                        />
                        <span className="text-sm opacity-80">Hover: {value.hover}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: value }}
                      />
                      <span className="text-sm opacity-80">{value}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg glass"
            >
              <h3 className="text-lg font-semibold mb-4">Font Families</h3>
              {Object.entries(typography.fonts).map(([key, fonts]) => (
                <div key={key} className="mb-4 last:mb-0">
                  <h4 className="text-sm font-medium capitalize mb-2">{key}</h4>
                  <div className="flex gap-2 flex-wrap">
                    {fonts.map((font, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-sm"
                      >
                        {font}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="effects" className="space-y-4 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              {Object.entries(effects).map(([key, effect]: [string, any]) => (
                <div key={key} className="p-4 rounded-lg glass">
                  <h3 className="text-lg font-semibold capitalize mb-2">{key}</h3>
                  <div className="space-y-2">
                    {Object.entries(effect)
                      .filter(([k]) => typeof effect[k] !== 'object')
                      .map(([k, v]) => (
                        <div key={k} className="flex justify-between items-center">
                          <span className="text-sm opacity-80 capitalize">
                            {k.replace(/_/g, ' ')}
                          </span>
                          <span className="text-sm text-cyan-400">{String(v)}</span>
                        </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg glass"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Theme Status</h3>
                  <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-sm">
                    {currentTheme.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Default Theme</h3>
                  <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-sm">
                    {currentTheme.is_default ? "Yes" : "No"}
                  </span>
                </div>
                {currentTheme.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-sm opacity-80">{currentTheme.description}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};