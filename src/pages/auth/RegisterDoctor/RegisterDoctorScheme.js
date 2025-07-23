import z from "zod";

const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const maxImageSize = 2 * 1024 * 1024; // 2MB

const registerDoctorSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  speciality: z.string().min(1, "Speciality is required"),
  shortIntroduction: z
    .string()
    .max(200, "Introduction must be under 200 characters")
    .optional(),
  profileImage: z
    .instanceof(File)
    .refine((file) => file?.size > 0, "Profile image is required")
    .refine((file) => file.size <= maxImageSize, "Image must be under 2MB")
    .refine(
      (file) => allowedImageTypes.includes(file.type),
      "Invalid file type. Only image formats allowed"
    ),
});

export default registerDoctorSchema;
