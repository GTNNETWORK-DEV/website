import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Briefcase, ShoppingBag } from "lucide-react";

const projectTypes = [
  {
    icon: Coins,
    title: "Income Builder Projects",
    color: "bg-green-100 text-green-600",
    description: "Crypto ROI programs, long-term holding projects, passive income platforms.",
    highlight: "Passive Income"
  },
  {
    icon: Briefcase,
    title: "Career Builder Projects",
    color: "bg-blue-100 text-blue-600",
    description: "Service-based opportunities, uni-level and hybrid marketing systems, digital marketing projects.",
    highlight: "Career Growth"
  },
  {
    icon: ShoppingBag,
    title: "Wealth Builder Projects",
    color: "bg-purple-100 text-purple-600",
    description: "Product-based opportunities, consumable goods, and ongoing service businesses.",
    highlight: "Long-term Wealth"
  }
];

export function GTNIncomeProjects() {
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
          <h2 className="section-title mb-4">Verified Income Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            GTN introduces members to carefully reviewed and verified income opportunities. Our team evaluates and approves projects based on reliability, sustainability, and long-term value. GTN acts as a bridge to connect members with genuine, transparent, and sustainable income options.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projectTypes.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="feature-card h-full hover:shadow-xl transition-all">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-lg ${project.color} flex items-center justify-center mb-4`}>
                    <project.icon size={28} />
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <span className="text-sm font-semibold text-primary mt-2 inline-block">✓ {project.highlight}</span>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
