import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function GTNNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Offerings", href: "/#offer" },
    { name: "Projects", href: "/#projects" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <img src="/gtn-logo.png" alt="GTN Logo" className="w-12 h-12" />
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black text-white">GTN</span>
            <span className="text-[11px] text-primary uppercase tracking-widest">
              Global Team Network
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-white/70 hover:text-primary transition-colors uppercase tracking-wide"
            >
              {link.name}
            </a>
          ))}

          {/* JOIN TEXT CTA */}
          <a href="/#join" className="relative group text-right">
            <span className="text-green-400 font-bold uppercase tracking-widest hover:text-green-300 transition-colors cursor-pointer">
              Join
            </span>

            {/* FLASHING SUBTEXT */}
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="block text-[10px] uppercase tracking-widest text-green-400 mt-1"
            >
              For Exclusive Benefits
            </motion.span>
          </a>

        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-6">

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold text-white/80 hover:text-primary"
                >
                  {link.name}
                </a>
              ))}

              {/* MOBILE JOIN TEXT */}
              <a
                href="/#join"
                onClick={() => setIsOpen(false)}
                className="text-center"
              >
                <div className="text-green-400 font-bold uppercase tracking-widest text-lg">
                  Join
                </div>

                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="text-xs uppercase tracking-widest text-green-400 mt-1"
                >
                 For Exclusive Benefits
                </motion.div>
              </a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
