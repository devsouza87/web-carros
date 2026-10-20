import { Container } from "../../components/layout/container";
import { Button } from "../../components/ui/button";
import { collection, query, getDocs, orderBy, where } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConnection";
import { useEffect, useState, useCallback } from "react";
import { Card } from "../../components/Card";
import type { CardProps } from "../../types/Car";
import { Link } from "react-router";

export const Home = () => {
  const [carCards, setCarCards] = useState<CardProps[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchCars = useCallback(async (searchQuery?: string) => {
    const carsRef = collection(db, "cars");

    try {
      let queryRef;

      if (searchQuery && searchQuery.trim() !== "") {
        const normalizedQuery = searchQuery.trim().toUpperCase();
        queryRef = query(
          carsRef,
          where("name", ">=", normalizedQuery),
          where("name", "<=", normalizedQuery + "\uf8ff"),
          orderBy("createdAt", "desc"),
        );
      } else {
        queryRef = query(carsRef, orderBy("createdAt", "desc"));
      }

      const snapshot = await getDocs(queryRef);

      const listCars: CardProps[] = snapshot.docs.map((docItem) => {
        const data = docItem.data();
        return {
          id: docItem.id,
          name: data.name,
          version: data.version,
          year: data.year,
          km: data.km,
          city: data.city,
          state: data.state,
          price: data.price,
          images: data.images,
        };
      });

      setCarCards(listCars);
    } catch (error) {
      console.log("Erro ao buscar carros: ", error);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleSearchCar = () => {
    fetchCars(searchInput);
  };

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
