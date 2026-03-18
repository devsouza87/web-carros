import { useContext, useEffect, useState } from "react";
import Container from "../../components/container";
import { AuthContext } from "../../contexts/AuthContext";
import PanelHeader from "../../components/panelHeader";
import { Card } from "../../components/card";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../services/firebaseconnection";
import type { CarProps } from "../../types/CarProps";
import { deleteObject, ref } from "firebase/storage";

export function Dashboard() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const { user } = useContext(AuthContext);

  async function handleDelete(car: CarProps) {
    const itemDoc = doc(db, "cars", car.id);

    try {
      await deleteDoc(itemDoc);
      car.images.forEach(async (image) => {
        const imagePath = `images/${image.uid}/${image.name}`;
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);

        setCars((prevCars) =>
          prevCars.filter((prevCar) => prevCar.id !== car.id),
        );
      });
    } catch (error) {
      console.log("Erro ao deletar: ", error);
    }
  }

  useEffect(() => {
    function loadCars() {
      if (!user?.uid) return;

      const carRef = collection(db, "cars");
      const queryRef = query(carRef, where("ownerId", "==", user.uid));

      getDocs(queryRef).then((snapshot) => {
        const listCars: CarProps[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          listCars.push({
            id: doc.id,
            ...data,
          } as CarProps);
          setCars(listCars);
        });
      });
    }

    loadCars();
  }, [user]);

  return (
    <Container>
      <PanelHeader />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3  ">
        {cars.map((car) => (
          <Card
            key={car.id}
            car={car}
            showDelete={true}
            onDelete={handleDelete}
          />
        ))}
      </main>
    </Container>
  );
}
