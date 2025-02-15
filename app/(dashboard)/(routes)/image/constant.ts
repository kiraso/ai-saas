import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "image prompt is required" }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = [
  { value: 1, label: "1 photo" },
  { value: 2, label: "2 photo" },
  { value: 3, label: "3 photo" },
  { value: 4, label: "4 photo" },
  { value: 5, label: "5 photo" },
];

export const resolutionOptions = [
  { value: "256x256", label: "256 x 256" },
  { value: "512x512", label: "512 x 512" },
  { value: "1024x1024", label: "1024 x 1024" },
];
