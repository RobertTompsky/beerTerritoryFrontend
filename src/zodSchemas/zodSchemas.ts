import { z } from 'zod';

export const userLoginSchema = z.object({
    nickname: z.string().min(2),
    password: z.string().min(6),
  });