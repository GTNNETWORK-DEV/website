import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function GTNCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Start Your Journey with GTN Today
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Build your network. Grow your income. Become the leader you were meant to be.
          </p>
          <Button className="bg-white text-primary hover:bg-white/90 h-14 px-10 text-lg font-bold uppercase tracking-wide">
            Get Started Now
          </Button>
          <p className="text-white/80 mt-8 text-lg font-display font-semibold">
            GTN Global Team of Network<br />
            <span className="text-white/70">Stronger Together. United We Grow.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
