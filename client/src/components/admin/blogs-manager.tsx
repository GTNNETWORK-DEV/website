import { useEffect, useState } from "react";
import { Trash2, Upload, Plus, Pencil, X } from "lucide-react";
import { API_BASE } from "@/lib/api";

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  image_url: string | null;
}

export function BlogsManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // ------------------
  // FETCH BLOGS
  // ------------------
  const fetchBlogs = async () => {
    const res = await fetch(`${API_BASE}/blogs`);
    const data = await res.json();
    setBlogs(data || []);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ------------------
  // UPLOAD IMAGE
  // ------------------
  const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: form,
      credentials: "include",
    });

    const data = await res.json();
    if (!data.success) {
      alert(data.error || "Upload failed");
      return;
    }

    setImageUrl(data.url);
  };

  // ------------------
  // CREATE BLOG
  // ------------------
  const createBlog = async () => {
    if (!title || !excerpt || !author) {
      alert("All fields required");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("title", title);
    form.append("excerpt", excerpt);
    form.append("author", author);
    if (imageUrl) form.append("image_url", imageUrl);

    const res = await fetch(`${API_BASE}/blogs`, {
      method: "POST",
      body: form,
      credentials: "include",
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      alert(data.error || "Failed to create blog");
      return;
    }

    setTitle("");
    setExcerpt("");
    setAuthor("");
    setImageUrl(null);
    fetchBlogs();
  };

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setAuthor("");
    setImageUrl(null);
    setEditingId(null);
  };

  const startEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setTitle(blog.title || "");
    setExcerpt(blog.excerpt || "");
    setAuthor(blog.author || "");
    setImageUrl(blog.image_url || null);
  };

  // ------------------
  // UPDATE BLOG
  // ------------------
  const updateBlog = async () => {
    if (!editingId) return;
    if (!title || !excerpt || !author) {
      alert("All fields required");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("id", String(editingId));
    form.append("title", title);
    form.append("excerpt", excerpt);
    form.append("author", author);
    form.append("image_url", imageUrl || "");

    const res = await fetch(`${API_BASE}/blogs`, {
      method: "PUT",
      body: form,
      credentials: "include",
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      alert(data.error || "Failed to update blog");
      return;
    }

    resetForm();
    fetchBlogs();
  };

  // ------------------
  // DELETE BLOG
  // ------------------
  const deleteBlog = async (id: number) => {
    if (!confirm("Delete this blog?")) return;

    const res = await fetch(`${API_BASE}/blogs`, {
      method: "DELETE",
      credentials: "include",
      body: new URLSearchParams({ id: String(id) }),
    });

    const data = await res.json();
    if (!data.success) {
      alert(data.error || "Delete failed");
      return;
    }

    fetchBlogs();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Blogs Manager</h1>

      {/* CREATE */}
      <div className="bg-white/5 p-6 rounded-lg border border-white/10 space-y-4">
        <input
          className="w-full p-2 bg-black border border-white/20 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 bg-black border border-white/20 rounded"
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <input
          className="w-full p-2 bg-black border border-white/20 rounded"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <div className="flex items-center gap-4">
          <label className="cursor-pointer text-primary flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && uploadImage(e.target.files[0])
              }
            />
          </label>

          {imageUrl && (
            <div className="flex items-center gap-2">
              <img src={imageUrl} className="h-14 rounded bg-white" />
              <button
                type="button"
                onClick={() => setImageUrl(null)}
                className="text-xs text-red-300 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={editingId ? updateBlog : createBlog}
            disabled={loading}
            className="bg-primary text-black px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {loading
              ? "Saving..."
              : editingId
              ? "Update Blog"
              : "Add Blog"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border border-white/20 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((b) => (
          <div
            key={b.id}
            className="bg-white/5 border border-white/10 p-4 rounded space-y-2"
          >
            {b.image_url && (
              <img
                src={b.image_url}
                className="h-32 w-full object-cover rounded"
              />
            )}

            <h3 className="font-semibold">{b.title}</h3>
            <p className="text-sm text-gray-400">{b.excerpt}</p>
            <p className="text-xs text-gray-500">— {b.author}</p>

            <button
              onClick={() => deleteBlog(b.id)}
              className="text-red-400 flex items-center gap-2 mt-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>

            <button
              type="button"
              onClick={() => startEdit(b)}
              className="text-primary flex items-center gap-2 text-sm"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
