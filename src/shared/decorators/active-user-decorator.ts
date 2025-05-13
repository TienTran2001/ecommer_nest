import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { REQUEST_USER_KEY } from 'src/shared/constants/auth.constants'
import { JwtPayload } from 'src/shared/types/jwt.type'

export const ActiveUser = createParamDecorator((field: keyof JwtPayload | undefined, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  const user: JwtPayload | undefined = request[REQUEST_USER_KEY] // request.user
  return field ? user?.[field] : user
})
