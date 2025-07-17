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

const subscriptionPlanSchema = z.object({
  subscriptionPlan: z.string().min(1, "Please select a subscription plan"),
});

export const fullSchema = clinicDetailsSchema
  .merge(brandingSchema)
  .merge(subscriptionPlanSchema);

// 🧪 Fields to validate per step
export const stepFieldsMap = {
  0: ["clinicLogo"],
  1: ["subscriptionPlan"],
  2: [],
  3: [],
  4: [],
};
