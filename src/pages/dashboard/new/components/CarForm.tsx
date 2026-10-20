import type {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import type { NewCarDTO } from "../../../../schemas/new-car"; // Ajuste o caminho do seu schema

type CarFormProps = {
  register: UseFormRegister<NewCarDTO>;
  errors: FieldErrors<NewCarDTO>;
  handleSubmit: UseFormHandleSubmit<NewCarDTO>;
  onSubmit: (data: NewCarDTO) => Promise<void>;
  isSubmitting: boolean;
};

export const CarForm = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  isSubmitting,
}: CarFormProps) => {
  return (
    <div className="w-full bg-white p-3 rounded-md flex flex-col sm:flex-row items-center gap-2">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            label="Marca"
            type="text"
            name="make"
            register={register}
            errorMessage={errors.make?.message}
            placeholder="Chevrolet"
          />
          <Input
            label="Modelo"
            type="text"
            name="model"
            register={register}
            errorMessage={errors.model?.message}
            placeholder="Prisma"
          />
          <Input
            label="Versão"
            type="text"
            name="version"
            register={register}
            errorMessage={errors.version?.message}
            placeholder="1.8 PREMIER 8V FLEX 4P AUTOMÁTICO"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            label="Ano"
            type="text"
            name="year"
            register={register}
            errorMessage={errors.year?.message}
            placeholder="2020"
          />
          <Input
            label="KM"
            type="text"
            name="km"
            register={register}
            errorMessage={errors.km?.message}
            placeholder="18.000"
          />
          <Input
            label="Preço"
            type="text"
            name="price"
            register={register}
            errorMessage={errors.price?.message}
            placeholder="72.000,00"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            label="Cidade"
            type="text"
            name="city"
            register={register}
            errorMessage={errors.city?.message}
            placeholder="Cariacica"
          />
          <Input
            label="Estado"
            type="text"
            name="state"
            register={register}
            errorMessage={errors.state?.message}
            placeholder="ES"
          />
          <Input
            label="Telefone/Whatsapp"
            type="text"
            name="telephone"
            register={register}
            errorMessage={errors.telephone?.message}
            placeholder="(27) 9 9999-9999"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description">Descrição</label>
          <textarea
            className="w-full border rounded-md resize-none p-4"
            rows={5}
            id="description"
            {...register("description" as any)}
            placeholder="Alarme, vidros elétricos, sensor de estacionamento..."
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
        <Button
          width
          bg="bg-zinc-700"
          label={isSubmitting ? "Cadastrando..." : "Cadastrar"}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};
