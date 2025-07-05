import { Module } from '@nestjs/common'
import { AuthController } from 'src/routers/auth/auth.controller'
import { AuthService } from 'src/routers/auth/auth.service'
import { RolesService } from 'src/routers/auth/roles.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, RolesService],
})
export class AuthModule {}
