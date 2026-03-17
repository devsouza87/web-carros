import Container from "../../components/container";
import { useState, useEffect } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../services/firebaseconnection";
import { set } from "zod";

type CarProps = {
  id: string;
  make: string;
  model: string;
  year: string;
  mileage: string;
  price: string;
  city: string;
  state: string;
  ownerId: string;
  images: CarImageProps[];
};

type CarImageProps = {
  name: string;
  uid: string;
  url: string;
};

export function Home() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);

  function handleImageCar(id: string) {
    setLoadImages((prev) => [...prev, id]);
  }

  useEffect(() => {
    async function loadCars() {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, orderBy("createdAt", "desc"));

      const snapshot = await getDocs(queryRef);
      const listCars = [] as CarProps[];

      snapshot.forEach((doc) => {
        const data = doc.data();
        listCars.push({
          id: doc.id,
          make: data.make,
          model: data.model,
          year: data.year,
          mileage: data.mileage,
          price: data.price,
          city: data.city,
          state: data.state,
          images: data.images,
          ownerId: data.ownerId,
        });
      });

      setCars(listCars);
    }

    loadCars();
  }, []);

  return (
    <Container>
      <section className="w-full max-w-3xl flex justify-center items-center gap-2 bg-white rounded-lg mx-auto p-4 mb-6 shadow-sm">
        <input
          type="text"
          placeholder="Digite o nome do carro"
          className="w-full border rounded-lg h-9 px-3 outline-none"
        />
        <button className="bg-red-500 text-white text-lg font-medium h-9 px-8 rounded-lg hover:bg-red-600 transition-colors">
          Buscar
        </button>
      </section>

      <h1 className="font-bold text-center text-2xl mb-4">
        Carros novos e usados em todo o Brasil!
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
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
            <div className="w-full aspect-video overflow-hidden bg-gray-100 mb-1">
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
        ))}
      </main>
    </Container>
  );
}
