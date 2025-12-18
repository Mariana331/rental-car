"use client";

import { useState } from "react";
import css from "./FilterBox.module.css";
import DropDown from "../DropDown/DropDown";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/app/services/clientApi";
import { PRICES } from "@/app/constants/Brand";
import { useCarsStore } from "@/app/lib/store/CarsStore";

export default function FiltersCars() {
  const { filters, setFilters } = useCarsStore();

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: Infinity,
  });

  const [selectedBrand, setSelectedBrand] = useState(filters.brand || "");
  const [selectedPrice, setSelectedPrice] = useState(
    filters.rentalPrice !== undefined ? String(filters.rentalPrice) : ""
  );
  const [mileageFrom, setMileageFrom] = useState(
    filters.mileage?.from?.toString() || ""
  );
  const [mileageTo, setMileageTo] = useState(
    filters.mileage?.to?.toString() || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mileageFilter =
      mileageFrom || mileageTo
        ? {
            from: mileageFrom ? Number(mileageFrom) : undefined,
            to: mileageTo ? Number(mileageTo) : undefined,
          }
        : undefined;

    setFilters({
      brand: selectedBrand || undefined,
      rentalPrice: selectedPrice ? Number(selectedPrice) : undefined,
      mileage: mileageFilter,
    });
  };

  return (
    <form className={css.filterBox} onSubmit={handleSubmit}>
      <div className={css.forms}>
        <div className={css.formOne}>
          <DropDown
            label="Car brand"
            placeholder="Choose a brand"
            options={brands}
            value={selectedBrand}
            onChange={setSelectedBrand}
          />
          <DropDown
            label="Price / 1 hour"
            placeholder="Choose price"
            options={PRICES.map((p) => `${p}`)}
            value={selectedPrice}
            onChange={setSelectedPrice}
          />
        </div>

        <div className={css.formThree}>
          <label className={css.oneBrand}>Car mileage/km</label>
          <div className={css.mileageInputs}>
            <input
              type="number"
              placeholder="From"
              value={mileageFrom}
              onChange={(e) => setMileageFrom(e.target.value)}
              className={css.input}
            />
            <input
              type="number"
              placeholder="To"
              value={mileageTo}
              onChange={(e) => setMileageTo(e.target.value)}
              className={css.input}
            />
          </div>
        </div>

        <button type="submit" className={css.clearBtn}>
          Search
        </button>
      </div>
    </form>
  );
}
