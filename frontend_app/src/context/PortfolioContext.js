import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/mockApi";

const PortfolioContext = createContext(null);

// PUBLIC_INTERFACE
export function usePortfolio() {
  /** Hook to access portfolio dataset and CRUD actions */
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
}

// PUBLIC_INTERFACE
export function PortfolioProvider({ children }) {
  /** Context Provider that loads and manages portfolio state */
  const [data, setData] = useState({ projects: [], skills: [], experience: [], achievements: [] });
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    const next = await api.getAll();
    setData(next);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  const upsert = async (type, payload) => {
    const saved = await api.upsert(type, payload);
    setData((prev) => {
      const list = prev[type] || [];
      const hasId = payload.id;
      return {
        ...prev,
        [type]: hasId ? list.map((x) => (x.id === saved.id ? saved : x)) : [saved, ...list]
      };
    });
    return saved;
  };

  const remove = async (type, id) => {
    await api.remove(type, id);
    setData((prev) => ({
      ...prev,
      [type]: (prev[type] || []).filter((x) => x.id !== id)
    }));
  };

  const value = { ...data, loading, refresh, upsert, remove };
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}
