import React, { useEffect, useState } from "react";
import "./styles.css";
import { PortfolioProvider } from "./context/PortfolioContext";
import Sidebar from "./components/Layout/Sidebar";
import Topbar from "./components/Layout/Topbar";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Achievements from "./sections/Achievements";
import { applyTheme } from "./theme";

// PUBLIC_INTERFACE
function App() {
  /** App shell with sidebar, topbar and content sections */
  const [section, setSection] = useState("projects");
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  useEffect(() => {
    applyTheme();
  }, []);

  const sectionTitle = {
    projects: "Projects",
    skills: "Skills",
    experience: "Experience",
    achievements: "Achievements"
  }[section];

  return (
    <PortfolioProvider>
      <div className="app-shell">
        <Sidebar current={section} onNavigate={setSection} />
        <Topbar
          title={sectionTitle}
          onAdd={() => setShowQuickAdd(true)}
          addLabel={`Add ${sectionTitle?.slice(0, -1) || "Entry"}`}
        />
        <main className="content" role="main">
          {section === "projects" && <Projects />}
          {section === "skills" && <Skills />}
          {section === "experience" && <Experience />}
          {section === "achievements" && <Achievements />}

          <div style={{ marginTop: 16 }}>
            <div className="helper">
              REST API integration ready: swap mockApi with real endpoints inside services layer.
            </div>
          </div>
        </main>
      </div>
    </PortfolioProvider>
  );
}

export default App;
