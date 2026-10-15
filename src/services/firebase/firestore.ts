import { addDoc, collection } from "firebase/firestore";
import type { NewCarDTO } from "../../schemas/new-car";
import { db } from "./firebaseConnection";
import type { CarImage } from "../../types/CarImage";

export async function createCar(
  data: NewCarDTO,
  carImages: CarImage[],
  user: { uid: string; name: string },
) {
  await addDoc(collection(db, "cars"), {
    make: data.make,
    model: data.model,
    year: data.year,
    km: data.km,
    price: data.price,
    city: data.city,
    state: data.state,
    telephone: data.telephone,
    description: data.description,
    createdAt: new Date(),
    owner: user.name,
    uid: user.uid,
    images: carImages,
  });
}
