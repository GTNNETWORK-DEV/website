import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MapPin, Award, Users, Zap, TrendingUp, Globe } from "lucide-react";

const supportItems = [
  { icon: MapPin, title: "Country-Based Leadership", color: "text-primary" },
  { icon: Zap, title: "Local Events & Workshops", color: "text-secondary" },
  { icon: Award, title: "Global Recognition", color: "text-accent" },
  { icon: Users, title: "Community Growth", color: "text-primary" },
  { icon: TrendingUp, title: "Leadership Development", color: "text-secondary" },
  { icon: Globe, title: "Global Presence", color: "text-accent" }
];

export function GTNSupportSystem() {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="section-title text-white mb-6">Global Support System</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Members have access to leadership, training, and community support in their region with strong presence in every market.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Card className="feature-card h-full group">
                <div className={`w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center mb-6 ${item.color} group-hover:bg-white/10 transition-all`}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-lg font-display font-bold text-white">{item.title}</h3>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
