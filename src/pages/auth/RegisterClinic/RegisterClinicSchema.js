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

const clinicSchema = z.object({
  clinicName: z.string().min(1, "Clinic name is required"),
  adminName: z.string().min(1, "Admin name is required"),
  email: z.string().email("Invalid email"),
  phone: z
  .string()
  .min(10, "Phone number is required")
  .regex(/^\d+$/, "Phone number must contain digits only"),
  clinicAddress: z.string().min(1, "Clinic address is required"),
  speciality: z.string().min(1, "Speciality is required"),
  consultationFee: z
    .string()
    .min(1, "Fee is required")
    .regex(/^\d+$/, "Fee must be a number"),
  certificate: z
    .any()
    .refine((file) => {
      const f = Array.isArray(file) ? file[0] : file;
      if (!f) return false;
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      return allowedTypes.includes(f.type);
    }, {
      message: "Please upload a valid PDF or image (JPG/PNG) file",
    }),
  servicesProvided: z.array(z.string()).optional(),
});


export const fullSchema = clinicDetailsSchema
  .merge(clinicSchema)
  .merge(brandingSchema)
  .merge(subscriptionPlanSchema);

// 🧪 Fields to validate per step
export const stepFieldsMap = {
  0: ["clinicName", "adminName", "email", "phone", "clinicAddress","speciality", "consultationFee", "certificate", "servicesProvided"],
  1: ["clinicLogo"],
  2: ["subscriptionPlan"],
};
