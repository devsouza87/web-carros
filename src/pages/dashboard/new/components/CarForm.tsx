import type {
  FieldErrors,
  Control,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import type { NewCarDTO } from "../../../../schemas/new-car";
import { maskPhone, maskCurrency, maskKm } from "../../../../utils/masks";

type CarFormProps = {
  control: Control<NewCarDTO>; // Mudou de register para control nos campos mascarados
  register: any; // Mantido para os outros campos normais
  errors: FieldErrors<NewCarDTO>;
  handleSubmit: UseFormHandleSubmit<NewCarDTO>;
  onSubmit: (data: NewCarDTO) => Promise<void>;
  isSubmitting: boolean;
};

export const CarForm = ({
  control,
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

          {/* KM com Máscara */}
          <Controller
            name="km"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="KM"
                type="text"
                name="km"
                value={value || ""}
                onChange={(e) => {
                  const masked = maskKm(e.target.value);
                  onChange(masked);
                }}
                errorMessage={errors.km?.message}
                placeholder="18.038"
                // REMOVIDO o register daqui
              />
            )}
          />

          {/* Preço com Máscara */}
          <Controller
            name="price"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Preço"
                type="text"
                name="price"
                value={value || ""} // <-- Garante que nunca será undefined
                onChange={(e) => {
                  const masked = maskCurrency(e.target.value);
                  onChange(masked);
                }}
                errorMessage={errors.price?.message}
                placeholder="72.000,00"
              />
            )}
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

          {/* Telefone com Máscara */}
          <Controller
            name="telephone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Telefone/Whatsapp"
                type="text"
                name="telephone"
                value={value || ""}
                onChange={(e) => {
                  const masked = maskPhone(e.target.value);
                  onChange(masked);
                }}
                errorMessage={errors.telephone?.message}
                placeholder="(27) 9 9999-9999"
                // REMOVIDO o register daqui
              />
            )}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description">Descrição</label>
          <textarea
            className="w-full border rounded-md resize-none p-4"
            rows={5}
            id="description"
            {...register("description")}
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
