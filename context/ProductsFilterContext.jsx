import { createContext, useState } from "react";

export const ProductsFilterContext = createContext();

export function ProductsFilterProvider({ children }) {
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    sort: "",
  });

  const resetFilters = () => {
    setFilters({
      category: "",
      search: "",
      sort: "",
    });
  };

  return (
    <ProductsFilterContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </ProductsFilterContext.Provider>
  );
}
