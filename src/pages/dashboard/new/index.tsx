import { useContext, useState } from "react";
import { Container } from "../../../components/layout/container";
import { PanelHeader } from "../../panelHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../../contexts/AuthContext";
import { newCarSchema, type NewCarDTO } from "../../../schemas/new-car";
import { uploadImage } from "../../../services/firebase/storage";
import { createCar } from "../../../services/firebase/firestore";
import type { CarImage } from "../../../types/CarImage";
import { UploadImageCar } from "./components/uploadImageCar";
import { CarForm } from "./components/CarForm";
import { toast } from "sonner";
import type { CreateCarProps } from "../../../types/Car";
import { unmaskPhone, unmaskCurrency, unmaskKm } from "../../../utils/masks";

export interface ImageItemProps {
  image: File;
  uid: string;
  name: string;
  previewUrl: string;
}

export const New = () => {
  const [carImages, setCarImages] = useState<ImageItemProps[]>([]);
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewCarDTO>({
    resolver: zodResolver(newCarSchema),
    defaultValues: {
      make: "",
      model: "",
      version: "",
      year: "",
      km: "",
      price: "",
      city: "",
      state: "",
      telephone: "",
      description: "",
    },
  });

  async function onSubmit(data: NewCarDTO) {
    if (carImages.length === 0) {
      toast.error("Envie alguma imagem deste carro.");
      return;
    }

    try {
      const uploadPromises = carImages.map(async (car) => {
        return await uploadImage(car.image, car.uid, car.name);
      });

      const listImages: CarImage[] = await Promise.all(uploadPromises);

      const newCar: CreateCarProps = {
        make: data.make.toUpperCase(),
        model: data.model.toUpperCase(),
        version: data.version.toUpperCase(),
        name: `${data.make.toUpperCase()} ${data.model.toUpperCase()}`,
        year: data.year,
        km: Number(unmaskKm(data.km)),
        price: Number(unmaskCurrency(data.price)),
        city: data.city,
        state: data.state,
        telephone: unmaskPhone(data.telephone),
        description: data.description,
        images: listImages,
        owner: user?.name,
        uid: user?.uid,
        createdAt: new Date(),
      };

      await createCar(newCar);

      reset();
      setCarImages([]);
      toast.success("Carro cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar o carro:", error);
      alert("Houve um erro ao processar os uploads ou salvar o anúncio.");
    }
  }

  return (
    <Container>
      <PanelHeader />
      <UploadImageCar carImages={carImages} setCarImages={setCarImages} />
      <CarForm
        control={control}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </Container>
  );
};
