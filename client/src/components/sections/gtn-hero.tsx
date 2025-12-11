import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import globalMap from "@assets/generated_images/professional_networking_global_connection.png";

export function GTNHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-background/80 pt-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(76,175,80,0.2),rgba(210,180,222,0))]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-primary font-display font-bold text-lg mb-4 uppercase tracking-widest">
              ✦ Welcome to GTN
            </span>
            
            <h1 className="section-title mb-6 text-white">
              A Global Platform Built for <span className="gradient-accent text-transparent bg-clip-text">Networkers</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
              GTN is a global non-profit organization dedicated to empowering networkers, leaders, investors, and entrepreneurs across the world.
            </p>

            <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl">
              We provide a trusted environment where individuals can learn, grow, build teams, create sustainable income, and connect with a worldwide community of professionals.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="cta-button h-14 px-10 text-lg shadow-xl">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-2 border-primary text-primary hover:bg-primary/10 rounded-lg">
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <img src={globalMap} alt="Global Network" className="w-full rounded-2xl shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
