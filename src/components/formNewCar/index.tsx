import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { FiUpload } from "react-icons/fi";
import { Input } from "../input";

const schema = z.object({
  marca: z.string().nonempty("Marca é obrigatória"),
  modelo: z.string().nonempty("Modelo é obrigatório"),
  ano: z.string().nonempty("Ano é obrigatório"),
  km: z.string().nonempty("Km é obrigatório"),
  preco: z.string().nonempty("Preço é obrigatório"),
  cidade: z.string().nonempty("Cidade é obrigatória"),
  estado: z.string().nonempty("Estado é obrigatório"),
  telefone: z
    .string()
    .nonempty("Telefone/Whatsapp é obrigatório")
    .refine((value) => /^(\d{10,11}$)/.test(value), {
      message: "Telefone inválido",
    }),
  descricao: z.string().nonempty("Descrição é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export default function FormNewCar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    //reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <>
      <div className="w-full bg-white p-3 rounded-ld flex flex-col sm:flex-row items-center gap-2 mb-2">
        <button className="border w-48 rounded-g flex items-center justify-center cursor-pointer border-gray-600 h-32">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="cursor-pointer opacity-0"
            />
          </div>
        </button>
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col  sm-flex-row items-center gap-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <Input
              type="text"
              label="Marca"
              name="marca"
              id="marca"
              placeholder="Chevrolet"
              register={register}
              error={errors.marca?.message}
            />
            <Input
              type="text"
              label="Modelo"
              name="modelo"
              id="modelo"
              placeholder="Onix"
              register={register}
              error={errors.modelo?.message}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <Input
              type="text"
              label="Ano"
              name="ano"
              id="ano"
              placeholder="2020/2021"
              register={register}
              error={errors.ano?.message}
            />
            <Input
              type="text"
              label="KM"
              name="km"
              id="km"
              placeholder="85.000"
              register={register}
              error={errors.km?.message}
            />
            <Input
              type="text"
              label="Preço"
              name="preco"
              id="preco"
              placeholder="R$ 1.500,00"
              register={register}
              error={errors.preco?.message}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <Input
              type="text"
              label="Cidade"
              name="cidade"
              id="cidade"
              placeholder="Vitória"
              register={register}
              error={errors.cidade?.message}
            />
            <Input
              type="text"
              label="Estado"
              name="estado"
              id="estado"
              placeholder="ES"
              register={register}
              error={errors.estado?.message}
            />
            <Input
              type="text"
              label="Telefone/Whatsapp"
              name="telefone"
              id="telefone"
              placeholder="(27) 9 9999-9999"
              register={register}
              error={errors.telefone?.message}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descricao" className="font-medium">
              Descrição
            </label>
            <textarea
              id="descricao"
              className="w-full h-28 border rounded-lg px-2 resize-none"
              rows={5}
              placeholder="Descrição do carro"
              {...register("descricao")}
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-black text-white font-medium rounded-lg cursor-pointer"
          >
            Cadastrar carro
          </button>
        </form>
      </div>
    </>
  );
}
