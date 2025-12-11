import { motion } from "framer-motion";
import { Check } from "lucide-react";

const reasons = [
  "We create a safe and structured environment",
  "We provide verified opportunities, not hype",
  "We offer complete educational growth",
  "We connect you with global leaders & professionals",
  "We support you locally and internationally",
  "We focus on real, long-term success",
  "We believe in ethical, transparent leadership"
];

export function GTNWhyChoose() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-6">Why Networkers Choose GTN</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            GTN isn't just a platform — It's a global movement built for people who want to succeed with integrity.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-1">
                  <Check size={18} />
                </div>
                <p className="text-lg text-foreground font-medium leading-relaxed">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
