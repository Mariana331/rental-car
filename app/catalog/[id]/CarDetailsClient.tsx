"use client";

import { useQuery } from "@tanstack/react-query";
import { getCarById } from "@/app/services/serverApi";
import BookCar from "@/app/components/BookCar/BookCar";
import { useParams } from "next/navigation";

const CarDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !car) return <p>Something went wrong.</p>;

  return <BookCar car={car} />;
};

export default CarDetailsClient;
