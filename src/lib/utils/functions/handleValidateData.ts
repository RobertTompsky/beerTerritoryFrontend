import { z } from "zod"

export const handleValidateData = <T>(schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>, data: T) => {
    schema.parse(data)
}