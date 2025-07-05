import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ZodSerializerInterceptor } from 'nestjs-zod'
import { AppService } from 'src/app.service'
import { AuthModule } from 'src/routers/auth/auth.module'
import CustomZodValidationPipe from 'src/shared/pipes/custom-zod-validation-pipe'
import { SharedModule } from 'src/shared/shared.module'
import { AppController } from './app.controller'

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: CustomZodValidationPipe,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
})
export class AppModule {}
