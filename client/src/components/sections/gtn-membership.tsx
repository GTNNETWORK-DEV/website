import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const membershipPlans = [
  {
    name: "Affiliate",
    price: "Free",
    color: "bg-blue-50 border-blue-200",
    buttonColor: "border-2 border-primary text-primary hover:bg-primary/5",
    benefits: [
      "Basic training",
      "Community access",
      "Income project info",
      "Limited modules"
    ]
  },
  {
    name: "Premium",
    price: "Full Access",
    color: "bg-primary/5 border-primary",
    buttonColor: "cta-button",
    highlighted: true,
    benefits: [
      "Full GTN Academy",
      "Group accident insurance",
      "Discounts & rewards",
      "Exclusive projects",
      "All platforms",
      "Priority mentorship",
      "Leadership development"
    ]
  }
];

export function GTNMembership() {
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
          <h2 className="section-title mb-6">Membership Options</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for your journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {membershipPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`feature-card h-full border-2 ${plan.color} ${plan.highlighted ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                  <p className="text-3xl font-bold text-primary mt-2">{plan.price}</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <ul className="space-y-3">
                    {plan.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full h-12 text-base font-semibold ${plan.buttonColor}`}>
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
