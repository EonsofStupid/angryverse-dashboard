import { motion } from "framer-motion"
import { Github, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeInfoPopup } from "@/components/theme/ThemeInfoPopup"

export const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn(
        // Basic layout
        "relative mt-20 w-full min-h-[300px] flex flex-col items-center justify-center gap-12 text-white/80",
        // Create trapezoid shape with clip-path
        "clip-trapezoid overflow-hidden",
        // Add a subtle 3D transform
        "transform perspective-1000 rotateX-3deg",
        // Our layered backgrounds
        "before:absolute before:inset-0 before:z-[-2]",
        "before:bg-gradient-to-br before:from-[#1a2e35] before:via-[#192841] before:to-[#1a2e35]",
        // Particle lines behind everything
        "after:absolute after:inset-0 after:z-[-1] after:bg-cyber-lines after:animate-cyber-lines",
      )}
    >
      {/* --- Footer Content --- */}
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Resources */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Guides</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Tutorials</a></li>
          </ul>
        </div>
        {/* Community */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Community</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Forum</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Discord</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
          </ul>
        </div>
        {/* Company */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
          </ul>
        </div>
        {/* Legal */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Licenses</a></li>
          </ul>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="w-full border-t border-white/10 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">© 2024 Your Company. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <ThemeInfoPopup />
          </div>
        </div>
      </div>
    </motion.footer>
  );
};