import { Body, Controller, Ip, Post } from '@nestjs/common'
import { ZodSerializerDto } from 'nestjs-zod'
import { LoginBodyDTO, RegisterBodyDTO, RegisterResponseDTO, SendOTPBodyDTO } from 'src/routers/auth/auth.dto'
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
  async login(@Body() body: LoginBodyDTO, @UserAgent() userAgent: string, @Ip() ip: string) {
    const response = await this.authService.login({
      ...body,
      userAgent,
      ip,
    })
    return response
  }

  // @Post('refresh-token')
  // async refreshToken(@Body() body: any, @Req() req: Request) {
  //   console.log('user: ', req[REQUEST_USER_KEY])
  //   const response = await this.authService.refreshToken(body.refreshToken)
  //   return response
  // }

  // @Post('logout')
  // async logout(@Body() body: any) {
  //   return await this.authService.logout(body.refreshToken)
  // }
}
