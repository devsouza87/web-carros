import { useEffect, useState, useContext } from "react";
import { Card } from "../../components/Card";
import { Container } from "../../components/layout/container";
import { PanelHeader } from "../panelHeader";
import type { CardProps } from "../../types/Car";
import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../services/firebase/firebaseConnection";
import { AuthContext } from "../../contexts/AuthContext";

export const Dashboard = () => {
  const [carCards, setCarCards] = useState<CardProps[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadCars() {
      if (!user?.uid) return;

      const carsRef = collection(db, "cars");
      const queryRef = query(
        carsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(queryRef);

      const listCars: CardProps[] = [];

      snapshot.forEach((docItem) => {
        listCars.push({
          id: docItem.id,
          name: docItem.data().name,
          version: docItem.data().version,
          year: docItem.data().year,
          km: docItem.data().km,
          city: docItem.data().city,
          state: docItem.data().state,
          price: docItem.data().price,
          images: docItem.data().images,
        });
      });

      setCarCards(listCars);
    }

    loadCars();
  }, [user]);

  async function deleteCar(car: CardProps) {
    const docRef = doc(db, "cars", car.id);
    await deleteDoc(docRef);

    if (Array.isArray(car.images)) {
      car.images.forEach(async (image: any) => {
        const imagePath = `images/${image.uid}/${image.name}`;
        const imageRef = ref(storage, imagePath);

        try {
          await deleteObject(imageRef);
        } catch (error) {
          console.log("Erro ao excluir essa imagem: ", error);
        }
      });
    }

    setCarCards((prevCars) =>
      prevCars.filter((prevCar) => prevCar.id !== car.id),
    );
  }

  return (
    <Container>
      <PanelHeader />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {carCards.map((card) => (
          <Card
            key={card.id}
            {...card}
            isDashboard
            onDelete={() => deleteCar(card)}
          />
        ))}
      </main>
    </Container>
  );
};
