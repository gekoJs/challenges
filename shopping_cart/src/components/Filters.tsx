import { useId, useState } from "react";
import "./Filters.css";
import { useFilters } from "../hooks/useFilters";

const Filters = () => {
  const minPriceFilterId = useId();
  const minCategoryFilterId = useId(); //genera un id unico, funciona hasta para server side rendering

  const { setFilters, filters } = useFilters();

  function handleChangeMinPrice(e: React.ChangeEvent<HTMLInputElement>) {
    setFilters((prev) => ({
      ...prev,
      minPrice: parseInt(e.target.value),
    }));
  }

  function handleChangeCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilters((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  }
  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Price</label>
        <input
          type="range"
          id={minPriceFilterId}
          value={filters.minPrice}
          min={0}
          max={1500}
          onChange={handleChangeMinPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={minCategoryFilterId}>Category</label>
        <select id={minCategoryFilterId} onChange={handleChangeCategory}>
          <option value="all">All</option>
          <option value="laptops">Laptops</option>
          <option value="smartphones">smartphones</option>
        </select>
      </div>
    </section>
  );
};

export default Filters;
