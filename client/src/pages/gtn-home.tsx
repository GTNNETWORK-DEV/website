import { GTNNavbar } from "@/components/layout/gtn-navbar";
import { GTNHero } from "@/components/sections/gtn-hero";
import { GTNAbout } from "@/components/sections/gtn-about";
import { GTNFeatures } from "@/components/sections/gtn-features";
import { GTNStats } from "@/components/sections/gtn-stats";
import { GTNJoin } from "@/components/sections/gtn-join";
import { GTNCTA } from "@/components/sections/gtn-cta";

export default function GTNHome() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <GTNNavbar />
      <GTNHero />
      <GTNAbout />
      <GTNFeatures />
      <GTNStats />
      <GTNJoin />
      <GTNCTA />
      
      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display text-sm">
            © 2024 GTN Global Team of Network. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
