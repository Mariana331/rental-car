"use client";

import css from "./FilterBox.module.css";
import { ChangeEvent } from "react";
import { useCarsStore } from "@/app/lib/store/CarsStore";
import { CAR_BRANDS, PRICES } from "@/app/constants/Brand";
import DropDown from "../DropDown/DropDown";

const FilterBox = () => {
  const { filters, setFilters } = useCarsStore();

  const handleMileage = (
    e: ChangeEvent<HTMLInputElement>,
    key: "from" | "to"
  ) => {
    setFilters({
      ...filters,
      mileage: {
        ...filters.mileage,
        [key]: Number(e.target.value),
      },
    });
  };

  return (
    <div className={css.filterBox}>
      <div className={css.forms}>
        <div className={css.formOne}>
          <DropDown
            label="Car brand"
            placeholder="Choose a brand"
            options={CAR_BRANDS}
            value={filters.brand || ""}
            onChange={(brand) =>
              setFilters({
                ...filters,
                brand,
              })
            }
          />

          <DropDown
            label="Price / 1 hour"
            placeholder="Choose a price"
            options={PRICES.map((p) => `$${p}`)}
            value={filters.rentalPrice || ""}
            onChange={(price) =>
              setFilters({
                ...filters,
                rentalPrice: price.replace("$", ""),
              })
            }
          />
        </div>

        <div className={css.formThree}>
          <label className={css.oneBrand}>Car mileage/km</label>
          <div className={css.mileageInputs}>
            <input
              className={css.input}
              type="number"
              placeholder="From"
              value={filters.mileage?.from || ""}
              onChange={(e) => handleMileage(e, "from")}
            />

            <input
              className={css.input}
              type="number"
              placeholder="To"
              value={filters.mileage?.to || ""}
              onChange={(e) => handleMileage(e, "to")}
            />
          </div>
        </div>
        <button className={css.clearBtn}>Search</button>
      </div>
    </div>
  );
};

export default FilterBox;
