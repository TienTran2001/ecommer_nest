import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common'
import { addMilliseconds } from 'date-fns'
import ms from 'ms'
import { RegisterBodyType, SendOTPBodyType } from 'src/routers/auth/auth.model'
import { AuthRepository } from 'src/routers/auth/auth.repo'
import { RolesService } from 'src/routers/auth/roles.service'
import envConfig from 'src/shared/config'
import { TypeOfVerificationCode } from 'src/shared/constants/auth.constants'
import { generateOTP } from 'src/shared/helpers'
import { SharedUserRepository } from 'src/shared/repositories/shared-user.repo'
import { EmailService } from 'src/shared/services/email.service'
import { HashingService } from 'src/shared/services/hashing.service'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(
    private readonly hashingService: HashingService,
    private readonly roleService: RolesService,
    private readonly authRepository: AuthRepository,
    private readonly sharedUserRepository: SharedUserRepository,
    private readonly emailService: EmailService,
  ) {}

  async register(body: RegisterBodyType) {
    const verificationCode = await this.authRepository.findUniqueVerificationCode({
      email: body.email,
      code: body.code,
      type: TypeOfVerificationCode.REGISTER,
    })
    if (!verificationCode) {
      throw new UnprocessableEntityException([
        {
          path: 'code',
          message: 'Invalid OTP code',
        },
      ])
    }

    if (verificationCode.expiresAt < new Date()) {
      throw new UnprocessableEntityException([
        {
          path: 'code',
          message: 'OTP code has expired',
        },
      ])
    }
    const clientRoleId = await this.roleService.getClientRoleId()
    const hashedPassword = await this.hashingService.hash(body.password)
    return this.authRepository.createUser({
      email: body.email,
      name: body.name,
      phoneNumber: body.phoneNumber,
      password: hashedPassword,
      roleId: clientRoleId,
    })
  }

  async sendOTP(body: SendOTPBodyType) {
    // 1. check if email is exist
    const existingUser = await this.sharedUserRepository.findUnique({ email: body.email })
    this.logger.debug(`Existing user: ${JSON.stringify(existingUser)}`)
    if (existingUser) {
      throw new UnprocessableEntityException([
        // error code 422
        {
          path: 'email',
          message: 'Email is already exist',
        },
      ])
    }
    // 2. create otp
    const code = generateOTP()
    const verificationCode = await this.authRepository.createVerificationCode({
      email: body.email,
      code,
      type: body.type,
      expiresAt: addMilliseconds(new Date(), ms(envConfig.OTP_EXPIRES_IN)),
    })

    const { error } = await this.emailService.sendOTP({ email: body.email, code })
    if (error) {
      throw new UnprocessableEntityException([
        {
          path: 'code',
          message: 'Failed to send OTP code',
        },
      ])
    }
    return verificationCode
  }

  // async login(body: any) {
  //   const userExists = await this.prismaService.user.findUnique({
  //     where: {
  //       email: body.email,
  //     },
  //   })

  //   if (!userExists) {
  //     throw new UnauthorizedException('Account is not exist')
  //   }

  //   const isPasswordValid = await this.hashingService.compare(body.password, userExists.password)

  //   if (!isPasswordValid) {
  //     throw new UnprocessableEntityException([
  //       {
  //         field: 'password',
  //         message: 'Password is incorrect',
  //       },
  //     ])
  //   }

  //   const tokens = await this.generateTokens({ userId: userExists.id.toString() })

  //   return tokens
  // }

  // async generateTokens(payload: { userId: string }) {
  //   const [accessToken, refreshToken] = await Promise.all([
  //     this.tokenService.signAccessToken(payload),
  //     this.tokenService.signRefreshToken(payload),
  //   ])

  //   const decodeRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)
  //   await this.prismaService.refreshToken.create({
  //     data: {
  //       token: refreshToken,
  //       userId: Number(payload.userId),
  //       expiresAt: new Date(decodeRefreshToken.exp * 1000),
  //     },
  //   })

  //   return {
  //     accessToken,
  //     refreshToken,
  //   }
  // }

  // async refreshToken(refreshToken: string) {
  //   try {
  //     // step 1: verify refresh token
  //     const { userId } = await this.tokenService.verifyRefreshToken(refreshToken)

  //     // step 2: check refresh token is exist in db
  //     await this.prismaService.refreshToken.findUniqueOrThrow({
  //       where: {
  //         token: refreshToken,
  //       },
  //     })

  //     // step 3: remove refresh token from db
  //     await this.prismaService.refreshToken.delete({
  //       where: {
  //         token: refreshToken,
  //       },
  //     })

  //     // step 4: generate new tokens
  //     return await this.generateTokens({ userId })
  //   } catch (error) {
  //     if (isNotFoundPrismaError(error)) {
  //       throw new UnauthorizedException('Refresh token has been revoked')
  //     }
  //     throw new UnauthorizedException()
  //   }
  // }

  // async logout(refreshToken: string) {
  //   try {
  //     // step 1: verify refresh token
  //     await this.tokenService.verifyRefreshToken(refreshToken)

  //     // step 2: remove refresh token from db
  //     await this.prismaService.refreshToken.delete({
  //       where: {
  //         token: refreshToken,
  //       },
  //     })

  //     return { message: 'Logout successfully' }
  //   } catch (error) {
  //     if (isNotFoundPrismaError(error)) {
  //       throw new UnauthorizedException('Refresh token has been revoked')
  //     }
  //     throw new UnauthorizedException()
  //   }
  // }
}
