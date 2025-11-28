import { api } from "./api";
import { Car, CarsResponse, FetchCarsParams } from "../types/car";

export const getCars = async ({
  brand,
  rentalPrice,
  minMileage,
  maxMileage,
  limit,
  page,
}: FetchCarsParams): Promise<CarsResponse> => {
  const response = await api.get<CarsResponse>("/cars", {
    params: {
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
      limit,
      page,
    },
  });
  return response.data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const response = await api.get<Car>(`/cars/${id}`);
  return response.data;
};

export const getBrands = async (): Promise<string[]> => {
  const response = await api.get<string[]>("/brands");
  return response.data;
};
