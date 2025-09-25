import React from "react";

// PUBLIC_INTERFACE
export default function EmptyState({ title, description, action, onAction }) {
  /** Simple empty state card to encourage first action */
  return (
    <div className="card" style={{ textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 48, marginBottom: 8 }}>🌊</div>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{title}</div>
      <div className="helper" style={{ marginBottom: 12 }}>{description}</div>
      {action && (
        <button className="btn-primary btn" onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  );
}
