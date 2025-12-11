import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroBg from "@assets/generated_images/futuristic_abstract_blockwave_background.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-background/20 z-10 mix-blend-overlay" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src={heroBg}
          alt="Blockwave Background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary font-tech text-sm tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
            The Next Generation Protocol
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-white mb-6"
        >
          BLOCK<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-pulse">WAVE</span> NATION
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-tech font-light leading-relaxed"
        >
          Experience the convergence of decentralized finance and digital sovereignty. 
          Building the infrastructure for the next era of the internet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="lg" className="bg-primary text-black hover:bg-primary/80 font-tech uppercase tracking-wider text-base h-12 px-8 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300">
            Start Building <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white font-tech uppercase tracking-wider text-base h-12 px-8 backdrop-blur-sm">
            View Documentation
          </Button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}
