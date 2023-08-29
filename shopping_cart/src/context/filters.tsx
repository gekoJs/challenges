import { createContext, useState } from "react";

// This is the one we have to consume //CREATE
interface context {
  filters: { category: string; minPrice: number };
  setFilters: React.Dispatch<
    React.SetStateAction<{ category: string; minPrice: number }>
  >;
}

export const FiltersContext = createContext<context>({
  filters: {
    category: "",
    minPrice: 0,
  },
  setFilters: () => {},
});

// This is the one that provides us with access to the context //PROVIDE
export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 250,
  });
  
  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

//THEN CONSUME
