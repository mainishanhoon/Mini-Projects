import { z } from 'zod';

export const LoginSchema = z.object({
  firstName: z.string().min(2).max(15),
  lastName: z.string().min(2).max(15),
  email: z.string().email(),
  password: z.string().min(8).max(28),
});
