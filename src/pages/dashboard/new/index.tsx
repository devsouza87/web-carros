import { useContext, useState } from "react";
import { Container } from "../../../components/container";
import { PanelHeader } from "../../panelHeader";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../../contexts/AuthContext";
import { newCarSchema, type NewCarDTO } from "../../../schemas/new-car";
import { uploadImage } from "../../../services/firebase/storage";
import { createCar } from "../../../services/firebase/firestore";
import type { CarImage } from "../../../types/CarImage";
import { UploadCar } from "../../../components/uploadCar";

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

      <UploadCar carImages={carImages} setCarImages={setCarImages} />

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
            disabled={isSubmitting}
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </Container>
  );
};
