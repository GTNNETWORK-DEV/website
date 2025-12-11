import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Simple Footer */}
      <footer className="py-8 border-t border-white/10 bg-black">
        <div className="container mx-auto px-4 text-center">
          <p className="font-tech text-muted-foreground text-sm">
            © 2024 BLOCKWAVE NATION. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
