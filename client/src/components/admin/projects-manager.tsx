import { useEffect, useState } from "react";
import { Trash2, Plus, Upload } from "lucide-react";
import { API_BASE } from "@/lib/api";

interface Project {
  id: number;
  name: string;
  logo_url: string | null;
  link: string | null;
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // -----------------------
  // FETCH PROJECTS
  // -----------------------
  const fetchProjects = async () => {
    const res = await fetch(`${API_BASE}/projects.php`);
    const data = await res.json();
    setProjects(data || []);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // -----------------------
  // UPLOAD IMAGE
  // -----------------------
  const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`${API_BASE}/upload.php`, {
      method: "POST",
      body: form,
      credentials: "include",
    });

    const data = await res.json();
    if (!data.success) {
      alert(data.error || "Upload failed");
      return;
    }

    setLogoUrl(data.url);
  };

  // -----------------------
  // CREATE PROJECT
  // -----------------------
  const createProject = async () => {
    if (!name.trim()) {
      alert("Project name required");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("name", name);
    if (logoUrl) form.append("logo_url", logoUrl);
    if (link) form.append("link", link);

    const res = await fetch(`${API_BASE}/projects.php`, {
      method: "POST",
      body: form,
      credentials: "include",
    });

    const data = await res.json();

    setLoading(false);

    if (!data.success) {
      alert(data.error || "Failed to create project");
      return;
    }

    setName("");
    setLink("");
    setLogoUrl(null);
    fetchProjects();
  };

  // -----------------------
  // DELETE PROJECT
  // -----------------------
  const deleteProject = async (id: number) => {
    if (!confirm("Delete this project?")) return;

    const res = await fetch(`${API_BASE}/projects.php`, {
      method: "DELETE",
      credentials: "include",
      body: new URLSearchParams({ id: String(id) }),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.error || "Delete failed");
      return;
    }

    fetchProjects();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Projects Manager</h1>

      {/* CREATE FORM */}
      <div className="bg-white/5 p-6 rounded-lg border border-white/10 space-y-4">
        <input
          className="w-full p-2 rounded bg-black border border-white/20"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-black border border-white/20"
          placeholder="Project link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <div className="flex items-center gap-4">
          <label className="cursor-pointer flex items-center gap-2 text-sm text-primary">
            <Upload className="w-4 h-4" />
            Upload Logo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                e.target.files && uploadImage(e.target.files[0])
              }
            />
          </label>

          {logoUrl && (
            <img
              src={logoUrl}
              alt="preview"
              className="h-12 rounded bg-white"
            />
          )}
        </div>

        <button
          onClick={createProject}
          disabled={loading}
          className="px-4 py-2 bg-primary text-black rounded flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {loading ? "Saving..." : "Add Project"}
        </button>
      </div>

      {/* PROJECT LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="border border-white/10 rounded-lg p-4 bg-white/5 space-y-3"
          >
            {p.logo_url && (
              <img
                src={p.logo_url}
                alt={p.name}
                className="h-24 mx-auto object-contain"
              />
            )}

            <h3 className="text-lg font-semibold text-center">{p.name}</h3>

            {p.link && (
              <a
                href={p.link}
                target="_blank"
                className="text-sm text-primary block text-center"
              >
                Visit
              </a>
            )}

            <button
              onClick={() => deleteProject(p.id)}
              className="w-full mt-2 text-red-400 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
