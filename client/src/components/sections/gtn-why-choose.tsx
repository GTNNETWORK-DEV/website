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
    <section className="py-32 bg-linear-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="section-title text-white mb-6">Why Networkers Choose GTN</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            GTN isn't just a platform — It's a global movement built for people who want to succeed with integrity.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                  <Check size={16} className="text-white" />
                </div>
                <p className="text-lg text-gray-300 font-medium">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
