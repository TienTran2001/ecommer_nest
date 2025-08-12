import { Injectable } from '@nestjs/common'
import { OTPEmail } from 'emails/otp'
import * as React from 'react'
import { Resend } from 'resend'
import envConfig from 'src/shared/config'

@Injectable()
export class EmailService {
  private resend: Resend

  constructor() {
    this.resend = new Resend(envConfig.RESEND_API_KEY)
  }

  sendOTP(payload: { email: string; code: string }) {
    return this.resend.emails.send({
      from: 'Ecommerce <onboarding@resend.dev>',
      to: [payload.email],
      subject: 'Mã OTP',
      react: <OTPEmail otpCode={payload.code} title="Mã OTP" />,
    })
  }
}
