import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import Modal from "../components/Shared/Modal";
import EmptyState from "../components/Shared/EmptyState";

// PUBLIC_INTERFACE
export default function Skills() {
  /** Manage skills with level and years of experience */
  const { skills, upsert, remove, loading } = usePortfolio();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", level: "Intermediate", years: 1 });

  function openNew() {
    setEditing(null);
    setForm({ name: "", level: "Intermediate", years: 1 });
  }

  function openEdit(s) {
    setEditing(s);
    setForm({ name: s.name, level: s.level, years: s.years });
  }

  async function onSave() {
    await upsert("skills", { id: editing?.id, ...form, years: Number(form.years) || 0 });
    setEditing(null);
    setForm({ name: "", level: "Intermediate", years: 1 });
  }

  const showModal = editing !== undefined && (editing !== null || form.name !== "");

  return (
    <div className="card">
      <div className="section-header">
        <div className="section-title">Skills</div>
        <button className="btn-primary btn" onClick={openNew}>+ Add Skill</button>
      </div>

      {loading ? (
        <div className="helper">Loading skills…</div>
      ) : skills.length === 0 ? (
        <EmptyState
          title="No skills yet"
          description="List your core skills with proficiency level."
          action="Add Skill"
          onAction={openNew}
        />
      ) : (
        <div className="list">
          {skills.map((s) => (
            <div className="item" key={s.id}>
              <div>
                <div className="item-title">{s.name}</div>
                <div className="item-sub">{s.level} • {s.years} year{s.years !== 1 ? "s" : ""}</div>
              </div>
              <div className="item-actions">
                <span className="badge">🎯 {s.level}</span>
                <button className="btn" onClick={() => openEdit(s)}>Edit</button>
                <button className="btn" onClick={() => remove("skills", s.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={showModal}
        title={editing ? "Edit Skill" : "New Skill"}
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
            <label>Name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label>Level</label>
            <select className="select" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Years</label>
          <input className="input" type="number" min="0" value={form.years} onChange={(e) => setForm({ ...form, years: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
}
