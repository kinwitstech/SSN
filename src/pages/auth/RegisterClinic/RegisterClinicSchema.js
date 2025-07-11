import z from "zod";

// Zod schemas
const clinicDetailsSchema = z.object({});

const brandingSchema = z.object({
  clinicLogo: z.instanceof(File).refine((file) => file?.size > 0, {
    message: "Clinic logo is required",
  }),
  clinicPrimaryColor: z.string(),
  clinicTagline: z
    .string()
    .min(1, "Clinic tagline is required")
    .max(200, "Tagline is too long"),
});

export const fullSchema = clinicDetailsSchema.merge(brandingSchema);

// 🧪 Fields to validate per step
export const stepFieldsMap = {
  0: ["clinicLogo"],
};
