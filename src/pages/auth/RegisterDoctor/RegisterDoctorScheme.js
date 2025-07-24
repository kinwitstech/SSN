import { z } from "zod";

const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const maxImageSize = 2 * 1024 * 1024;

const registerDoctorSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  email: z.string().min(1, "Email is required.").email("Invalid email."),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),
  specialty: z.string().min(1, "Specialty is required."),
  shortIntroduction: z.string().min(1, "Short introduction is required."),
  profileImage: z
    .any()
    .refine((file) => file !== null, {
      message: "Profile image is required.",
    })
    .refine((file) => !file || allowedImageTypes.includes(file?.type), {
      message: "Only JPEG, PNG, or WEBP images allowed.",
    })
    .refine((file) => !file || file.size <= maxImageSize, {
      message: "Image must be under 2MB.",
    }),
});

export default registerDoctorSchema;
