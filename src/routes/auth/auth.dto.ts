import { Exclude } from 'class-transformer'
import { IsString } from 'class-validator'
import { Match } from 'src/shared/decorators/custom-validator-decorator'

export class LoginBodyDTO {
  @IsString()
  email: string

  @IsString()
  password: string
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString()
  name: string

  @IsString()
  @Match('password', { message: 'Password does not match' })
  confirmPassword: string
}

export class LoginResponseDTO {
  accessToken: string
  refreshToken: string

  constructor(partial: Partial<LoginResponseDTO>) {
    Object.assign(this, partial)
  }
}

export class RegisterResponseDTO {
  id: number
  email: string
  name: string
  @Exclude()
  password: string
  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<RegisterResponseDTO>) {
    Object.assign(this, partial)
  }
}

export class RefreshTokenBodyDTO {
  @IsString()
  refreshToken: string
}

export class RefreshTokenResponseDTO extends LoginResponseDTO {}

export class LogoutBodyDTO extends RefreshTokenBodyDTO {}

export class LogoutResponseDTO {
  message: string

  constructor(partial: Partial<LogoutResponseDTO>) {
    Object.assign(this, partial)
  }
}
