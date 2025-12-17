import { motion } from "framer-motion";
import { ExternalLink, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import { Link } from "wouter";
import { resolveMediaUrl } from "@/lib/media";

interface Project {
  id: number;
  name: string;
  logo_url: string | null;
  link?: string | null;
}

export default function GTNProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          setProjects([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
        setLoading(false);
      });
  }, [API_BASE]);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
          <div>
            <h1 className="section-title text-white mb-3">Projects</h1>
            <p className="text-gray-400 max-w-2xl">
              Explore the ventures and initiatives we are building across the
              GTN ecosystem.
            </p>
          </div>
          <Link href="/" className="text-primary text-sm font-semibold">
            Back to Home
          </Link>
        </div>

        {loading && (
          <div className="text-center py-16 text-gray-400">
            Loading projects...
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Zap className="w-14 h-14 text-primary/30 mx-auto mb-4" />
            No projects yet. Check back soon!
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.04 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center"
              >
                {project.logo_url && (
                  <img
                    src={resolveMediaUrl(project.logo_url)}
                    alt={project.name}
                    className="w-28 h-28 object-contain mb-6"
                  />
                )}
                <h2 className="text-lg font-display font-bold text-white mb-2">
                  {project.name}
                </h2>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm font-semibold inline-flex items-center gap-2"
                  >
                    Visit Project <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
