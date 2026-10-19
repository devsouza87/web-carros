import { Container } from "../../components/layout/container";
import { Button } from "../../components/ui/button";
import { collection, query, getDocs, orderBy, where } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConnection";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import type { CarProps } from "../../types/Car";
import { Link } from "react-router";

export const Home = () => {
  const [carCards, setCarCards] = useState<CarProps[]>([]);
  const [searchInput, setSearchInput] = useState("");

  async function loadCars() {
    const carsRef = collection(db, "cars");
    const queryRef = query(carsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(queryRef);

    const listCars: CarProps[] = [];

    snapshot.forEach((doc) => {
      listCars.push({
        id: doc.id,
        make: doc.data().make,
        model: doc.data().model,
        year: doc.data().year,
        km: doc.data().km,
        city: doc.data().city,
        state: doc.data().state,
        price: doc.data().price,
        images: doc.data().images,
        uid: doc.data().uid,
        description: doc.data().description,
        telephone: doc.data().telephone,
      });
    });

    setCarCards(listCars);
  }

  useEffect(() => {
    loadCars();
  }, []);

  async function handleSearchCar() {
    if (searchInput === "") {
      loadCars();
      return;
    }

    setCarCards([]);

    // Convertemos o input para letras minúsculas para facilitar a busca (opcional, se salvar assim no banco)
    //const normalizedQuery = searchInput.toUpperCase(); // ou toLowerCase() dependendo de como salva

    const q = query(
      collection(db, "cars"),
      where("make", ">=", searchInput),
      where("make", "<=", searchInput + "\uf8ff"),
    );

    const querySnapshot = await getDocs(q);

    const listCars: CarProps[] = [];
    querySnapshot.forEach((doc) => {
      listCars.push({
        id: doc.id,
        make: doc.data().make,
        model: doc.data().model,
        year: doc.data().year,
        km: doc.data().km,
        city: doc.data().city,
        state: doc.data().state,
        price: doc.data().price,
        images: doc.data().images,
        uid: doc.data().uid,
        description: doc.data().description,
        telephone: doc.data().telephone,
      });
    });

    setCarCards(listCars);
  }

  return (
    <Container>
      <section className="flex justify-center items-center gap-2 bg-white w-full max-w-3xl rounded-lg p-4 mx-auto mb-6">
        <input
          type="text"
          placeholder="Digite o nome do carro..."
          className="w-full border rounded-lg h-9 px-3 outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button bg="bg-red-500" label="Buscar" onClick={handleSearchCar} />
      </section>
      <h1 className="font-bold text-center text-2xl mb-4">
        Carros novos e usados em todo o Brasil
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {carCards.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`}>
            <Card {...car} />
          </Link>
        ))}
      </main>
    </Container>
  );
};
