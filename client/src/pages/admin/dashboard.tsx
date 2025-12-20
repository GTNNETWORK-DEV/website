import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  Newspaper,
  FolderKanban,
  LogOut,
  ArchiveRestore,
} from "lucide-react";
import { ProjectsManager } from "@/components/admin/projects-manager";
import { EventsManager } from "@/components/admin/events-manager";
import { NewsManager } from "@/components/admin/news-manager";
import { BlogsManager } from "@/components/admin/blogs-manager";
import { BackupManager } from "@/components/admin/backup-manager";
import { API_BASE } from "@/lib/api";

export default function AdminDashboard() {
  const [_, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("projects");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function verifySession() {
      try {
        const res = await fetch(`${API_BASE}/session`, {
          credentials: "include",
        });
        const data = await res.json();

        if (!data?.authenticated) {
          setLocation("/admin");
          return;
        }
      } catch (_err) {
        setLocation("/admin");
        return;
      } finally {
        setCheckingAuth(false);
      }
    }

    verifySession();
  }, [setLocation, API_BASE]);

  const handleLogout = async () => {
    await fetch(`${API_BASE}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setLocation("/admin");
  };

  const tabs = [
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "events", label: "Events", icon: Calendar },
    { id: "news", label: "News", icon: Newspaper },
    { id: "blogs", label: "Blogs", icon: FileText },
    { id: "backup", label: "Backup", icon: ArchiveRestore },
  ];

  if (checkingAuth) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-card fixed h-full z-10">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <img src="/gtn-logo.png" alt="GTN" className="w-10 h-10" />
            <div>
              <div className="font-display font-bold text-white">GTN Admin</div>
              <div className="text-xs text-primary">Dashboard</div>
            </div>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10 border-red-400/20"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          {activeTab === "projects" && <ProjectsManager />}
          {activeTab === "events" && <EventsManager />}
          {activeTab === "news" && <NewsManager />}
          {activeTab === "blogs" && <BlogsManager />}
          {activeTab === "backup" && <BackupManager />}
        </div>
      </main>
    </div>
  );
}
