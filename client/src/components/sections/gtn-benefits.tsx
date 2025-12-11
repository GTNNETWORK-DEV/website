import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Gift, Award, Zap, Users, TrendingUp } from "lucide-react";

const benefits = [
  { icon: Shield, title: "Group Accident Insurance", description: "Comprehensive coverage for peace of mind" },
  { icon: Gift, title: "Discount Programs", description: "Online and offline discounts for members" },
  { icon: Award, title: "Rewards & Recognition", description: "Leadership perks and achievement programs" },
  { icon: Zap, title: "Exclusive Events", description: "Access to achievement programs and networking" },
  { icon: Users, title: "Dedicated Support", description: "Personal mentorship and guidance" },
  { icon: TrendingUp, title: "Income Projects", description: "Access to verified training systems" }
];

export function GTNBenefits() {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">Membership Benefits & Protection</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            GTN provides a strong foundation of benefits that support your safety, growth, and long-term progress. We ensure every member has the backing and support they need to grow confidently.
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
              <Card className="feature-card h-full group hover:border-primary">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                    <benefit.icon size={24} />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
