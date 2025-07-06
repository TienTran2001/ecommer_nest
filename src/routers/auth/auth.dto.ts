import { createZodDto } from 'nestjs-zod'
import { RegisterBodySchema, RegisterResponseSchema } from 'src/routers/auth/auth.model'

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}

export class RegisterResponseDTO extends createZodDto(RegisterResponseSchema) {}
