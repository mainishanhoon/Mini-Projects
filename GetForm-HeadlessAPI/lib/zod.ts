import { z } from 'zod';

export const SalesSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(2).max(1000),
});

export const SupportSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(2).max(1000),
  image: z.instanceof(File).optional(),
});
