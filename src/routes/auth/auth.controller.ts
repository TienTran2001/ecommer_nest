import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginBodyDTO, RegisterBodyDTO, RegisterResponseDTO } from './auth.dto'

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
    return this.authService.login(body)
  }
}
