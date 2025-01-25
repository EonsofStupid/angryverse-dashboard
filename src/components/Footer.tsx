import { motion } from "framer-motion";
import { Github, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

export const Footer = () => {
  return (
    <motion.footer 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "relative mt-16 w-full min-h-[276px]", // Reduced from 300px by 8%
        "before:absolute before:top-0 before:left-0 before:w-full before:h-full",
        "before:bg-gradient-to-br before:from-[#1a2e35] before:via-[#192841] before:to-[#1a2e35]",
        "before:transform before:skew-y-[-2deg]",
        "before:glass before:z-[-1]",
        "after:absolute after:inset-0 after:bg-grid-white/[0.02]",
        "flex flex-col items-center justify-center gap-10" // Reduced gap from 12 to 10
      )}
    >
      {/* Footer Content */}
      <div className="w-full max-w-[6.5rem] mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-7"> {/* Reduced gaps and padding */}
        {/* Resources */}
        <div className="space-y-3"> {/* Reduced spacing */}
          <h3 className="text-base font-semibold text-white">Resources</h3> {/* Reduced text size */}
          <ul className="space-y-1.5"> {/* Reduced spacing */}
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Guides</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Tutorials</a></li>
          </ul>
        </div>

        {/* Community */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-white">Community</h3>
          <ul className="space-y-1.5">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Forum</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Discord</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-white">Company</h3>
          <ul className="space-y-1.5">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-white">Legal</h3>
          <ul className="space-y-1.5">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Licenses</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-white/10 mt-6"> {/* Reduced margin */}
        <div className="max-w-[6.5rem] mx-auto px-5 py-3 flex flex-col md:flex-row justify-between items-center gap-3"> {/* Reduced padding and gap */}
          <p className="text-xs text-white/60">© 2024 Your Company. All rights reserved.</p> {/* Reduced text size */}
          
          <div className="flex items-center gap-3"> {/* Reduced gap */}
            <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">
              <Github className="w-4 h-4" /> {/* Reduced icon size */}
            </a>
            <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <button className="ml-3 px-3 py-1 rounded border border-cyan-400/30 text-cyan-400 text-xs hover:bg-cyan-400/10 transition-colors">
              Theme Info
            </button>
          </div>
        </div>
      </div>

      {/* Color Morphing Effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e35] via-[#192841] to-[#1a2e35] animate-gradient-x" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:3rem_3rem] -z-10" />

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 animate-scan-line bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent" />
      </div>

      {/* Enhanced Depth Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top light leak */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        {/* Bottom shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/30 to-transparent" />
      </div>

      {/* Glitch Effect Overlay */}
      <div className="absolute inset-0 opacity-50 mix-blend-overlay pointer-events-none">
        <div className="absolute inset-0 animate-glitch bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent" />
      </div>
    </motion.footer>
  );
};