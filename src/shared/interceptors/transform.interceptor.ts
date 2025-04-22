import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Response } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Res<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Res<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Res<T>> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp()
        const response = ctx.getResponse<Response>()
        const statusCode = response.statusCode

        return {
          statusCode,
          data,
        }
      }),
    )
  }
}
