import { useState } from "react";
import type { CarProps } from "../../types/CarProps";
import { FiTrash } from "react-icons/fi";

type CardProps = {
  car: CarProps;
  showDelete?: boolean;
  onDelete?: (car: CarProps) => void;
};

export function Card({ car, showDelete = false, onDelete }: CardProps) {
  const [loadImages, setLoadImages] = useState<string[]>([]);

  function handleImageCar(id: string) {
    setLoadImages((prev) => [...prev, id]);
  }

  return (
    <section
      key={car.id}
      className="w-full bg-white rounded-lg overflow-hidden shadow-sm"
    >
      <div
        className="w-full h-72 rounded-lg bg-slate-200"
        style={{
          display: loadImages.includes(car.id) ? "none" : "block",
        }}
      ></div>
      <div className="w-full aspect-video overflow-hidden bg-gray-100 mb-1 relative">
        {showDelete && (
          <button
            className="absolute z-10 bg-white p-2 rounded-full cursor-pointer right-2 top-2 shadow-md hover:scale-110 transition-transform"
            type="button"
            onClick={() => onDelete && onDelete(car)}
          >
            <FiTrash size={20} color="#ef4444" />
          </button>
        )}
        {car.images[0] && (
          <img
            src={car.images[0].url}
            alt={car.model}
            onLoad={() => handleImageCar(car.id)}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
            style={{
              display: loadImages.includes(car.id) ? "block" : "none",
            }}
          />
        )}
      </div>

      <div className="px-3">
        <h2 className="font-bold mb-2 text-lg uppercase">
          {car.make} - {car.model}
        </h2>

        <div className="flex flex-col">
          <span className="text-zinc-600 mb-4">
            Ano: {car.year} | {car.mileage} km
          </span>
          <strong className="text-black text-xl font-bold">
            R$ {car.price}
          </strong>
        </div>

        <div className="w-full h-px bg-slate-200 my-3"></div>

        <div className="pb-3 text-zinc-700 text-sm">
          <span>
            {car.city} - {car.state.toUpperCase()}
          </span>
        </div>
      </div>
    </section>
  );
}
