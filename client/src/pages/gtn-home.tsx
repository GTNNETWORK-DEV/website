import { GTNNavbar } from "@/components/layout/gtn-navbar";
import { GTNHero } from "@/components/sections/gtn-hero";
import { GTNAbout } from "@/components/sections/gtn-about";
import { GTNBenefits } from "@/components/sections/gtn-benefits";
import { GTNAcademy } from "@/components/sections/gtn-academy";
import { GTNIncomeProjects } from "@/components/sections/gtn-income-projects";
import { GTNPlatforms } from "@/components/sections/gtn-platforms";
import { GTNNetworkExpansion } from "@/components/sections/gtn-network-expansion";
import { GTNSupportSystem } from "@/components/sections/gtn-support-system";
import { GTNWhyChoose } from "@/components/sections/gtn-why-choose";
import { GTNJoin } from "@/components/sections/gtn-join";
import { GTNCTA } from "@/components/sections/gtn-cta";

export default function GTNHome() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <GTNNavbar />
      <GTNHero />
      <GTNAbout />
      <GTNBenefits />
      <GTNAcademy />
      <GTNIncomeProjects />
      <GTNPlatforms />
      <GTNNetworkExpansion />
      <GTNSupportSystem />
      <GTNWhyChoose />
      <GTNJoin />
      <GTNCTA />
      
      <footer className="py-12 bg-background border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display font-bold text-white mb-2">
            © 2024 GTN Global Team of Network
          </p>
          <p className="text-gray-400 text-sm">
            Stronger Together. United We Grow.
          </p>
        </div>
      </footer>
    </div>
  );
}
