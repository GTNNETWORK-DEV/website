import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { API_BASE } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/media";
import { GTNNavbar } from "@/components/layout/gtn-navbar";
import { GTNPageHeader } from "@/components/layout/gtn-page-header";

interface Project {
  id: number;
  name: string;
  logo_url: string | null;
  description?: string | null;
  link?: string | null;
}

export default function GTNProjectDetail() {
  const [, params] = useRoute("/projects/:id");
  const projectId = params?.id;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;
    async function loadProject() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/projects/${projectId}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data);
          setError(null);
          return;
        }
      } catch (err) {
        console.error("Project detail fetch failed, falling back to list:", err);
      }

      // Fallback: fetch list and find by id
      try {
        const listRes = await fetch(`${API_BASE}/projects`);
        const listData = await listRes.json();
        const found = Array.isArray(listData)
          ? listData.find((item: any) => String(item.id) === String(projectId))
          : null;
        if (found) {
          setProject(found);
          setError(null);
        } else {
          setError("Project not found.");
        }
      } catch (err) {
        console.error("Project list fallback failed:", err);
        setError("Unable to load this project right now.");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <GTNNavbar />
      <section className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <GTNPageHeader
              title={project?.name || "Project Details"}
              subtitle={
                project?.description ||
                "Learn more about this GTN venture and its next steps."
              }
              kicker="Project Detail"
              backHref="/projects"
              backLabel="Back to Projects"
            />
          </div>

          {loading && (
            <div className="text-center py-16 text-gray-400">
              Loading project...
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-16 text-gray-400">{error}</div>
          )}

          {!loading && project && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 space-y-6">
              {project.logo_url && (
                <div className="flex justify-center">
                  <motion.img
                    src={resolveMediaUrl(project.logo_url)}
                    alt={project.name}
                    className="w-32 h-32 object-contain"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}

              <p className="text-gray-300 leading-relaxed text-base whitespace-pre-line text-center md:text-left">
                {project.description || "Stay tuned for more details about this project."}
              </p>

              <div className="flex flex-wrap gap-4 items-center justify-between">
                <Link href="/projects" className="text-primary underline text-sm">
                  Back to Projects
                </Link>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary text-sm font-semibold"
                  >
                    Visit Project Site <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
