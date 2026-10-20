import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConnection";
import type { CreateCarProps } from "../../types/Car";

export async function createCar(data: CreateCarProps) {
  await addDoc(collection(db, "cars"), {
    make: data.make,
    model: data.model,
    name: data.name,
    year: data.year,
    km: data.km,
    price: data.price,
    city: data.city,
    state: data.state,
    telephone: data.telephone,
    description: data.description,
    images: data.images,
    owner: data.owner,
    uid: data.uid,
    createdAt: new Date(),
  });
}
