import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function GTNAbout() {
  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden">
      {/* subtle background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-white mb-6">About GTN</h2>
        </motion.div>

        {/* TOP ROW */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* WHO WE ARE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card
              className="
                rounded-2xl
                p-8
                bg-linear-to-b from-[#141c2e] to-[#0e1424]
                border border-white/10
                shadow-[0_10px_30px_-15px_rgba(0,0,0,0.9)]
                hover:border-primary/40
                transition-all
              "
            >
              <h3 className="text-2xl font-display font-bold text-primary mb-4">
                Who We Are
              </h3>
              <p className="text-gray-300 leading-relaxed">
                GTN was created by experienced network marketers, educators,
                and industry leaders who recognized a growing need for a safe,
                structured, and reliable platform for global networking.
              </p>
              <p className="text-gray-400 mt-4">
                Our focus is simple: to support, guide, protect, and elevate
                networkers through professional systems and verified
                opportunities.
              </p>
            </Card>
          </motion.div>

          {/* PHILOSOPHY */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card
              className="
                rounded-2xl
                p-8
                bg-linear-to-b from-[#141c2e] to-[#0e1424]
                border border-white/10
                shadow-[0_10px_30px_-15px_rgba(0,0,0,0.9)]
                hover:border-secondary/40
                transition-all
              "
            >
              <h3 className="text-2xl font-display font-bold text-secondary mb-4">
                Our Philosophy
              </h3>
              <p className="text-gray-300 font-semibold mb-4">
                We believe success is built through:
              </p>
              <ul className="space-y-3 text-gray-300">
                {[
                  "Ethical leadership",
                  "Correct knowledge",
                  "Verified opportunities",
                  "A supportive community",
                  "United teamwork",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* BOTTOM ROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {/* MISSION */}
          <Card
            className="
              rounded-2xl
              p-8
              bg-linear-to-br from-primary/10 via-[#141c2e] to-[#0e1424]
              border border-primary/20
              shadow-[0_10px_30px_-15px_rgba(0,0,0,0.9)]
            "
          >
            <h3 className="text-2xl font-display font-bold text-primary mb-4">
              OUR MISSION
            </h3>
            <p className="text-gray-300 leading-relaxed">
              To provide a global platform where networkers, professionals,
              and investors can access reliable opportunities, comprehensive
              training, and strong community support — enabling long-term,
              sustainable success.
            </p>
          </Card>

          {/* VISION */}
          <Card
            className="
              rounded-2xl
              p-8
              bg-linear-to-br from-secondary/10 via-[#141c2e] to-[#0e1424]
              border border-secondary/20
              shadow-[0_10px_30px_-15px_rgba(0,0,0,0.9)]
            "
          >
            <h3 className="text-2xl font-display font-bold text-secondary mb-4">
              OUR VISION
            </h3>
            <p className="text-gray-300 leading-relaxed">
              To be the world’s most trusted and influential networking
              community — transforming individuals into confident leaders
              and helping them build meaningful, stable, and rewarding careers.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
