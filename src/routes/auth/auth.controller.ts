import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { REQUEST_USER_KEY } from 'src/shared/constants/auth.constants'
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'
import {
  LoginBodyDTO,
  LoginResponseDTO,
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

  @UseGuards(AccessTokenGuard)
  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenBodyDTO, @Req() req: Request) {
    console.log('user: ', req[REQUEST_USER_KEY])
    const response = await this.authService.refreshToken(body.refreshToken)
    return new RefreshTokenResponseDTO(response)
  }
}
