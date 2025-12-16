import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Download, LogOut, Search, Users, FolderKanban } from "lucide-react";
import { API_BASE } from "@/lib/api";

type JoinItem = {
  id: number;
  full_name: string;
  email?: string;
  phone?: string;
  country?: string;
  company?: string;
  created_at?: string;
};

type Project = { id: number };

const HARD_USER = "superadmin";
const HARD_PASS = "Gtn@123";

export default function JoinRequestsPage() {
  const [_, setLocation] = useLocation();
  const [authing, setAuthing] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [joinData, setJoinData] = useState<JoinItem[]>([]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [filter, setFilter] = useState("");

  // try to validate session on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/session`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data?.authenticated) {
          setAuthed(true);
          await loadData();
        }
      } catch {
        /* ignore */
      }
    })();
  }, []);

  const login = async () => {
    setAuthing(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: HARD_USER, password: HARD_PASS }),
      });
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      setAuthed(true);
      await loadData();
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setAuthing(false);
    }
  };

  const logout = async () => {
    await fetch(`${API_BASE}/logout`, { method: "POST", credentials: "include" });
    setAuthed(false);
    setJoinData([]);
  };

  const loadData = async () => {
    setError("");
    try {
      const [joinsRes, projectsRes] = await Promise.all([
        fetch(`${API_BASE}/join`, { credentials: "include" }),
        fetch(`${API_BASE}/projects`, { credentials: "include" }),
      ]);
      if (!joinsRes.ok) throw new Error("Failed to load join data");
      if (!projectsRes.ok) throw new Error("Failed to load projects");
      const joinsJson: JoinItem[] = await joinsRes.json();
      const projectsJson: Project[] = await projectsRes.json();
      setJoinData(Array.isArray(joinsJson) ? joinsJson : []);
      setProjectsCount(Array.isArray(projectsJson) ? projectsJson.length : 0);
    } catch (err: any) {
      setError(err?.message || "Load failed");
    }
  };

  const filtered = useMemo(() => {
    const term = filter.trim().toLowerCase();
    if (!term) return joinData;
    return joinData.filter((j) =>
      `${j.full_name} ${j.email || ""} ${j.phone || ""} ${j.country || ""} ${j.company || ""}`
        .toLowerCase()
        .includes(term),
    );
  }, [filter, joinData]);

  const downloadXls = () => {
    const rows = [
      ["ID", "Full Name", "Email", "Phone", "Country", "Company", "Created At"],
      ...joinData.map((j) => [
        j.id,
        j.full_name,
        j.email || "",
        j.phone || "",
        j.country || "",
        j.company || "",
        j.created_at || "",
      ]),
    ];
    const csv = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "join_requests.xlsx"; // will open as Excel
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-sm w-full bg-card border border-white/10 rounded-xl p-6 space-y-4">
          <h1 className="text-xl font-bold text-white text-center">Join Requests Admin</h1>
          <p className="text-sm text-gray-400 text-center">Enter superadmin credentials to continue</p>
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          <button
            onClick={login}
            disabled={authing}
            className="w-full bg-primary text-black font-semibold py-3 rounded-lg disabled:opacity-60"
          >
            {authing ? "Signing in..." : "Sign in as superadmin"}
          </button>
          <div className="text-xs text-gray-500 text-center">
            Username: {HARD_USER} &nbsp;|&nbsp; Password: {HARD_PASS}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white px-6 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Join Requests</h1>
          <p className="text-gray-400 text-sm">View and export all join submissions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={downloadXls}
            className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg"
          >
            <Download className="w-4 h-4" />
            Download XLS
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-card border border-white/10 rounded-xl p-4 flex items-center gap-3">
          <div className="bg-primary/20 text-primary p-3 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase text-gray-400">Total Join Requests</div>
            <div className="text-2xl font-bold">{joinData.length}</div>
          </div>
        </div>
        <div className="bg-card border border-white/10 rounded-xl p-4 flex items-center gap-3">
          <div className="bg-primary/20 text-primary p-3 rounded-lg">
            <FolderKanban className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase text-gray-400">Total Projects</div>
            <div className="text-2xl font-bold">{projectsCount}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by name, email, phone, country, or company"
            className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
          />
        </div>
        <button
          onClick={loadData}
          className="bg-white/10 border border-white/10 px-4 py-2 rounded-lg hover:bg-white/20"
        >
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-white/10 text-sm">
          <thead className="bg-white/5">
            <tr className="text-left">
              <th className="px-3 py-2 border-b border-white/10">ID</th>
              <th className="px-3 py-2 border-b border-white/10">Name</th>
              <th className="px-3 py-2 border-b border-white/10">Email</th>
              <th className="px-3 py-2 border-b border-white/10">Phone</th>
              <th className="px-3 py-2 border-b border-white/10">Country</th>
              <th className="px-3 py-2 border-b border-white/10">Company</th>
              <th className="px-3 py-2 border-b border-white/10">Created</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((j) => (
              <tr key={j.id} className="hover:bg-white/5">
                <td className="px-3 py-2 border-b border-white/10">{j.id}</td>
                <td className="px-3 py-2 border-b border-white/10">{j.full_name}</td>
                <td className="px-3 py-2 border-b border-white/10">{j.email || "—"}</td>
                <td className="px-3 py-2 border-b border-white/10">{j.phone || "—"}</td>
                <td className="px-3 py-2 border-b border-white/10">{j.country || "—"}</td>
                <td className="px-3 py-2 border-b border-white/10">{j.company || "—"}</td>
                <td className="px-3 py-2 border-b border-white/10">
                  {j.created_at ? new Date(j.created_at).toLocaleString() : "—"}
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={7} className="text-center text-gray-400 py-4">
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
