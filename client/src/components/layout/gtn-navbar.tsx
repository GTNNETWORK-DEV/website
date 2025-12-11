import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function GTNNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Offerings", href: "#offer" },
    { name: "Join", href: "#join" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-background via-background to-background border-b border-white/10 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-3xl font-display font-black text-white hover:text-primary transition-colors cursor-pointer">
          GTN
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-gray-300 hover:text-primary transition-colors uppercase tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <Button className="cta-button px-8 h-11">
            Get Started
          </Button>
        </div>

        <button
          className="md:hidden text-white hover:text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 border-b border-white/10 backdrop-blur-md"
          >
            <div className="container px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-semibold text-gray-300 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button className="cta-button w-full h-12">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
