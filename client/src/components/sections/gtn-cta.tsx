import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function GTNCTA() {
  return (
    <section className="py-32 bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
      </div>

      <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6">
            Start Your Journey with GTN Today
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed font-semibold">
            Build your network. Grow your income. Become the leader you were meant to be.
          </p>
          <Button className="bg-white text-primary hover:bg-white/90 h-16 px-12 text-xl font-display font-bold uppercase tracking-wider shadow-2xl hover:shadow-xl transition-all">
            Get Started Now <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
          <p className="text-white/80 mt-12 text-xl font-display font-semibold">
            GTN Global Team of Network<br />
            <span className="text-white/70">Stronger Together. United We Grow.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
