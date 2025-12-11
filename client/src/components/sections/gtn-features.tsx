import { motion } from "framer-motion";
import { Users, TrendingUp, Home, Handshake, DollarSign, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "Talk to Network Marketing Prospects",
    description: "From your country and connect with verified opportunities."
  },
  {
    icon: TrendingUp,
    title: "Fastest Way to Expand",
    description: "Your network marketing business locally and globally."
  },
  {
    icon: Home,
    title: "Quality Home-Based Leads",
    description: "Get quality home based business leads every day for free."
  },
  {
    icon: Handshake,
    title: "Meet Real Opportunities",
    description: "Meet real people looking for a genuine business opportunity."
  },
  {
    icon: DollarSign,
    title: "Promote & Attract Leaders",
    description: "Promote your website and attract new leaders to your team."
  },
  {
    icon: Target,
    title: "Target Your Audience",
    description: "Advertise to your target audience and build your presence."
  }
];

export function GTNFeatures() {
  return (
    <section id="offer" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-6">What We Offer</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            GTN delivers a complete ecosystem for networkers with tools, training, and opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="feature-card group h-full hover:border-primary">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon size={24} />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
