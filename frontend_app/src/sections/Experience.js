import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import Modal from "../components/Shared/Modal";
import EmptyState from "../components/Shared/EmptyState";

// PUBLIC_INTERFACE
export default function Experience() {
  /** Manage work experiences */
  const { experience, upsert, remove, loading } = usePortfolio();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ role: "", company: "", period: "", summary: "" });

  function openNew() {
    setEditing(null);
    setForm({ role: "", company: "", period: "", summary: "" });
  }

  function openEdit(e) {
    setEditing(e);
    setForm({ role: e.role, company: e.company, period: e.period, summary: e.summary });
  }

  async function onSave() {
    await upsert("experience", { id: editing?.id, ...form });
    setEditing(null);
    setForm({ role: "", company: "", period: "", summary: "" });
  }

  const showModal = editing !== undefined && (editing !== null || form.role !== "");

  return (
    <div className="card">
      <div className="section-header">
        <div className="section-title">Experience</div>
        <button className="btn-primary btn" onClick={openNew}>+ Add Experience</button>
      </div>

      {loading ? (
        <div className="helper">Loading experience…</div>
      ) : experience.length === 0 ? (
        <EmptyState
          title="No experience yet"
          description="Add your professional experience entries."
          action="Add Experience"
          onAction={openNew}
        />
      ) : (
        <div className="list">
          {experience.map((e) => (
            <div className="item" key={e.id}>
              <div>
                <div className="item-title">{e.role} • {e.company}</div>
                <div className="item-sub">{e.period}</div>
                <div className="helper" style={{ marginTop: 6 }}>{e.summary}</div>
              </div>
              <div className="item-actions">
                <button className="btn" onClick={() => openEdit(e)}>Edit</button>
                <button className="btn" onClick={() => remove("experience", e.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={showModal}
        title={editing ? "Edit Experience" : "New Experience"}
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
            <label>Role</label>
            <input className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </div>
          <div>
            <label>Company</label>
            <input className="input" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>
        </div>
        <div className="grid-2" style={{ marginTop: 10 }}>
          <div>
            <label>Period</label>
            <input className="input" placeholder="2019 - 2023" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} />
          </div>
          <div>
            <label>Summary</label>
            <input className="input" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
