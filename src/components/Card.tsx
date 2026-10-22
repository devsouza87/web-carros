import { MdSpeed } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import type { CardProps } from "../types/Car";
import { useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import { formatKm } from "../utils/formatKm";

export const Card = (car: CardProps) => {
  const [loadImages, setLoadImages] = useState<string[]>([]);

  function handleImageLoad(id: string) {
    setLoadImages((prev) => [...prev, id]);
  }

  return (
    <section key={car.id} className="w-full bg-white rounded-lg relative">
      {car.isDashboard && (
        <div className="absolute flex gap-1 right-4 top-4">
          <button
            className="bg-slate-600 p-1 rounded-full cursor-pointer"
            onClick={car.onDelete}
          >
            <FiTrash2 size={20} color="#fff" />
          </button>
          <div className="bg-slate-500 p-1 rounded-full">
            <FiEdit size={20} color="#fff" />
          </div>
        </div>
      )}

      <div
        className="w-full rounded-lg mb-2 h-72 bg-slate-200"
        style={{ display: loadImages.includes(car.id) ? "none" : "block" }}
      ></div>

      <img
        className="w-full rounded-lg mb-2 max-h-72"
        src={
          typeof car.images[0] === "object" && car.images[0] !== null
            ? (car.images[0] as any).url
            : ""
        }
        alt={`${car.name}`}
        onLoad={() => handleImageLoad(car.id)}
        style={{ display: loadImages.includes(car.id) ? "block" : "none" }}
      />

      <h1 className="font-bold mt-2 px-2">{car.name}</h1>
      <p className="text-sm px-2 mb-2">{car.version}</p>
      <div className="flex items-center gap-4 px-2 mb-4">
        <span className="text-zinc-700 flex items-center gap-1">
          <CiCalendar /> {car.year}
        </span>
        <span className="text-zinc-700 flex items-center gap-1">
          <MdSpeed /> {formatKm(car.km)} km
        </span>
      </div>

      <strong className="text-black font-medium text-xl px-2">
        {formatCurrency(car.price)}
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
