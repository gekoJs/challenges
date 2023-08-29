import { useContext } from "react";
import { FiltersContext } from "../context/filters";
import { ProductsEntity } from "../types";

export function useFilters() {

    const {filters, setFilters} = useContext(FiltersContext)
  
    function filterProducts(products: ProductsEntity[]) {
      return products.filter((product) => {
        return (
          product.price >= filters.minPrice &&
          (filters.category === "all" || product.category === filters.category)
        );
      });
    }
  
    return { filterProducts, setFilters, filters };
  }