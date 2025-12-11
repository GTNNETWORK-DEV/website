import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, Coins } from "lucide-react";

const platforms = [
  {
    icon: TrendingUp,
    title: "Forex & Crypto MT5 Trading",
    description: "Access to advanced trading platforms for forex and cryptocurrency markets.",
    color: "text-primary"
  },
  {
    icon: DollarSign,
    title: "Stock & Equity Brokerage",
    description: "Invest in stocks and equities with guidance from our support team.",
    color: "text-secondary"
  },
  {
    icon: Coins,
    title: "Commodity Exchange",
    description: "Trade gold, silver, metals, and other commodities responsibly.",
    color: "text-accent"
  }
];

export function GTNPlatforms() {
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
          <h2 className="section-title text-white mb-6">Global Investment & Trading Platforms</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            GTN introduces members to internationally recognized third-party platforms with proper guidance and support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="feature-card h-full group">
                <div className={`w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center mb-6 ${platform.color} group-hover:bg-white/10 transition-all`}>
                  <platform.icon size={28} />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{platform.title}</h3>
                <p className="text-gray-400">{platform.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
