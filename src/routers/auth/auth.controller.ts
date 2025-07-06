import { Body, Controller, Post } from '@nestjs/common'
import { ZodSerializerDto } from 'nestjs-zod'
import { RegisterBodyDTO, RegisterResponseDTO } from 'src/routers/auth/auth.dto'
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

  // @Post('login')
  // async login(@Body() body: any) {
  //   const response = await this.authService.login(body)
  //   return response
  // }

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
