import { Body, Controller, Post, Req } from '@nestjs/common'
import { REQUEST_USER_KEY } from 'src/shared/constants/auth.constants'
import {
  LoginBodyDTO,
  LoginResponseDTO,
  LogoutBodyDTO,
  LogoutResponseDTO,
  RefreshTokenBodyDTO,
  RefreshTokenResponseDTO,
  RegisterBodyDTO,
  RegisterResponseDTO,
} from './auth.dto'
import { AuthService } from './auth.service'

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
  async refreshToken(@Body() body: RefreshTokenBodyDTO, @Req() req: Request) {
    console.log('user: ', req[REQUEST_USER_KEY])
    const response = await this.authService.refreshToken(body.refreshToken)
    return new RefreshTokenResponseDTO(response)
  }

  @Post('logout')
  async logout(@Body() body: LogoutBodyDTO) {
    return new LogoutResponseDTO(await this.authService.logout(body.refreshToken))
  }
}
