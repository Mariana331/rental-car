import FilterBox from "../components/FilterBox/FilterBox";
import { getCars } from "../services/serverApi";
import { FetchCarsParams } from "../types/car";
import CatalogClient from "./CatalogClient";

const Catalog = async () => {
  const params: FetchCarsParams = {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
    limit: "12",
    page: "1",
  };

  const response = await getCars(params);
  const cars = response.cars;
  return (
    <div>
      <FilterBox />
      <CatalogClient initialCars={cars} />
    </div>
  );
};

export default Catalog;
