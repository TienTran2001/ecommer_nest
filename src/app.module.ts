import { Module } from '@nestjs/common'
import { AppService } from 'src/app.service'
import { SharedModule } from 'src/shared/shared.module'
import { AppController } from './app.controller'

@Module({
  imports: [SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
