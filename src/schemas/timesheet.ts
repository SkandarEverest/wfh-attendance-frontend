import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const checkInSchema = z.object({
  workDate: z.string().min(1, "Work date is required"),
  notes: z.string().optional(),
  photo: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "File size must be less than 5MB",
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png, and .webp formats are supported",
    ),
});

export type CheckInFormValues = z.infer<typeof checkInSchema>;
