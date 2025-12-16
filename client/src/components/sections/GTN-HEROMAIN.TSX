import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import globalMap from "@assets/generated_images/professional_networking_global_connection.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export function GTNHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-background/80 pt-28 pb-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(76,175,80,0.2),rgba(210,180,222,0))]"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Animated floating orbs */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 rounded-full border border-primary/20"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full border border-secondary/20"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.span 
              variants={itemVariants}
              className="inline-block text-primary font-display font-bold text-lg mb-2 uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full border border-primary/30"
            >
              ✦ Welcome to GTN
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="section-title text-white leading-tight"
            >
              A Global Platform Built for <span className="gradient-accent text-transparent bg-clip-text">Networkers</span>
            </motion.h1>

            {/* Tagline with animation */}
            <motion.div
              variants={itemVariants}
            >
              <h2 className="text-3xl md:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-accent animate-pulse">
                Turn Your Network Into Net Worth
              </h2>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-300 leading-relaxed max-w-xl"
            >
              GTN is a global non-profit organization dedicated to empowering networkers, leaders, investors, and entrepreneurs across the world.
            </motion.p>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-400 leading-relaxed max-w-xl"
            >
              We provide a trusted environment where individuals can learn, grow, build teams, create sustainable income, and connect with a worldwide community of professionals.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 sm:flex-none"
              >
                <Button size="lg" className="cta-button h-14 px-10 text-lg shadow-xl w-full sm:w-auto">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 sm:flex-none"
              >
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-2 border-primary text-primary hover:bg-primary/10 rounded-lg w-full sm:w-auto">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Static Map with Glow Animation */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Moving glow animation left to right */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent rounded-2xl opacity-0 blur-3xl"
                animate={{
                  x: [-400, 400],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Pulsing glow background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl opacity-0 blur-2xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
              <img src={globalMap} alt="Global Network" className="w-full rounded-2xl shadow-2xl relative z-10 border border-white/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - positioned at bottom with good spacing */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Scroll to explore</span>
          <svg className="w-5 h-5 text-primary animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
