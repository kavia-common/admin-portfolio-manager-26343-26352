import React from "react";

// PUBLIC_INTERFACE
export default function Topbar({ title, onAdd, addLabel = "Add Entry" }) {
  /** Top navigation bar with title and primary action */
  return (
    <header className="topbar" role="banner">
      <div className="topbar-title">{title}</div>
      <div className="topbar-actions">
        <button className="btn" title="Search">🔍</button>
        <button className="btn" title="Notifications">🔔</button>
        <button className="btn-primary btn" onClick={onAdd}>
          + {addLabel}
        </button>
      </div>
    </header>
  );
}
