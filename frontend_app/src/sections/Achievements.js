import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import Modal from "../components/Shared/Modal";
import EmptyState from "../components/Shared/EmptyState";

// PUBLIC_INTERFACE
export default function Achievements() {
  /** Manage achievements and awards */
  const { achievements, upsert, remove, loading } = usePortfolio();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", year: new Date().getFullYear(), details: "" });

  function openNew() {
    setEditing(null);
    setForm({ title: "", year: new Date().getFullYear(), details: "" });
  }

  function openEdit(a) {
    setEditing(a);
    setForm({ title: a.title, year: a.year, details: a.details });
  }

  async function onSave() {
    await upsert("achievements", { id: editing?.id, ...form, year: Number(form.year) || new Date().getFullYear() });
    setEditing(null);
    setForm({ title: "", year: new Date().getFullYear(), details: "" });
  }

  const showModal = editing !== undefined && (editing !== null || form.title !== "");

  return (
    <div className="card">
      <div className="section-header">
        <div className="section-title">Achievements</div>
        <button className="btn-primary btn" onClick={openNew}>+ Add Achievement</button>
      </div>

      {loading ? (
        <div className="helper">Loading achievements…</div>
      ) : achievements.length === 0 ? (
        <EmptyState
          title="No achievements yet"
          description="Capture your recognitions, awards, and milestones."
          action="Add Achievement"
          onAction={openNew}
        />
      ) : (
        <div className="list">
          {achievements.map((a) => (
            <div className="item" key={a.id}>
              <div>
                <div className="item-title">{a.title} • {a.year}</div>
                <div className="helper" style={{ marginTop: 6 }}>{a.details}</div>
              </div>
              <div className="item-actions">
                <button className="btn" onClick={() => openEdit(a)}>Edit</button>
                <button className="btn" onClick={() => remove("achievements", a.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={showModal}
        title={editing ? "Edit Achievement" : "New Achievement"}
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
            <label>Year</label>
            <input className="input" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Details</label>
          <textarea className="textarea" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
}
