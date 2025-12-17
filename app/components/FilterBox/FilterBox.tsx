"use client";

import { useState, useEffect } from "react";
import css from "./FilterBox.module.css";
import DropDown from "../DropDown/DropDown";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/app/services/clientApi";
import { PRICES } from "@/app/constants/Brand";
import { useCarsStore } from "@/app/lib/store/CarsStore";

export default function FiltersCars() {
  const { filters, setFilters, setPage } = useCarsStore();

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: Infinity,
  });

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  useEffect(() => {
    setSelectedBrand(filters.brand || "");
    setSelectedPrice(filters.rentalPrice || "");
    setMileageFrom(filters.mileage?.from?.toString() || "");
    setMileageTo(filters.mileage?.to?.toString() || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({
      brand: selectedBrand || undefined,
      rentalPrice: selectedPrice || undefined,
      mileage: {
        from: mileageFrom ? Number(mileageFrom) : undefined,
        to: mileageTo ? Number(mileageTo) : undefined,
      },
    });

    setPage(1);
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
