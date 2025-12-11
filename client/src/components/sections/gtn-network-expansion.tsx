import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Lightbulb, Users, Zap, Globe, Search, Megaphone } from "lucide-react";
import teamImg from "@assets/generated_images/global_leadership_and_teamwork.png";

const tools = [
  { icon: Lightbulb, title: "High-Quality Global Leads", color: "text-primary" },
  { icon: Users, title: "Industry Leader Network", color: "text-secondary" },
  { icon: Zap, title: "Promotional Support", color: "text-accent" },
  { icon: Globe, title: "Global Growth Tools", color: "text-primary" },
  { icon: Search, title: "Opportunity Discovery", color: "text-secondary" },
  { icon: Megaphone, title: "Member Amplification", color: "text-accent" }
];

export function GTNNetworkExpansion() {
  return (
    <section className="py-32 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="section-title text-white mb-6">Network Expansion & Lead Generation</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Advanced tools to help members expand their reach and build thriving organizations globally.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src={teamImg} alt="Team Collaboration" className="w-full rounded-2xl shadow-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {tools.map((tool, index) => (
              <Card key={index} className="feature-card">
                <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 ${tool.color}`}>
                  <tool.icon size={24} />
                </div>
                <h3 className="font-display font-bold text-white">{tool.title}</h3>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
