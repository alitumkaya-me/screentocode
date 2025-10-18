import { NextRequest, NextResponse } from 'next/server'
import { userStore } from '@/lib/userStore'
import { validateEmail, sanitizeEmail, getClientIp } from '@/lib/security'
import { passwordResetStore } from '@/lib/passwordResetStore'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      return NextResponse.json(
        { error: emailValidation.error || 'Invalid email format' },
        { status: 400 }
      )
    }

    // Sanitize email
    const sanitizedEmail = sanitizeEmail(email)

    // Rate limiting
    const clientIp = getClientIp(request)
    const identifier = `forgot_password_${clientIp}`
    if (!userStore.checkRateLimit(identifier)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Check if user exists
    const user = userStore.findByEmail(sanitizedEmail)
    
    // Always return success (security: don't reveal if email exists)
    // But only send email if user exists
    if (user) {
      // Generate reset token
      const token = passwordResetStore.createToken(sanitizedEmail)
      
      // In production, send email with reset link
      // For development, we'll just log it
      const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`
      
      console.log('=================================')
      console.log('PASSWORD RESET LINK (DEV MODE):')
      console.log(`Email: ${sanitizedEmail}`)
      console.log(`Link: ${resetLink}`)
      console.log('=================================')
      
      // TODO: Production - Send email
      // await sendEmail({
      //   to: sanitizedEmail,
      //   subject: 'Reset Your Password',
      //   html: `Click here to reset your password: <a href="${resetLink}">${resetLink}</a>`
      // })
    }

    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, you will receive a password reset link.'
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
