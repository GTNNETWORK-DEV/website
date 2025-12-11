import { motion } from "framer-motion";
import { Shield, Zap, Globe, Lock, Cpu, Network } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Execute transactions with near-zero latency using our proprietary consensus layer.",
    color: "text-yellow-400"
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Quantum-resistant encryption protocols protecting your digital assets 24/7.",
    color: "text-primary"
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Built to handle millions of concurrent users without compromising decentralization.",
    color: "text-pink-500"
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data belongs to you. Zero-knowledge proofs ensure complete anonymity.",
    color: "text-green-400"
  },
  {
    icon: Cpu,
    title: "Smart Contracts",
    description: "Turing-complete execution environment for complex decentralized applications.",
    color: "text-purple-400"
  },
  {
    icon: Network,
    title: "Interoperable",
    description: "Seamlessly bridge assets across multiple chains with our unified liquidity layer.",
    color: "text-orange-400"
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            CORE <span className="text-primary">ARCHTECTURE</span>
          </h2>
          <p className="text-muted-foreground font-tech text-lg max-w-2xl mx-auto">
            Engineered for performance, security, and scalability. The foundation for the next generation of dApps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 hover:border-primary/50 transition-colors duration-300 backdrop-blur-sm group h-full">
                <CardHeader>
                  <div className={`p-3 rounded-lg bg-white/5 w-fit mb-4 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                    <feature.icon size={32} />
                  </div>
                  <CardTitle className="font-display text-xl text-white group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-tech leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
