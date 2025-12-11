import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Zap, Crown } from "lucide-react";

const modules = [
  {
    icon: BookOpen,
    title: "Basic Modules",
    color: "bg-blue-100 text-blue-600",
    items: [
      "Network Marketing Fundamentals",
      "How to start, present, and build your network",
      "Understanding compensation systems"
    ]
  },
  {
    icon: Zap,
    title: "Skilled Modules",
    color: "bg-yellow-100 text-yellow-600",
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
    color: "bg-primary/10 text-primary",
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">GTN Academy — Education & Training</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Education is the backbone of success. GTN Academy provides structured learning modules designed for all levels. Training is offered both online and offline to ensure every member can learn at their own pace.
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
                <CardHeader>
                  <div className={`w-14 h-14 rounded-lg ${module.color} flex items-center justify-center mb-4`}>
                    <module.icon size={28} />
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {module.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
