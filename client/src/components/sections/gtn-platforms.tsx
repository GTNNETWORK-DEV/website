import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Coins } from "lucide-react";

const platforms = [
  {
    icon: TrendingUp,
    title: "Forex & Crypto MT5 Trading",
    description: "Access to advanced trading platforms for forex and cryptocurrency markets."
  },
  {
    icon: DollarSign,
    title: "Stock & Equity Brokerage",
    description: "Invest in stocks and equities with guidance from our support team."
  },
  {
    icon: Coins,
    title: "Commodity Exchange",
    description: "Trade gold, silver, metals, and other commodities responsibly."
  }
];

export function GTNPlatforms() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">Global Investment & Trading Platforms</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            GTN introduces members to internationally recognized third-party platforms. Members receive proper guidance, support, and resources needed to navigate these platforms responsibly. Note: These platforms operate independently and are optional for members.
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
              <Card className="feature-card h-full group hover:border-secondary">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-all">
                    <platform.icon size={24} />
                  </div>
                  <CardTitle className="text-lg">{platform.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{platform.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
