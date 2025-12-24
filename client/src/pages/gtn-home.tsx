import { GTNNavbar } from "@/components/layout/gtn-navbar";
import { GTNHero } from "@/components/sections/gtn-hero";
import { GTNAbout } from "@/components/sections/gtn-about";
import { GTNBenefits } from "@/components/sections/gtn-benefits";
import { GTNAcademy } from "@/components/sections/gtn-academy";
import { GTNIncomeProjects } from "@/components/sections/gtn-income-projects";
import { GTNOngoingProjects } from "@/components/sections/gtn-ongoing-projects";
import { GTNOngoingEvents } from "@/components/sections/gtn-ongoing-events";
import { GTNPlatforms } from "@/components/sections/gtn-platforms";
import { GTNNetworkExpansion } from "@/components/sections/gtn-network-expansion";
import { GTNSupportSystem } from "@/components/sections/gtn-support-system";
import { GTNWhyChoose } from "@/components/sections/gtn-why-choose";
import { GTNLeadGeneration } from "@/components/sections/LeadGeneration";
import { GTNLeadBenefits } from "@/components/sections/GTNLeadBenefits";
import { GTNBlog } from "@/components/sections/gtn-blog";
import { GTNNews } from "@/components/sections/gtn-news";
import { GTNJoin } from "@/components/sections/gtn-join";
import { GTNCTA } from "@/components/sections/gtn-cta";
import { GTNStats } from "@/components/sections/GTNStats";
import { GTNCryptoTable } from "@/components/sections/gtn-crypto-table";
import { GTNSocialTab } from "@/components/sections/GTNSocialTab";
import { GTNWhatsAppSupport } from "@/components/sections/GTNWhatsAppSupport";


export default function GTNHome() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <GTNSocialTab />
      <GTNWhatsAppSupport /> 
      <GTNNavbar />
      <GTNHero />
      <GTNLeadBenefits />
      <GTNStats />
      <GTNAbout />
      <GTNOngoingProjects />
      <GTNOngoingEvents />
      <GTNBenefits />
      <GTNAcademy />
      <GTNIncomeProjects />
      <GTNPlatforms />
      <GTNNetworkExpansion />
      <GTNLeadGeneration />

      <GTNSupportSystem />
      <GTNWhyChoose />
      <GTNCryptoTable />
      <GTNBlog />
      <GTNNews />
      <GTNJoin />
      <GTNCTA />
      
      {/* Footer */}
      <footer className="py-16 bg-background border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src="/gtn-logo.png" alt="GTN Logo" className="w-16 h-16" />
                <div>
                  <div className="text-lg font-display font-black text-white">GTN</div>
                  <div className="text-xs font-semibold text-primary uppercase tracking-widest">Global Team Network</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Empowering networkers, leaders, and investors worldwide.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display font-bold text-white mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#offer" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#join" className="hover:text-primary transition-colors">Join</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-display font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-display font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-gray-400 text-sm text-center">
              © 2025 GTN Global Team of Network. All Rights Reserved.<br />
              <span className="text-primary font-semibold">Stronger Together. United We Grow.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
