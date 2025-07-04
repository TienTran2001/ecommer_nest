import { Body, Controller, Post, Req } from '@nestjs/common'
import { REQUEST_USER_KEY } from 'src/shared/constants/auth.constants'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    console.log('body: ', body)
    const user = await this.authService.register(body)
    return user
  }

  @Post('login')
  async login(@Body() body: any) {
    const response = await this.authService.login(body)
    return response
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: any, @Req() req: Request) {
    console.log('user: ', req[REQUEST_USER_KEY])
    const response = await this.authService.refreshToken(body.refreshToken)
    return response
  }

  @Post('logout')
  async logout(@Body() body: any) {
    return await this.authService.logout(body.refreshToken)
  }
}
