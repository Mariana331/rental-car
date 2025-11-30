import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Car } from "@/app/types/car";

interface Filters {
  brand?: string;
  rentalPrice?: string;
  mileage?: {
    from?: number;
    to?: number;
  };
}

interface CarsStore {
  cars: Car[];
  setCars: (cars: Car[]) => void;
  addCars: (cars: Car[]) => void;
  clearCars: () => void;

  favorites: string[];
  toggleFavorite: (id: string) => void;

  filters: Filters;
  setFilters: (filters: Filters) => void;
  clearFilters: () => void;

  selectedCars: Car[];
  addSelectedCar: (car: Car) => void;
  clearSelectedCars: () => void;

  page: number;
  setPage: (page: number) => void;

  resetPage: () => void;
}

export const useCarsStore = create<CarsStore>()(
  persist(
    (set) => ({
      cars: [],
      setCars: (cars) => set({ cars }),

      addCars: (cars) =>
        set((state) => ({
          cars: [...state.cars, ...cars],
        })),

      clearCars: () => set({ cars: [] }),

      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),

      filters: {},
      setFilters: (newFilters) =>
        set((state) => ({
          filters: {
            ...state.filters,
            ...newFilters,
            mileage: {
              ...state.filters.mileage,
              ...newFilters.mileage,
            },
          },
          cars: [],
          page: 1,
        })),

      clearFilters: () =>
        set(() => ({
          filters: {},
          cars: [],
          page: 1,
        })),

      selectedCars: [],
      addSelectedCar: (car) =>
        set((state) => ({
          selectedCars: [...state.selectedCars, car],
        })),
      clearSelectedCars: () => set({ selectedCars: [] }),

      page: 1,
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
