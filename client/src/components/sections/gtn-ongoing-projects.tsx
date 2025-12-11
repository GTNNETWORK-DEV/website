import { motion } from "framer-motion";
import { ExternalLink, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface Project {
  id: string;
  name: string;
  logo: string;
  link?: string;
}

export function GTNOngoingProjects() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("gtn_projects");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("gtn_projects", JSON.stringify(projects));
  }, [projects]);

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

  // Calculate justify alignment based on project count
  const getJustifyClass = () => {
    if (projects.length === 1) return "justify-center";
    if (projects.length === 2) return "justify-center gap-12";
    if (projects.length === 3) return "justify-center gap-8";
    return "justify-center gap-6";
  };

  return (
    <section id="projects" className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="section-title text-white mb-6">Ongoing Projects</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the exciting initiatives and ventures we're currently building within the GTN ecosystem.
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <Zap className="w-16 h-16 text-primary/30 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No projects yet. Check back soon!</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl opacity-0 blur-xl group-hover:opacity-50 transition-opacity duration-300"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                    <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8 backdrop-blur-lg hover:border-primary/30 transition-all duration-300">
                      <img
                        src={project.logo}
                        alt={project.name}
                        className="w-32 h-32 object-contain mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
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
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(76, 175, 80, 0)",
                        "0 0 40px rgba(76, 175, 80, 0.3)",
                        "0 0 20px rgba(76, 175, 80, 0)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-8 backdrop-blur-lg hover:border-primary/30 transition-all duration-300"
                  >
                    <img
                      src={project.logo}
                      alt={project.name}
                      className="w-32 h-32 object-contain mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
                    />
                    <h3 className="text-lg font-display font-bold text-white text-center group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
