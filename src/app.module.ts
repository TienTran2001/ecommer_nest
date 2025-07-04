import { Module } from '@nestjs/common'
import { AppService } from 'src/app.service'
import { AuthModule } from 'src/routers/auth/auth.module'
import { SharedModule } from 'src/shared/shared.module'
import { AppController } from './app.controller'

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
