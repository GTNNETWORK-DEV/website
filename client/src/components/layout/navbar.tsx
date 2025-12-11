import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Ecosystem", href: "#features" },
    { name: "Community", href: "#community" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-display font-bold tracking-tighter text-white hover:opacity-80 transition-opacity cursor-pointer">
          BLOCK<span className="text-primary text-glow">WAVE</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-tech font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary font-tech uppercase tracking-widest">
            Connect Wallet
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-white/10"
          >
            <div className="container px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-tech text-white/80 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button className="w-full font-tech uppercase tracking-widest bg-primary text-black hover:bg-primary/80">
                Connect Wallet
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
