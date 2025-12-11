import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Award, Users, Zap, TrendingUp, Globe } from "lucide-react";

const supportItems = [
  { icon: MapPin, title: "Country-Based Leadership", description: "Local leaders in your region" },
  { icon: Zap, title: "Local Events & Workshops", description: "In-person training and seminars" },
  { icon: Award, title: "Global Recognition", description: "Achievement ceremonies worldwide" },
  { icon: Users, title: "Community Growth", description: "Support structures for expansion" },
  { icon: TrendingUp, title: "Leadership Development", description: "Career pathway advancement" },
  { icon: Globe, title: "Global Presence", description: "Strong support in every market" }
];

export function GTNSupportSystem() {
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
          <h2 className="section-title mb-4">Global Support System</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            GTN's global support structure ensures members have access to leadership, training, and community support in their region. Our aim is to build a strong presence in every major market, providing unmatched support to all members.
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
              <Card className="feature-card h-full group hover:border-secondary">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-all">
                    <item.icon size={24} />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
