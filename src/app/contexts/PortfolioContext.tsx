import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PortfolioData, getPortfolioData, savePortfolioData } from "../data/portfolioData";

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  refreshData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(getPortfolioData());

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    savePortfolioData(newData);
  };

  const refreshData = () => {
    setData(getPortfolioData());
  };

  useEffect(() => {
    // Listen for storage changes from admin panel
    const handleStorageChange = () => {
      refreshData();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("portfolioDataUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("portfolioDataUpdated", handleStorageChange);
    };
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, updateData, refreshData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
