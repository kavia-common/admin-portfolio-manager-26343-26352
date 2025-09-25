import React from "react";

// PUBLIC_INTERFACE
export default function Sidebar({ current, onNavigate }) {
  /** Sidebar navigation for main sections */
  const items = [
    { key: "projects", label: "Projects", icon: "📁" },
    { key: "skills", label: "Skills", icon: "🧠" },
    { key: "experience", label: "Experience", icon: "💼" },
    { key: "achievements", label: "Achievements", icon: "🏆" }
  ];

  return (
    <aside className="sidebar">
      <div className="brand" aria-label="Brand">
        <div className="brand-logo" />
        <div className="brand-name">Admin Portfolio</div>
      </div>
      <nav className="nav-group" aria-label="Primary">
        {items.map((it) => (
          <button
            key={it.key}
            className={`nav-item ${current === it.key ? "active" : ""}`}
            onClick={() => onNavigate(it.key)}
            aria-current={current === it.key ? "page" : undefined}
          >
            <span style={{ fontSize: 18 }}>{it.icon}</span>
            <span>{it.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
