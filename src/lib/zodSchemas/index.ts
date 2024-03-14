import { z } from "zod";

export const loginSchema = z.object({
    nickName: z.string()
        .min(2, 'Никнейм должен иметь минимум 2 символа')
        .max(10, 'Никнейм должен иметь максимум 10 символов'),
    password: z.string()
        .min(6, 'Пароль должен иметь минимум 6 символов')
        .max(10, 'Пароль должен иметь максимум 10 символов'),
});

export const registerSchema = z.object({
    nickName: z.string()
        .min(2, 'Никнейм должен иметь минимум 2 символа')
        .max(10, 'Никнейм должен иметь максимум 10 символов'),
    email: z.string().email('Неверный формат email'),
    password: z.string()
        .min(6, 'Пароль должен иметь минимум 6 символов')
        .max(10, 'Пароль должен иметь максимум 10 символов'),
});

export const profileSchema = z.object({
    realName: z.string().min(1, 'Обязательное поле'),
    age: z.number().min(18, 'Вам должно быть не меньше 18 лет').max(100, 'Слишком большой возраст'),
    bio: z.string().min(1, 'Обязательное поле'),
    avatar: z.string().optional()
})

export const beerSchema = z.object({
    name: z.string().min(1, 'Обязательное поле'),
    brewery: z.string().min(1, 'Обязательное поле'),
    type: z.string().min(1, 'Обязательное поле'),
    abv: z.number().min(0, 'Abv не может быть отрицательным').max(100),
    volume: z.number(),
    image: z.string().optional()
})

export const reviewSchema = z.object({
    title: z.string().min(1, 'Обязательное поле'),
    body: z.string().min(1, 'Обязательное поле'),
    rating: z.number().min(1).max(5)
})