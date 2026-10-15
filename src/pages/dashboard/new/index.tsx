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
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewCarDTO>({
    resolver: zodResolver(newCarSchema),
  });

  async function onSubmit(data: NewCarDTO) {
    if (carImages.length === 0) {
      alert("Envie alguma imagem deste carro.");
      return;
    }

    try {
      const uploadPromises = carImages.map(async (car) => {
        return await uploadImage(car.image, car.uid, car.name);
      });
      const listImages: CarImage[] = await Promise.all(uploadPromises);

      await createCar(data, listImages, {
        name: user?.name ?? "",
        uid: user?.uid ?? "",
      });

      reset();
      setCarImages([]);
      console.log("Carro cadastrado com sucesso!");
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
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </Container>
  );
};
