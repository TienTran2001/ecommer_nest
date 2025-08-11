import { Body, Controller, HttpCode, HttpStatus, Ip, Post } from '@nestjs/common'
import { ZodSerializerDto } from 'nestjs-zod'
import {
  LoginBodyDTO,
  LoginResponseDTO,
  RefreshTokenBodyDTO,
  RefreshTokenResDTO,
  RegisterBodyDTO,
  RegisterResponseDTO,
  SendOTPBodyDTO,
} from 'src/routers/auth/auth.dto'
import { UserAgent } from 'src/shared/decorators/user-agent-decorator'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ZodSerializerDto(RegisterResponseDTO)
  async register(@Body() body: RegisterBodyDTO) {
    const user = await this.authService.register(body)
    return user
  }

  @Post('otp')
  sendOTP(@Body() body: SendOTPBodyDTO) {
    return this.authService.sendOTP(body)
  }

  @Post('login')
  @ZodSerializerDto(LoginResponseDTO)
  async login(@Body() body: LoginBodyDTO, @UserAgent() userAgent: string, @Ip() ip: string) {
    const response = await this.authService.login({
      ...body,
      userAgent,
      ip,
    })
    return response
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(RefreshTokenResDTO)
  refreshToken(@Body() body: RefreshTokenBodyDTO, @UserAgent() userAgent: string, @Ip() ip: string) {
    return this.authService.refreshToken({
      refreshToken: body.refreshToken,
      userAgent,
      ip,
    })
  }

  // @Post('logout')
  // async logout(@Body() body: any) {
  //   return await this.authService.logout(body.refreshToken)
  // }
}
