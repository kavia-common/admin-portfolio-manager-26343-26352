import React, { useMemo, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import Modal from "../components/Shared/Modal";
import EmptyState from "../components/Shared/EmptyState";

// PUBLIC_INTERFACE
export default function Projects() {
  /** Manage project entries with create/edit/delete */
  const { projects, upsert, remove, loading } = usePortfolio();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }, [projects, query]);

  const [form, setForm] = useState({ title: "", description: "", tags: "", link: "" });

  function openNew() {
    setEditing(null);
    setForm({ title: "", description: "", tags: "", link: "" });
  }

  function openEdit(p) {
    setEditing(p);
    setForm({ title: p.title, description: p.description, tags: (p.tags || []).join(", "), link: p.link || "" });
  }

  async function onSave() {
    const payload = {
      id: editing?.id,
      title: form.title.trim(),
      description: form.description.trim(),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      link: form.link.trim()
    };
    await upsert("projects", payload);
    setEditing(null);
    setForm({ title: "", description: "", tags: "", link: "" });
  }

  const showModal = editing !== undefined && (editing !== null || form.title !== "" || form.description !== "" || form.tags !== "" || form.link !== "");

  return (
    <div className="card">
      <div className="section-header">
        <div className="section-title">Projects</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="input"
            placeholder="Search projects…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: 220 }}
          />
          <button className="btn-primary btn" onClick={openNew}>+ Add Project</button>
        </div>
      </div>

      {loading ? (
        <div className="helper">Loading projects…</div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Get started by creating your first project."
          action="Add Project"
          onAction={openNew}
        />
      ) : (
        <div className="list">
          {filtered.map((p) => (
            <div className="item" key={p.id}>
              <div>
                <div className="item-title">{p.title}</div>
                <div className="item-sub">{p.description}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                  {(p.tags || []).map((t, i) => (
                    <span key={i} className="badge"># {t}</span>
                  ))}
                  {p.link && <a className="badge" href={p.link} target="_blank" rel="noreferrer">🔗 Link</a>}
                </div>
              </div>
              <div className="item-actions">
                <button className="btn" onClick={() => openEdit(p)}>Edit</button>
                <button className="btn" onClick={() => remove("projects", p.id)} aria-label={`Delete ${p.title}`}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={showModal}
        title={editing ? "Edit Project" : "New Project"}
        onClose={() => setEditing(null)}
        footer={
          <>
            <button className="btn" onClick={() => setEditing(null)}>Cancel</button>
            <button className="btn-amber btn" onClick={onSave}>Save</button>
          </>
        }
      >
        <div className="grid-2">
          <div>
            <label>Title</label>
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label>Link (optional)</label>
            <input className="input" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://…" />
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Description</label>
          <textarea className="textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Tags</label>
          <input className="input" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="react, css, ui" />
          <div className="helper">Separate tags by comma.</div>
        </div>
      </Modal>
    </div>
  );
}
