"use client";

import css from "@/app/catalog/Catalog.module.css";
import { useState, useEffect } from "react";
import CarList from "../components/CarList/CarList";
import { getCars } from "../services/clientApi";
import { FetchCarsParams, Car } from "../types/car";
import { useCarsStore } from "@/app/lib/store/CarsStore";

export default function CatalogClient({ initialCars }: { initialCars: Car[] }) {
  const { filters, page, setPage } = useCarsStore();

  const [cars, setCars] = useState<Car[]>(initialCars);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchFilteredCars = async () => {
      setLoading(true);

      const params: FetchCarsParams = {
        limit: "12",
        page: "1",
        brand: filters.brand,
      };

      const res = await getCars(params);

      setCars(res.cars);
      setPage(1);
      setHasMore(true);
      setLoading(false);
    };

    fetchFilteredCars();
  }, [filters, setPage]);

  const loadMore = async () => {
    setLoading(true);

    const nextPage = page + 1;

    const params: FetchCarsParams = {
      limit: "12",
      page: String(nextPage),
      brand: filters.brand,
    };

    const res = await getCars(params);

    setCars((prev) => [...prev, ...res.cars]);
    setPage(nextPage);

    if (res.cars.length < 12) {
      setHasMore(false);
    }

    setLoading(false);
  };
  return (
    <div>
      <CarList cars={cars} />

      {hasMore && (
        <button
          className={css.btnLoadMore}
          onClick={loadMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
