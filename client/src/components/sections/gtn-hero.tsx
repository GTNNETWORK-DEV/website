import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function GTNHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 pt-16">
      <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
            Welcome to <span className="text-primary">GTN</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-3xl font-display font-semibold text-secondary mb-8"
        >
          Turn Your Network Into Net Worth
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          GTN is a global non-profit organization dedicated to empowering networkers, leaders, investors, and entrepreneurs across the world. We provide a trusted environment where you can learn, grow, build teams, create sustainable income, and connect with a worldwide community of professionals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="cta-button h-14 px-10 text-lg shadow-lg hover:shadow-xl transition-shadow">
            Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-2 border-primary text-primary hover:bg-primary/5">
            Learn More
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
