export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB",
    secondary: "#F59E0B",
    success: "#F59E0B",
    error: "#EF4444",
    gradientFrom: "rgba(59,130,246,0.1)",
    gradientTo: "#f9fafb",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    overlay: "rgba(17,24,39,0.5)"
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px"
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 12px rgba(0,0,0,0.08)",
    lg: "0 10px 25px rgba(0,0,0,0.12)"
  },
  transition: "all .2s ease"
};

// PUBLIC_INTERFACE
export function applyTheme(root = document.documentElement) {
  /** Apply CSS variables to document root for theming */
  const c = theme.colors;
  const r = theme.radius;
  root.style.setProperty("--oc-primary", c.primary);
  root.style.setProperty("--oc-secondary", c.secondary);
  root.style.setProperty("--oc-success", c.success);
  root.style.setProperty("--oc-error", c.error);
  root.style.setProperty("--oc-gradient-from", c.gradientFrom);
  root.style.setProperty("--oc-gradient-to", c.gradientTo);
  root.style.setProperty("--oc-bg", c.background);
  root.style.setProperty("--oc-surface", c.surface);
  root.style.setProperty("--oc-text", c.text);
  root.style.setProperty("--oc-text-muted", c.textMuted);
  root.style.setProperty("--oc-border", c.border);
  root.style.setProperty("--oc-overlay", c.overlay);
  root.style.setProperty("--oc-radius-sm", r.sm);
  root.style.setProperty("--oc-radius-md", r.md);
  root.style.setProperty("--oc-radius-lg", r.lg);
  root.style.setProperty("--oc-radius-xl", r.xl);
  root.style.setProperty("--oc-shadow-sm", theme.shadow.sm);
  root.style.setProperty("--oc-shadow-md", theme.shadow.md);
  root.style.setProperty("--oc-shadow-lg", theme.shadow.lg);
  root.style.setProperty("--oc-transition", theme.transition);
}
