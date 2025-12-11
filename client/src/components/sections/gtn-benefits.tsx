import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Shield, Gift, Award, Zap, Users, TrendingUp } from "lucide-react";

const benefits = [
  { icon: Shield, title: "Group Accident Insurance", description: "Comprehensive coverage for peace of mind", color: "text-primary" },
  { icon: Gift, title: "Discount Programs", description: "Online and offline discounts for members", color: "text-secondary" },
  { icon: Award, title: "Rewards & Recognition", description: "Leadership perks and achievement programs", color: "text-accent" },
  { icon: Zap, title: "Exclusive Events", description: "Access to achievement programs and networking", color: "text-primary" },
  { icon: Users, title: "Dedicated Support", description: "Personal mentorship and guidance", color: "text-secondary" },
  { icon: TrendingUp, title: "Income Projects", description: "Access to verified training systems", color: "text-accent" }
];

export function GTNBenefits() {
  return (
    <section className="py-32 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="section-title text-white mb-6">Membership Benefits & Protection</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            GTN provides a strong foundation of benefits that support your safety, growth, and long-term progress.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="feature-card group h-full">
                <div className={`w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center mb-6 ${benefit.color} group-hover:bg-white/10 transition-all`}>
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-400">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
