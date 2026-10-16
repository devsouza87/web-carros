import { MdSpeed } from "react-icons/md";
import type { CardProps } from "../types/Card";
import { CiCalendar } from "react-icons/ci";
import { useState } from "react";

export const Card = (car: CardProps) => {
  const [loadImages, setLoadImages] = useState<string[]>([]);

  function handleImageLoad(id: string) {
    setLoadImages((prev) => [...prev, id]);
  }

  return (
    <section key={car.id} className="w-full bg-white rounded-lg">
      <div
        className="w-full rounded-lg mb-2 h-72 bg-slate-200"
        style={{ display: loadImages.includes(car.id) ? "none" : "block" }}
      ></div>
      <img
        className="w-full rounded-lg mb-2 max-h-72"
        src={car.images[0].url}
        alt={`${car.make} ${car.model}`}
        onLoad={() => handleImageLoad(car.id)}
        style={{ display: loadImages.includes(car.id) ? "block" : "none" }}
      />

      <h1 className="font-bold mt-2 px-2">
        {car.make} {car.model}
      </h1>
      <p className="text-sm px-2 mb-2">{car.description}</p>
      <div className="flex items-center gap-4 px-2 mb-4">
        <span className="text-zinc-700 flex items-center gap-1">
          <CiCalendar /> {car.year}
        </span>
        <span className="text-zinc-700 flex items-center gap-1">
          <MdSpeed /> {car.km} km
        </span>
      </div>

      <strong className="text-black font-medium text-xl px-2">
        R$ {car.price}
      </strong>

      <div className="w-full h-px bg-slate-200 my-2"></div>

      <div className="px-2 pb-2">
        <span className="text-zinc-700">
          {car.city} - {car.state}{" "}
        </span>
      </div>
    </section>
  );
};
