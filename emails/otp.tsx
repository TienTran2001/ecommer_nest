import { Body, Container, Head, Heading, Html, Img, Section, Text } from '@react-email/components'
import * as React from 'react'

interface OTPEmailProps {
  otpCode: string
  title: string
}

const logoUrl =
  'https://scontent-hkg1-2.xx.fbcdn.net/v/t39.30808-6/492168816_1255193163275674_6101148793039733862_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGopKPS4ftet2so0IsXgDiagpnJtqlt5QuCmcm2qW3lCze3iR7ZW-eNt-NRy1ZMt0KJE4jWVsekMyOMlx6NMwSz&_nc_ohc=ULfU1VHbyD8Q7kNvwEJq4-q&_nc_oc=AdmpyHxZOOpoLhc0Jhk44eMSNpBjMhmA1XCmYgrqa4gmJt4UXa_-2nO9thHUi6hSvCegKGG1cVNNpwb-eBTC9qrq&_nc_zt=23&_nc_ht=scontent-hkg1-2.xx&_nc_gid=QtU6MC7yFaviCaeAws-A2A&oh=00_AfUSqbxoyXYuiW9rO2NGfWfHACcsG6CrKRZCDirMkKaztA&oe=6895CEFA'

export const OTPEmail = ({ otpCode, title }: OTPEmailProps) => {
  return (
    <Html>
      <Head>
        <title>{title}</title>
      </Head>
      <Body style={main}>
        <Container style={container}>
          <Img src={logoUrl} width="212" height="88" alt="Logo" style={logo} />
          <Text style={tertiary}>Mã xác thực OTP</Text>
          <Heading style={secondary}>Hãy nhập mã xác thực OTP sau vào website</Heading>
          <Section style={codeContainer}>
            <Text style={code}>{otpCode}</Text>
          </Section>
          <Text style={paragraph}>Nếu bạn không chủ động thực hiện hành động này, xin hãy bỏ qua email?</Text>
        </Container>
      </Body>
    </Html>
  )
}

OTPEmail.PreviewProps = {
  otpCode: '144833',
  title: 'Mã OTP',
} as OTPEmailProps

export default OTPEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #eee',
  borderRadius: '5px',
  boxShadow: '0 5px 10px rgba(20,50,70,.2)',
  marginTop: '20px',
  maxWidth: '360px',
  margin: '0 auto',
  padding: '68px 0 130px',
}

const logo = {
  margin: '0 auto',
  width: '70px',
  height: '70px',
  borderRadius: '100%',
}

const tertiary = {
  color: '#0a85ea',
  fontSize: '11px',
  fontWeight: 700,
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  height: '16px',
  letterSpacing: '0',
  lineHeight: '16px',
  margin: '16px 8px 8px 8px',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
}

const secondary = {
  color: '#000',
  display: 'inline-block',
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '24px',
  marginBottom: '0',
  marginTop: '0',
  textAlign: 'center' as const,
}

const codeContainer = {
  background: 'rgba(0,0,0,.05)',
  borderRadius: '4px',
  margin: '16px auto 14px',
  verticalAlign: 'middle',
  width: '280px',
}

const code = {
  color: '#000',
  display: 'inline-block',
  fontFamily: 'HelveticaNeue-Bold',
  fontSize: '32px',
  fontWeight: 700,
  letterSpacing: '6px',
  lineHeight: '40px',
  paddingBottom: '8px',
  paddingTop: '8px',
  margin: '0 auto',
  width: '100%',
  textAlign: 'center' as const,
}

const paragraph = {
  color: '#444',
  fontSize: '15px',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  letterSpacing: '0',
  lineHeight: '23px',
  padding: '0 40px',
  margin: '0',
  textAlign: 'center' as const,
}
