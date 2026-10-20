import z from "zod";

export const newCarSchema = z.object({
  make: z.string().nonempty("O campo nome é obrigatório."),
  model: z.string().nonempty("O modelo é obrigatório."),
  version: z.string().nonempty("O Campo versão é obrigatório"),
  year: z.string().nonempty("O ano é obrigatório."),
  km: z.string().nonempty("O km é obrigatório."),
  price: z.string().nonempty("O preço é obrigatório."),
  city: z.string().nonempty(" A Cidade obrigatória."),
  state: z.string().nonempty("O Estado é obrigatório."),
  telephone: z
    .string()
    .nonempty("O Estado é obrigatório.")
    .refine((v) => /^\d{10,12}$/.test(v), {
      message: "Número de telefone inválido.",
    }),
  description: z.string().nonempty("A descrição é obrigatória."),
});

export type NewCarDTO = z.infer<typeof newCarSchema>;
