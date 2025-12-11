import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";

interface Project {
  id: string;
  name: string;
  logo: string;
  link?: string;
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("gtn_projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    link: "",
  });

  const [previewImage, setPreviewImage] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("gtn_projects", JSON.stringify(projects));
  }, [projects]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setFormData(prev => ({ ...prev, logo: base64 }));
        setPreviewImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = () => {
    if (formData.name && formData.logo) {
      if (editingId) {
        setProjects(projects.map(p => 
          p.id === editingId 
            ? { ...p, name: formData.name, logo: formData.logo, link: formData.link }
            : p
        ));
        setEditingId(null);
      } else {
        const newProject: Project = {
          id: Date.now().toString(),
          name: formData.name,
          logo: formData.logo,
          link: formData.link || undefined,
        };
        setProjects([...projects, newProject]);
      }
      setFormData({ name: "", logo: "", link: "" });
      setPreviewImage("");
    }
  };

  const handleEditProject = (project: Project) => {
    setFormData({
      name: project.name,
      logo: project.logo,
      link: project.link || "",
    });
    setPreviewImage(project.logo);
    setEditingId(project.id);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleCancel = () => {
    setFormData({ name: "", logo: "", link: "" });
    setPreviewImage("");
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h1 className="section-title text-white">Manage Projects</h1>
          <Link href="/">
            <a className="text-primary hover:text-primary/80 font-semibold">Back to Home</a>
          </Link>
        </div>

        {/* Add/Edit Project Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-3 gap-8 mb-12"
        >
          <div className="lg:col-span-2">
            <Card className="feature-card bg-card p-8">
              <h2 className="text-2xl font-display font-bold text-white mb-6">
                {editingId ? "Edit Project" : "Add New Project"}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Project Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Project name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Project Link (Optional)</label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <p className="text-xs text-gray-500 mt-2">Leave empty for image-only display with animation</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Project Logo/Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleAddProject}
                    className="cta-button flex-1 h-12 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> {editingId ? "Update Project" : "Add Project"}
                  </Button>
                  {editingId && (
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1 h-12"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Image Preview */}
          {previewImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-1"
            >
              <Card className="feature-card bg-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Logo Preview</h3>
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-32 object-contain rounded-lg border border-white/10 bg-white/5 p-4"
                />
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Projects Grid */}
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-6">All Projects ({projects.length})</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.length === 0 ? (
              <Card className="feature-card bg-card p-8 text-center md:col-span-2 lg:col-span-3">
                <p className="text-gray-400">No projects yet. Add your first project!</p>
              </Card>
            ) : (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="feature-card bg-card p-6 flex flex-col gap-4">
                    <img
                      src={project.logo}
                      alt={project.name}
                      className="w-full h-32 object-contain rounded-lg border border-white/10 bg-white/5 p-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
                      {project.link && (
                        <p className="text-sm text-primary truncate mb-4">{project.link}</p>
                      )}
                    </div>
                    <div className="flex gap-2 pt-4 border-t border-white/10">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="flex-1 p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="flex-1 p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
