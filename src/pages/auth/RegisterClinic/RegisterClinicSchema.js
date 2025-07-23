import z from "zod";

// Zod schemas for register clinic form.
const clinicDetailsSchema = z.object({});

const brandingSchema = z.object({
  clinicLogo: z.instanceof(File).refine((file) => file?.size > 0, {
    message: "Clinic logo is required",
  }),
  clinicPrimaryColor: z.string().min(1, "Primary color is required"),
  // clinicTagline: z
  //   .string()
  //   .min(1, "Clinic tagline is required")
  //   .max(200, "Tagline is too long"),
});

const subscriptionPlanSchema = z.object({
  subscriptionPlan: z.string().min(1, "Please select a subscription plan"),
});

const clinicSchema = z.object({
  clinicName: z.string().min(1, "Clinic name is required"),
  adminName: z.string().min(1, "Admin name is required"),
  // email: z.string().email("Invalid email"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must contain 10 digits"),
  // clinicAddress: z.string().min(1, "Clinic address is required"),
  specialty: z.string().min(1, "Specialty is required"),
  consultationFee: z
    .string()
    .min(1, "Fee is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Fee must be a valid number"),
  certificate: z
    .instanceof(File)
    .refine((file) => file?.size > 0, "Please upload your certificate")
    .refine(
      (file) => file?.size <= 2 * 1024 * 1024,
      "Certificate file must be under 2MB"
    )
    .refine(
      (file) =>
        [
          "application/pdf",
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ].includes(file?.type),
      "Please upload only PDF or Image format certificate"
    ),
  servicesProvided: z.array(z.string()).nonempty("Please select your service"),
});

export const fullSchema = clinicDetailsSchema
  .merge(clinicSchema)
  .merge(brandingSchema)
  .merge(subscriptionPlanSchema);

// 🧪 Step-wise fields to validate
export const stepFieldsMap = {
  0: [
    "clinicName",
    "adminName",
    // "email",
    "phone",
    // "clinicAddress",
    "speciality",
    "consultationFee",
    "certificate",
    "servicesProvided",
  ],
  1: ["clinicLogo", "clinicPrimaryColor"],
  2: ["subscriptionPlan"],
};
