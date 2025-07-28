import { z } from "zod";

const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const maxImageSize = 2 * 1024 * 1024;

export const RegisterPatientSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),
  email: z.string().min(1, "Email is required.").email("Invalid email."),
  gender: z.string().min(1, "Please select a gender"),
  bloodGroup: z.string().min(1, "Please select a blood group"),
  address: z.string().min(1, "Clinic address is required"),
  dob: z.string().refine(
    (val) => {
      // Ensure it's in dd/mm/yyyy format
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) return false;

      const [day, month, year] = val.split("/").map(Number);
      const date = new Date(year, month - 1, day);

      // Check: valid date, and same components (not auto-corrected)
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    },
    {
      message: "Please enter a valid date in dd/mm/yyyy format",
    }
  ),
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
  currentMedication: z.string().min(1, "This field is required."),
});

export default RegisterPatientSchema;
