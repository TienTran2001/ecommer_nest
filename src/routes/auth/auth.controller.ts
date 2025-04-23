import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import {
  LoginBodyDTO,
  LoginResponseDTO,
  RefreshTokenBodyDTO,
  RefreshTokenResponseDTO,
  RegisterBodyDTO,
  RegisterResponseDTO,
} from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterBodyDTO) {
    const user = await this.authService.register(body)
    return new RegisterResponseDTO(user)
  }

  @Post('login')
  async login(@Body() body: LoginBodyDTO) {
    const response = await this.authService.login(body)
    return new LoginResponseDTO(response)
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenBodyDTO) {
    const response = await this.authService.refreshToken(body.refreshToken)
    return new RefreshTokenResponseDTO(response)
  }
}
