import FilterBox from "../components/FilterBox/FilterBox";
import CarList from "../components/CarList/CarList";
import { getCars } from "../services/serverApi";
import { FetchCarsParams } from "../types/car";

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
      <CarList cars={cars} />
    </div>
  );
};

export default Catalog;
