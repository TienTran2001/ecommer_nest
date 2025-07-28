import { ConflictException, Injectable } from '@nestjs/common'
import { RegisterBodyType, VerificationCodeType } from 'src/routers/auth/auth.model'
import { isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { UserType } from 'src/shared/models/shared-user-model'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(
    user: Omit<RegisterBodyType, 'confirmPassword'> & Pick<UserType, 'roleId'>,
  ): Promise<Omit<UserType, 'password' | 'totpSecret'>> {
    try {
      const res = await this.prismaService.user.create({
        data: user,
        omit: {
          password: true,
          totpSecret: true,
        },
      })
      return res
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw new ConflictException('Email already exists')
      }
      throw error
    }
  }

  async createVerificationCode(
    payload: Pick<VerificationCodeType, 'email' | 'type' | 'code' | 'expiresAt'>,
  ): Promise<VerificationCodeType> {
    return this.prismaService.verificationCode.upsert({
      where: {
        email: payload.email,
      },
      create: payload,
      update: {
        code: payload.code,
        expiresAt: payload.expiresAt,
      },
    })
  }
}
