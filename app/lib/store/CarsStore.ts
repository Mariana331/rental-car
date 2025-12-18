import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Car } from "@/app/types/car";

interface Filters {
  brand?: string;
  rentalPrice?: number;
  mileage?: {
    from?: number;
    to?: number;
  };
}

interface CarsStore {
  cars: Car[];
  favorites: string[];
  filters: Filters;
  page: number;

  setCars: (cars: Car[]) => void;
  addCars: (cars: Car[]) => void;
  clearCars: () => void;

  toggleFavorite: (id: string) => void;

  setFilters: (filters: Filters) => void;
  clearFilters: () => void;

  setPage: (page: number) => void;
  resetPage: () => void;
}

export const useCarsStore = create<CarsStore>()(
  persist(
    (set) => ({
      cars: [],
      favorites: [],
      filters: {},
      page: 1,

      // ---------- cars ----------
      setCars: (cars) => set({ cars }),

      addCars: (cars) =>
        set((state) => ({
          cars: [...state.cars, ...cars],
        })),

      clearCars: () => set({ cars: [] }),

      // ---------- favorites ----------
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),

      // ---------- filters ----------
      setFilters: (filters) =>
        set(() => ({
          filters,
          page: 1,
          cars: [],
        })),

      clearFilters: () =>
        set(() => ({
          filters: {},
          page: 1,
          cars: [],
        })),

      // ---------- pagination ----------
      setPage: (page) => set({ page }),
      resetPage: () => set({ page: 1 }),
    }),
    {
      name: "cars-store",
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
);
