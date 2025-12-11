import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Coins, Briefcase, ShoppingBag } from "lucide-react";
import incomeChart from "@assets/generated_images/income_opportunities_growth_chart.png";

const projectTypes = [
  {
    icon: Coins,
    title: "Income Builder Projects",
    color: "text-primary",
    description: "Crypto ROI programs, long-term holding projects, passive income platforms.",
  },
  {
    icon: Briefcase,
    title: "Career Builder Projects",
    color: "text-secondary",
    description: "Service-based opportunities, uni-level and hybrid marketing systems, digital marketing projects.",
  },
  {
    icon: ShoppingBag,
    title: "Wealth Builder Projects",
    color: "text-accent",
    description: "Product-based opportunities, consumable goods, and ongoing service businesses.",
  }
];

export function GTNIncomeProjects() {
  return (
    <section className="py-32 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="section-title text-white mb-6">Verified Income Projects</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            GTN introduces members to carefully reviewed and verified income opportunities based on reliability, sustainability, and long-term value.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {projectTypes.map((project, index) => (
              <Card key={index} className="feature-card">
                <div className="flex gap-4 items-start">
                  <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 ${project.color}`}>
                    <project.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-bold text-white">{project.title}</h3>
                    <p className="text-gray-400 mt-2">{project.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src={incomeChart} alt="Income Growth" className="w-full rounded-2xl shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
