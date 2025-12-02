"use client";

import Link from "next/link";
import Image from "next/image";
import { Car } from "@/app/types/car";
import { useCarsStore } from "@/app/lib/store/CarsStore";
import css from "@/app/components/CarList/CarList.module.css";
import cssMain from "@/app/page.module.css";

export interface CarListProps {
  cars: Car[];
}

const CarList = ({ cars }: CarListProps) => {
  const { favorites, toggleFavorite } = useCarsStore();

  return (
    <div className={cssMain.container}>
      <ul className={css.list}>
        {cars.map((car) => (
          <li key={car.id} className={css.listItem}>
            <div className={css.boxCar}>
              <Image
                className={css.image}
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                width={276}
                height={268}
              />
              <button
                className={css.button}
                onClick={() => toggleFavorite(car.id)}
              >
                {favorites.includes(car.id) ? (
                  <svg className={css.button_icon_blue} width={20} height={20}>
                    <use href="/sprite.svg#icon-blue"></use>
                  </svg>
                ) : (
                  <svg className={css.button_icon} width={20} height={20}>
                    <use href="/sprite.svg#icon-favor"></use>
                  </svg>
                )}
              </button>
            </div>

            <div className={css.info}>
              <h2 className={css.title}>
                {car.brand} <span className={css.blue_text}>{car.model}</span>,{" "}
                {car.year}
              </h2>
              <p className={css.price}>${car.rentalPrice}</p>
            </div>
            <div className={css.address}>
              {[...car.address.split(", ").slice(-2), car.rentalCompany].join(
                " | "
              ) + " |"}
            </div>
            <div className={css.mileage}>
              {car.type} |{" "}
              {car.mileage.toString().replace(/^(\d)(?=\d)/, "$1 ")} km
            </div>
            <Link className={css.link_button} href={`/catalog/${car.id}`}>
              Read more
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
