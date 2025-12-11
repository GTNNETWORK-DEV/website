import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Users, Zap, Globe, Search, Megaphone } from "lucide-react";

const tools = [
  { icon: Lightbulb, title: "High-Quality Global Leads", description: "Access to verified prospects worldwide" },
  { icon: Users, title: "Industry Leader Network", description: "Connect with experienced professionals" },
  { icon: Zap, title: "Promotional Support", description: "Marketing and advertising assistance" },
  { icon: Globe, title: "Global Growth Tools", description: "Expand teams locally and internationally" },
  { icon: Search, title: "Opportunity Discovery", description: "Find the right projects for your goals" },
  { icon: Megaphone, title: "Member Amplification", description: "Reach broader audiences easily" }
];

export function GTNNetworkExpansion() {
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
          <h2 className="section-title mb-4">Network Expansion & Lead Generation</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            GTN provides advanced networking tools to help members expand their reach. GTN makes it easier for members to connect, collaborate, and build thriving organizations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Card className="feature-card h-full group hover:border-primary">
                <CardContent className="pt-8 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <tool.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
