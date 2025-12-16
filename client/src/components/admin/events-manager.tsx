import { useEffect, useState } from "react";
import { Trash2, Upload, Plus, CalendarDays } from "lucide-react";
import { API_BASE as API } from "@/lib/api";

interface EventItem {
  id: number;
  name: string;
  event_date: string | null;
  location: string | null;
  link: string | null;
  image_url: string | null;
}

export function EventsManager() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
  const uploadImage = async (file: File) => {
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
      return;
    }

    setImageUrl(data.url);
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
    if (imageUrl) form.append("image_url", imageUrl);

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

    setName("");
    setEventDate("");
    setLocation("");
    setLink("");
    setImageUrl(null);
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
            <img src={imageUrl} className="h-14 rounded bg-white" />
          )}
        </div>

        <button
          onClick={createEvent}
          disabled={loading}
          className="bg-primary text-black px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {loading ? "Saving..." : "Add Event"}
        </button>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {events.map((e) => (
          <div
            key={e.id}
            className="bg-white/5 border border-white/10 p-4 rounded space-y-2"
          >
            {e.image_url && (
              <img
                src={e.image_url}
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
          </div>
        ))}
      </div>
    </div>
  );
}
