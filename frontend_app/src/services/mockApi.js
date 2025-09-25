const storageKey = "apm-data";

// seed data
const defaultData = {
  projects: [
    { id: "p1", title: "Oceanic Dashboard", description: "Admin dashboard with Ocean theme.", tags: ["React", "Design"], link: "https://example.com" },
    { id: "p2", title: "Portfolio v2", description: "New modern portfolio site.", tags: ["React", "CSS"], link: "" }
  ],
  skills: [
    { id: "s1", name: "React", level: "Advanced", years: 4 },
    { id: "s2", name: "CSS", level: "Advanced", years: 5 }
  ],
  experience: [
    { id: "e1", role: "Senior Frontend Engineer", company: "BlueWave", period: "2020 - Present", summary: "Led UI modernization." }
  ],
  achievements: [
    { id: "a1", title: "Speaker @ JSConf", year: 2023, details: "Modern patterns for state in React." }
  ]
};

function readDb() {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : defaultData;
  } catch {
    return defaultData;
  }
}

function writeDb(db) {
  localStorage.setItem(storageKey, JSON.stringify(db));
}

function randomId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

// PUBLIC_INTERFACE
export const api = {
  /** Fetch all dataset */
  async getAll() {
    return new Promise((res) => setTimeout(() => res(readDb()), 150));
  },
  /** Upsert entity by type */
  async upsert(type, entity) {
    const db = readDb();
    const list = db[type] || [];
    let updated;
    if (!entity.id) {
      const id = randomId(type[0]);
      updated = { ...entity, id };
      db[type] = [updated, ...list];
    } else {
      updated = entity;
      db[type] = list.map((it) => (it.id === entity.id ? updated : it));
    }
    writeDb(db);
    return new Promise((res) => setTimeout(() => res(updated), 150));
  },
  /** Delete entity */
  async remove(type, id) {
    const db = readDb();
    db[type] = (db[type] || []).filter((x) => x.id !== id);
    writeDb(db);
    return new Promise((res) => setTimeout(() => res(true), 100));
  }
};
