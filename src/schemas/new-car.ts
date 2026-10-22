import z from "zod";

export const newCarSchema = z.object({
  make: z.string().min(1, "O campo nome é obrigatório."),
  model: z.string().min(1, "O modelo é obrigatório."),
  version: z.string().min(1, "O Campo versão é obrigatório"),
  year: z.string().min(1, "O ano é obrigatório."),
  km: z.string().min(1, "O km é obrigatório."),
  price: z.string().min(1, "O preço é obrigatório."),
  city: z.string().min(1, "A Cidade é obrigatória."),
  state: z.string().min(1, "O Estado é obrigatório."),
  telephone: z
    .string()
    .min(1, "O telefone é obrigatório.")
    .refine(
      (v) => {
        const cleanPhone = v.replace(/\D/g, "");
        return cleanPhone.length === 10 || cleanPhone.length === 11;
      },
      {
        message: "Número de telefone inválido (deve conter 10 ou 11 dígitos).",
      },
    ),
  description: z.string().min(1, "A descrição é obrigatória."),
});

export type NewCarDTO = z.infer<typeof newCarSchema>;
