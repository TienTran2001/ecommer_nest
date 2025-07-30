import { createZodDto } from 'nestjs-zod'
import { RegisterBodySchema, RegisterResponseSchema, SendOTPBodySchema } from 'src/routers/auth/auth.model'

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}

export class RegisterResponseDTO extends createZodDto(RegisterResponseSchema) {}

export class SendOTPBodyDTO extends createZodDto(SendOTPBodySchema) {}
