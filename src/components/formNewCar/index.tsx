import { type ChangeEvent, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FiTrash, FiUpload } from "react-icons/fi";
import { Input } from "../input";
import { AuthContext } from "../../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";

import { storage, db } from "../../services/firebaseconnection";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const schema = z.object({
  make: z.string().nonempty("Marca é obrigatória"),
  model: z.string().nonempty("Modelo é obrigatório"),
  year: z.string().nonempty("Ano é obrigatório"),
  mileage: z.string().nonempty("Km é obrigatório"),
  price: z.string().nonempty("Preço é obrigatório"),
  city: z.string().nonempty("Cidade é obrigatória"),
  state: z.string().nonempty("Estado é obrigatório"),
  phone: z
    .string()
    .nonempty("Telefone/Whatsapp é obrigatório")
    .refine((value) => /^(\d{10,11}$)/.test(value), {
      message: "Telefone inválido",
    }),
  description: z.string().nonempty("Descrição é obrigatória"),
});

type FormData = z.infer<typeof schema>;

type ImageItemProps = {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
};

export default function FormNewCar() {
  const { user } = useContext(AuthContext);
  const [carImages, setCarImages] = useState<ImageItemProps[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        await handleUpload(image);
      } else {
        alert("Envie uma imagem no formato JPEG ou PNG");
      }
    }
  }

  async function handleUpload(image: File) {
    if (!user?.uid) return;

    const currentUid = user.uid;
    const uidImage = uuidv4();

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

    try {
      const snapshot = await uploadBytes(uploadRef, image);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      const imageItem = {
        name: uidImage,
        uid: currentUid,
        previewUrl: URL.createObjectURL(image),
        url: downloadUrl,
      };

      setCarImages((prev) => [...prev, imageItem]);
    } catch (error) {
      console.error("Erro no upload:", error);
    }
  }

  async function handleDeleteImage(image: ImageItemProps) {
    const imagePath = `images/${image.uid}/${image.name}`;
    const imageRef = ref(storage, imagePath);

    try {
      await deleteObject(imageRef);
      setCarImages((prev) => prev.filter((item) => item.name !== image.name));
    } catch (error) {
      console.error("Erro ao excluir imagem:", error);
    }
  }

  function onSubmit(data: FormData) {
    if (carImages.length === 0) {
      alert("Adicione pelo menos uma imagem");
      return;
    }

    const carListImages = carImages.map((car) => ({
      uid: car.uid,
      name: car.name,
      url: car.url,
    }));

    addDoc(collection(db, "cars"), {
      ...data,
      createdAt: new Date(),
      ownerId: user?.uid,
      images: carListImages,
    })
      .then(() => {
        reset();
        setCarImages([]);
        alert("Carro cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        alert("Erro ao cadastrar no banco de dados.");
      });
  }

  return (
    <>
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mb-2">
        <button className="shrink-0 border w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 relative">
          <div className="absolute">
            <FiUpload size={30} color="#000" />
          </div>
          <input
            type="file"
            accept="image/*"
            className="opacity-0 w-full h-full cursor-pointer"
            onChange={handleFile}
          />
        </button>

        {carImages.map((image) => (
          <div
            key={image.name}
            className="w-full h-32 flex items-center justify-center relative"
          >
            <button
              className="absolute z-10 bg-red-500 p-1 rounded-full cursor-pointer"
              onClick={() => handleDeleteImage(image)}
              type="button"
            >
              <FiTrash size={20} color="#fff" />
            </button>
            <img
              src={image.previewUrl}
              className="w-full h-32 object-cover rounded-lg"
              alt="Foto do carro"
            />
          </div>
        ))}
      </div>

      <div className="w-full bg-white p-3 rounded-lg">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-3">
            <Input
              type="text"
              label="Marca"
              name="make"
              register={register}
              error={errors.make?.message}
              placeholder="Ex: Chevrolet..."
            />
            <Input
              type="text"
              label="Modelo"
              name="model"
              register={register}
              error={errors.model?.message}
              placeholder="Ex: Onix 1.0..."
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mb-3">
            <Input
              type="text"
              label="Ano"
              name="year"
              register={register}
              error={errors.year?.message}
              placeholder="Ex: 2020/2021"
            />
            <Input
              type="text"
              label="KM"
              name="mileage"
              register={register}
              error={errors.mileage?.message}
              placeholder="Ex: 85.000"
            />
            <Input
              type="text"
              label="Preço"
              name="price"
              register={register}
              error={errors.price?.message}
              placeholder="Ex: 65.000"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mb-3">
            <Input
              type="text"
              label="Cidade"
              name="city"
              register={register}
              error={errors.city?.message}
              placeholder="Ex: Vitória"
            />
            <Input
              type="text"
              label="Estado"
              name="state"
              register={register}
              error={errors.state?.message}
              placeholder="Ex: ES"
            />
            <Input
              type="text"
              label="Telefone/Whatsapp"
              name="phone"
              register={register}
              error={errors.phone?.message}
              placeholder="Ex: 27999999999"
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Descrição</p>
            <textarea
              className="border w-full rounded-md h-24 px-2 resize-none"
              {...register("description")}
              placeholder="Digite a descrição completa sobre o carro..."
            />
            {errors.description && (
              <p className="text-red-500 my-1">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-zinc-900 text-white font-medium h-10"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
}
