import Container from "../../components/container";
import { useState, useEffect } from "react";
import { collection, query, getDocs, orderBy, where } from "firebase/firestore";
import { db } from "../../services/firebaseconnection";
import { Card } from "../../components/card";
import type { CarProps } from "../../types/CarProps";
import { Link } from "react-router";

export function Home() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [input, setInput] = useState("");

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

  async function handleSearchCar() {
    if (input.trim() === "") {
      loadCars();
      return;
    }

    setCars([]);

    const q = query(
      collection(db, "cars"),
      where("make", ">=", input.trim()),
      where("make", "<=", input.trim() + "\uf8ff"),
    );
    const querySnapshot = await getDocs(q);

    const listCars = [] as CarProps[];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      listCars.push({
        id: doc.id,
        ...data,
      } as CarProps);
    });

    setCars(listCars);
  }

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <Container>
      <section className="w-full max-w-3xl flex justify-center items-center gap-2 bg-white rounded-lg mx-auto p-4 mb-6 shadow-sm">
        <input
          type="text"
          placeholder="Digite o nome do carro"
          className="w-full border rounded-lg h-9 px-3 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSearchCar}
          className="bg-red-500 text-white text-lg font-medium h-9 px-8 rounded-lg hover:bg-red-600 transition-colors"
        >
          Buscar
        </button>
      </section>

      <h1 className="font-bold text-center text-2xl mb-4">
        Carros novos e usados em todo o Brasil!
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`}>
            <Card car={car} />
          </Link>
        ))}
      </main>
    </Container>
  );
}
