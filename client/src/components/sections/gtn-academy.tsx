import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BookOpen, Zap, Crown } from "lucide-react";

const modules = [
  {
    icon: BookOpen,
    title: "Basic Modules",
    color: "text-secondary",
    items: [
      "Network Marketing Fundamentals",
      "How to start, present, and build your network",
      "Understanding compensation systems"
    ]
  },
  {
    icon: Zap,
    title: "Skilled Modules",
    color: "text-accent",
    items: [
      "Leadership skills",
      "Team building",
      "Train-the-trainer",
      "Presentation and communication mastery"
    ]
  },
  {
    icon: Crown,
    title: "Mastery Modules",
    color: "text-primary",
    items: [
      "Advanced leadership",
      "Business management",
      "Personal branding",
      "Strategic growth planning"
    ]
  }
];

export function GTNAcademy() {
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
          <h2 className="section-title text-white mb-6">GTN Academy — Education & Training</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Education is the backbone of success. GTN Academy provides structured learning modules designed for all levels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="feature-card h-full">
                <div className={`w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center mb-6 ${module.color}`}>
                  <module.icon size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-6">{module.title}</h3>
                <ul className="space-y-4">
                  {module.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="text-primary font-bold mt-1">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
