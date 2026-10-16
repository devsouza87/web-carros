import { useEffect, useState, useContext } from "react";
import { Card } from "../../components/Card";
import { Container } from "../../components/layout/container";
import { PanelHeader } from "../panelHeader";
import type { CardProps } from "../../types/Card";
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

  async function deleteCar(car: CardProps) {
    const docRef = doc(db, "cars", car.id);
    await deleteDoc(docRef);

    car.images.map(async (image) => {
      const imagePath = `images/${image.uid}/${image.name}`;
      const imageRef = ref(storage, imagePath);

      try {
        await deleteObject(imageRef);
      } catch (error) {
        console.log("Erro ao excluir essa imagem: ", error);
      }
    });

    setCarCards((prevCars) =>
      prevCars.filter((prevCar) => prevCar.id !== car.id),
    );
  }

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
        });
      });

      setCarCards(listCars);
      console.log(listCars);
    }

    loadCars();
  }, [user]);

  return (
    <Container>
      <PanelHeader />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {carCards.map((card) => (
          <Card {...card} isDashboard onDelete={() => deleteCar(card)} />
        ))}
      </main>
    </Container>
  );
};
