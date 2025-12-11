import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Building2 } from "lucide-react";
import { useState } from "react";

export function GTNJoin() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    company: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form will POST to PHP backend
    const form = e.currentTarget as HTMLFormElement;
    form.submit();
  };

  return (
    <section id="membership" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-6">Join GTN Today</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take the first step towards building your network and creating sustainable income. Join thousands of networkers already growing with GTN.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="feature-card">
            <form
              onSubmit={handleSubmit}
              method="POST"
              action="https://your-cheep-php-endpoint.com/join"
              className="space-y-6"
            >
              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-primary" />
                    Full Name
                  </div>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email Address
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                />
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone Number
                  </div>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                />
              </motion.div>

              {/* Country */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Country
                  </div>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  placeholder="Select your country"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                />
              </motion.div>

              {/* Company/Organization */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    Company/Organization (Optional)
                  </div>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company or organization"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                />
              </motion.div>

              {/* Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="w-5 h-5 rounded border-gray-200 text-primary focus:ring-primary mt-1"
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to the GTN Terms of Service and Privacy Policy
                  </span>
                </label>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button
                  type="submit"
                  className="cta-button w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Join GTN Now
                </Button>
              </motion.div>
            </form>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            <span className="text-primary font-semibold">Free to join.</span> Start building your network today. Our support team is ready to help you succeed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
