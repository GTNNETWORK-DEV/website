import { useEffect, useState } from "react";
import { Trash2, Upload, Plus, CalendarDays, X, Pencil } from "lucide-react";
import { API_BASE as API } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/media";

interface EventItem {
  id: number;
  name: string;
  event_date: string | null;
  location: string | null;
  link: string | null;
  image_url: string | null;
  description?: string | null;
  images?: string[];
}

const MAX_EVENT_IMAGES = 30;

export function EventsManager() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // ------------------
  // FETCH EVENTS
  // ------------------
  const fetchEvents = async () => {
    const res = await fetch(`${API}/events`);
    const data = await res.json();
    setEvents(data || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ------------------
  // UPLOAD IMAGE
  // ------------------
  const uploadImages = async (files: FileList) => {
    const remaining = MAX_EVENT_IMAGES - imageUrls.length;
    if (remaining <= 0) {
      alert(`You can upload up to ${MAX_EVENT_IMAGES} images.`);
      return;
    }

    const selected = Array.from(files).slice(0, remaining);
    if (selected.length === 0) {
      return;
    }

    setUploading(true);
    const uploaded: string[] = [];

    for (const file of selected) {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch(`${API}/upload`, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      const data = await res.json();
      if (!data.success) {
        alert(data.error || "Upload failed");
        continue;
      }

      uploaded.push(data.url);
    }

    setUploading(false);
    if (uploaded.length > 0) {
      setImageUrls((prev) => [...prev, ...uploaded]);
    }
  };

  const removeImage = (url: string) => {
    setImageUrls((prev) => prev.filter((item) => item !== url));
  };

  const resetForm = () => {
    setName("");
    setEventDate("");
    setLocation("");
    setLink("");
    setDescription("");
    setImageUrls([]);
    setEditingId(null);
  };

  const startEdit = (event: EventItem) => {
    setEditingId(event.id);
    setName(event.name || "");
    setEventDate(event.event_date || "");
    setLocation(event.location || "");
    setLink(event.link || "");
    setDescription(event.description || "");
    if (event.images && event.images.length > 0) {
      setImageUrls(event.images);
    } else if (event.image_url) {
      setImageUrls([event.image_url]);
    } else {
      setImageUrls([]);
    }
  };

  // ------------------
  // CREATE EVENT
  // ------------------
  const createEvent = async () => {
    if (!name) {
      alert("Event name is required");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("name", name);
    if (eventDate) form.append("event_date", eventDate);
    if (location) form.append("location", location);
    if (link) form.append("link", link);
    if (description) form.append("description", description);
    if (imageUrls.length > 0) {
      form.append("image_urls", JSON.stringify(imageUrls));
    }

    const res = await fetch(`${API}/events`, {
      method: "POST",
      body: form,
      credentials: "include",
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      alert(data.error || "Failed to create event");
      return;
    }

    resetForm();
    fetchEvents();
  };

  // ------------------
  // UPDATE EVENT
  // ------------------
  const updateEvent = async () => {
    if (!editingId) return;
    if (!name) {
      alert("Event name is required");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("id", String(editingId));
    form.append("name", name);
    form.append("event_date", eventDate);
    form.append("location", location);
    form.append("link", link);
    form.append("description", description);
    form.append("image_urls", JSON.stringify(imageUrls));

    const res = await fetch(`${API}/events`, {
      method: "PUT",
      body: form,
      credentials: "include",
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      alert(data.error || "Failed to update event");
      return;
    }

    resetForm();
    fetchEvents();
  };

  // ------------------
  // DELETE EVENT
  // ------------------
  const deleteEvent = async (id: number) => {
    if (!confirm("Delete this event?")) return;

    const res = await fetch(`${API}/events`, {
      method: "DELETE",
      credentials: "include",
      body: new URLSearchParams({ id: String(id) }),
    });

    const data = await res.json();
    if (!data.success) {
      alert(data.error || "Delete failed");
      return;
    }

    fetchEvents();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Events Manager</h1>

      {/* CREATE */}
      <div className="bg-white/5 p-6 rounded border border-white/10 space-y-4">
        <input
          className="w-full p-2 bg-black border border-white/20 rounded"
          placeholder="Event name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-2 bg-black border border-white/20 rounded"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />

        <input
          className="w-full p-2 bg-black border border-white/20 rounded"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="w-full p-2 bg-black border border-white/20 rounded"
          placeholder="Event link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <textarea
          className="w-full p-2 bg-black border border-white/20 rounded min-h-[120px]"
          placeholder="Event brief (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <label className="cursor-pointer text-primary flex items-center gap-2">
              <Upload className="w-4 h-4" />
              {uploading ? "Uploading..." : "Upload Images"}
              <input
                hidden
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => e.target.files && uploadImages(e.target.files)}
              />
            </label>
            <span className="text-xs text-gray-400">
              {imageUrls.length}/{MAX_EVENT_IMAGES}
            </span>
          </div>

          {imageUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {imageUrls.map((url) => (
                <div
                  key={url}
                  className="relative border border-white/10 rounded overflow-hidden"
                >
                  <img
                    src={resolveMediaUrl(url)}
                    className="h-20 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1"
                    aria-label="Remove image"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={editingId ? updateEvent : createEvent}
            disabled={loading || uploading}
            className="bg-primary text-black px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {loading
              ? "Saving..."
              : editingId
              ? "Update Event"
              : "Add Event"}
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
        {events.map((e) => (
          <div
            key={e.id}
            className="bg-white/5 border border-white/10 p-4 rounded space-y-2"
          >
            {(e.images?.[0] || e.image_url) && (
              <img
                src={resolveMediaUrl(e.images?.[0] || e.image_url)}
                className="h-32 w-full object-cover rounded"
              />
            )}

            <h3 className="font-semibold">{e.name}</h3>

            {e.event_date && (
              <p className="text-sm text-gray-400 flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {e.event_date}
              </p>
            )}

            {e.location && (
              <p className="text-sm text-gray-400">{e.location}</p>
            )}

            {e.description && (
              <p className="text-sm text-gray-400 line-clamp-2">
                {e.description}
              </p>
            )}

            {e.images && e.images.length > 0 && (
              <p className="text-xs text-gray-500">
                {e.images.length} images
              </p>
            )}

            {e.link && (
              <a
                href={e.link}
                target="_blank"
                className="text-primary text-sm"
              >
                Visit
              </a>
            )}

            <button
              onClick={() => deleteEvent(e.id)}
              className="text-red-400 flex items-center gap-2 mt-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>

            <button
              type="button"
              onClick={() => startEdit(e)}
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
