import { motion } from "framer-motion";
import { ExternalLink, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { API_BASE } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/media";

interface Project {
  logo: string | undefined;
  id: string;
  name: string;
  logo_url: string | null;
  link?: string | null;
}

export function GTNOngoingProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const emptyMessages = [
    "Evaluating prospects",
    "Inspecting variables",
    "Scrutinizing team",
  ];
  const [emptyIndex, setEmptyIndex] = useState(0);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(`${API_BASE}/projects`);
        const data = await res.json();

        // PHP gives logo_url → component needs logo
        const formatted = data.map((p: any) => ({
          ...p,
          logo: p.logo_url,
        }));

        setProjects(formatted);
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [API_BASE]);

  useEffect(() => {
    if (loading || projects.length > 0) return;

    const interval = setInterval(() => {
      setEmptyIndex((prev) => (prev + 1) % emptyMessages.length);
    }, 1400);

    return () => clearInterval(interval);
  }, [loading, projects.length, emptyMessages.length]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const getJustifyClass = () => {
    if (projects.length === 1) return "justify-center";
    if (projects.length === 2) return "justify-center gap-12";
    if (projects.length === 3) return "justify-center gap-8";
    return "justify-center gap-6";
  };

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="section-title text-white mb-6">Ongoing Projects</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the exciting initiatives and ventures we're currently building within the GTN ecosystem.
          </p>
        </motion.div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Loading Projects...</p>
          </div>
        ) : projects.length === 0 ? (
          
          // NO PROJECTS
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <Zap className="w-16 h-16 text-primary/30 mx-auto mb-4" />
            <p className="text-gray-300 text-lg font-medium">
              {emptyMessages[emptyIndex]}...
            </p>
            <div className="mt-6 h-1 w-56 mx-auto rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full w-1/2 bg-primary"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        ) : (
          
          // PROJECT GRID
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className={`flex flex-wrap items-center ${getJustifyClass()} max-w-6xl mx-auto`}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group"
              >
                {project.link ? (
                  
                  // LINKED PROJECT CARD
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative"
                  >
                    <div className="relative bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-xl p-8 backdrop-blur-lg hover:border-primary/30 transition-all">
                      <img
                        src={resolveMediaUrl(project.logo)}
                        alt={project.name}
                        className="w-32 h-32 object-contain mb-4 mx-auto group-hover:scale-110 transition-transform"
                      />
                      <h3 className="text-lg font-display font-bold text-white text-center mb-2 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 text-primary text-sm font-semibold">
                        Visit <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </a>
                ) : (
                  
                  // NON-LINKED PROJECT CARD
                  <div className="bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-xl p-8 backdrop-blur-lg hover:border-primary/30 transition-all">
                    <img
                      src={resolveMediaUrl(project.logo)}
                      alt={project.name}
                      className="w-32 h-32 object-contain mb-4 mx-auto group-hover:scale-110 transition-transform"
                    />
                    <h3 className="text-lg font-display font-bold text-white text-center">
                      {project.name}
                    </h3>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
