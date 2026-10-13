import { useContext, useState, type ChangeEvent } from "react";
import { FiTrash, FiTrash2, FiUpload } from "react-icons/fi";
import { Container } from "../../../components/container";
import { PanelHeader } from "../../panelHeader";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../../contexts/AuthContext";
import { v4 as uuidV4 } from "uuid";
import { storage, db } from "../../../services/firebaseConnection";
import {
  uploadBytes,
  getDownloadURL,
  deleteObject,
  ref,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const schema = z.object({
  make: z.string().nonempty("O campo nome é obrigatório."),
  model: z.string().nonempty("O modelo é obrigatório."),
  year: z.string().nonempty("O ano é obrigatório."),
  km: z.string().nonempty("O km é obrigatório."),
  price: z.string().nonempty("O preço é obrigatório."),
  city: z.string().nonempty(" A Cidade obrigatória."),
  state: z.string().nonempty("O Estado é obrigatório."),
  whatsapp: z
    .string()
    .nonempty("O Estado é obrigatório.")
    .refine((v) => /^\d{10,12}$/.test(v), {
      message: "Número de telefone inválido.",
    }),
  description: z.string().nonempty("A descrição é obrigatória."),
});

type FormData = z.infer<typeof schema>;

interface ImageItemProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

export const New = () => {
  const [carImages, setCarImages] = useState<ImageItemProps[]>([]);

  const { user } = useContext(AuthContext);
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
      if (
        image.type === "image/jpeg" ||
        image.type === "image/jpg" ||
        image.type === "image/png"
      ) {
        await handleUpload(image);
      } else {
        alert("Envie um arquivo JPG ou PNG");
      }
    }
  }

  async function handleUpload(image: File) {
    if (!user?.uid) return;

    const currentUid = user.uid;
    const uidImage = uuidV4();

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        const imageItem = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downloadUrl,
        };

        setCarImages((state) => [...state, imageItem]);
      });
    });
  }

  async function handleDeleteImage(image: ImageItemProps) {
    const imagePath = `images/${image.uid}/${image.name}`;
    const imageRef = ref(storage, imagePath);

    try {
      await deleteObject(imageRef);
      setCarImages((state) => state.filter((car) => car.url !== image.url));
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmit(data: FormData) {
    if (carImages.length === 0) {
      alert("Envie alguma imagem deste carro.");
      return;
    }

    const carListImages = carImages.map((car) => {
      return {
        uid: car.uid,
        name: car.name,
        previewUrl: car.previewUrl,
      };
    });

    addDoc(collection(db, "cars"), {
      make: data.make,
      model: data.model,
      yer: data.year,
      km: data.km,
      price: data.price,
      city: data.city,
      state: data.state,
      telephone: data.whatsapp,
      description: data.description,
      createdAt: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: carListImages,
    })
      .then(() => {
        reset();
        setCarImages([]);
        console.log("Carro cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        console.log("Erro ao cadastrar o carro");
      });
  }

  return (
    <Container>
      <PanelHeader />

      <div className="w-full bg-white p-3 rounded-md flex flex-col sm:flex-row items-center gap-2 mb-2">
        <button className="border w-48 rounded-md flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={28} color="#000" />
          </div>
          <div className="cursor-pointer ">
            <input
              type="file"
              accept="image/*"
              className="opacity-0 cursor-pointer"
              onChange={handleFile}
            />
          </div>
        </button>

        {carImages.length > 0 && (
          <div className="w-full h-32 flex items-center justify-center gap-1">
            {carImages.map((item) => (
              <div
                key={item.name}
                className="w-full h-32 flex items-center justify-center relative"
              >
                <button
                  className="absolute cursor-pointer"
                  onClick={() => handleDeleteImage(item)}
                >
                  <FiTrash2 size={28} color="#fff" />
                </button>
                <img
                  src={item.previewUrl}
                  className="rounded-md w-full h-32 object-cover"
                  alt="foto do carro"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full bg-white p-3 rounded-md flex flex-col sm:flex-row items-center gap-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              label="Marca"
              type="text"
              name="make"
              register={register}
              errorMessage={errors.make?.message}
            />
            <Input
              label="Modelo"
              type="text"
              name="model"
              register={register}
              errorMessage={errors.model?.message}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              label="Ano"
              type="text"
              name="year"
              register={register}
              errorMessage={errors.year?.message}
            />
            <Input
              label="KM"
              type="text"
              name="km"
              register={register}
              errorMessage={errors.km?.message}
            />
            <Input
              label="Preço"
              type="text"
              name="price"
              register={register}
              errorMessage={errors.price?.message}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              label="Cidade"
              type="text"
              name="city"
              register={register}
              errorMessage={errors.city?.message}
            />
            <Input
              label="Estado"
              type="text"
              name="state"
              register={register}
              errorMessage={errors.state?.message}
            />
            <Input
              label="Telefone/Whatsapp"
              type="text"
              name="whatsapp"
              register={register}
              errorMessage={errors.whatsapp?.message}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Descrição</label>
            <textarea
              className="w-full border rounded-md resize-none p-4"
              rows={5}
              id="description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            className="w-full h-10 bg-zinc-700 text-white font-medium rounded-md cursor-pointer"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
};
