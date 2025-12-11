import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GTNAbout() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-6">About GTN</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            GTN was created by experienced network marketers, educators, and industry leaders who recognized a growing need for a safe, structured, and reliable platform for global networking.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="feature-card h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To provide a global platform where networkers, professionals, and investors can access reliable opportunities, comprehensive training, and strong community support enabling them to create long-term, sustainable success.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="feature-card h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be the world's most trusted and influential networking community, recognized for transforming individuals into confident leaders and helping them build meaningful, stable, and rewarding careers.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-blue-50 rounded-lg p-8"
        >
          <h3 className="text-2xl font-display font-bold mb-6 text-foreground">Our Core Philosophy</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Ethical leadership",
              "Correct knowledge",
              "Verified opportunities",
              "A supportive community",
              "United teamwork",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold">
                  ✓
                </div>
                <span className="text-lg text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
