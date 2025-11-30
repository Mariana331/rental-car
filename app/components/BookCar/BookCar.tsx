"use client";

import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import css from "@/app/components/BookCar/BookCar.module.css";
import { Car } from "@/app/types/car";
import Image from "next/image";
import cssMain from "@/app/page.module.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export interface BookCarProps {
  car: Car;
}

const BookCar = ({ car }: BookCarProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: null as Date | null,
    comment: "",
  });

  const dateRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!dateRef.current) return;

    flatpickr(dateRef.current, {
      dateFormat: "F j, Y",
      minDate: "today",
      onChange: (selectedDates) => {
        setForm((prev) => ({
          ...prev,
          date: selectedDates[0],
        }));
      },
    });
  }, []);
  return (
    <div className={cssMain.container}>
      <div className={css.wrapper}>
        <div className={css.wrapperLeft}>
          <div className={css.image}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              width={640}
              height={512}
              className={css.carImage}
              priority
            />
          </div>

          {/* BOOK FORM */}
          <div className={css.bookInfo}>
            <h3 className={css.title}>Book your car now</h3>
            <p className={css.text}>
              Stay connected! We are always ready to help you.
            </p>

            <form className={css.bookForm}>
              <input
                className={css.input}
                type="text"
                name="name"
                placeholder="Name*"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className={css.input}
                type="email"
                name="email"
                placeholder="Email*"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <div className={css.date}>
                <input
                  ref={dateRef}
                  className={css.input}
                  placeholder="Booking date"
                  value={form.date ? format(form.date, "MMMM d, yyyy") : ""}
                  readOnly
                />
              </div>

              <textarea
                className={css.field}
                name="comment"
                placeholder="Comment"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                rows={3}
              />

              <button className={css.btn}>Send</button>
            </form>
          </div>
        </div>

        <div className={css.wrapperRight}>
          {/* CAR DETAILS */}
          <div className={css.detail}>
            <div className={css.details}>
              <h2 className={css.detailsTitle}>
                {car.brand} {car.model}, {car.year}
                <span className={css.text}> id: {car.id.slice(-4)}</span>
              </h2>
            </div>

            <div className={css.location}>
              <div className={css.locationInfo}>
                <svg className={css.location_icon} width={16} height={16}>
                  <use href="/sprite.svg#icon-Location" />
                </svg>

                <p className={css.infoText}>
                  {[...car.address.split(", ").slice(-2)].join(", ")}
                  <span className={css.locationSpan}>
                    Mileage:{" "}
                    {car.mileage.toString().replace(/^(\d)(?=\d)/, "$1 ")} km
                  </span>
                </p>
              </div>

              <p className={css.locationInfoPrice}>${car.rentalPrice}</p>
            </div>

            <p className={css.infoText}>{car.description}</p>
          </div>

          {/* RENTAL CONDITIONS */}
          <div className={css.carInfo}>
            {car.rentalConditions?.length > 0 && (
              <div className={css.rental}>
                <h2 className={css.rentalTitle}>Rental Conditions:</h2>
                <ul className={css.rentalList}>
                  {car.rentalConditions.map((cond, idx) => (
                    <li key={idx} className={css.rentalItem}>
                      <svg width={16} height={16}>
                        <use href="/sprite.svg#icon-check-circle" />
                      </svg>
                      <span className={css.infoText}>{cond}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SPECIFICATIONS */}
            <div className={css.specifications}>
              <h2 className={css.specificationsTitle}>Car Specifications:</h2>
              <ul className={css.specificationsList}>
                <li className={css.specificationsItem}>
                  <svg width={16} height={16}>
                    <use href="/sprite.svg#icon-calendar" />
                  </svg>
                  <p className={css.infoText}>Year: {car.year}</p>
                </li>

                <li className={css.specificationsItem}>
                  <svg width={16} height={16}>
                    <use href="/sprite.svg#icon-car" />
                  </svg>
                  <p className={css.infoText}>Type: {car.type}</p>
                </li>

                <li className={css.specificationsItem}>
                  <svg width={16} height={16}>
                    <use href="/sprite.svg#icon-fuel-pump" />
                  </svg>
                  <p className={css.infoText}>
                    Fuel Consumption: {car.fuelConsumption}
                  </p>
                </li>

                <li className={css.specificationsItem}>
                  <svg width={16} height={16}>
                    <use href="/sprite.svg#icon-gear" />
                  </svg>
                  <p className={css.infoText}>Engine Size: {car.engineSize}</p>
                </li>
              </ul>
            </div>

            {/* ACCESSORIES */}
            {(car.accessories?.length > 0 ||
              car.functionalities?.length > 0) && (
              <div className={css.functional}>
                <h2 className={css.functionalTitle}>
                  Accessories & Functionalities:
                </h2>

                <ul className={css.accessoriesList}>
                  {car.accessories?.map((access, idx) => (
                    <li key={idx} className={css.accessoriesItem}>
                      <svg width={16} height={16}>
                        <use href="/sprite.svg#icon-check-circle" />
                      </svg>
                      <span className={css.infoText}>{access}</span>
                    </li>
                  ))}
                </ul>

                <ul className={css.functionList}>
                  {car.functionalities?.map((fun, idx) => (
                    <li key={idx} className={css.accessoriesItem}>
                      <svg width={16} height={16}>
                        <use href="/sprite.svg#icon-check-circle" />
                      </svg>
                      <span className={css.infoText}>{fun}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCar;
