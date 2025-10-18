import { NextRequest, NextResponse } from 'next/server'
import { userStore } from '@/lib/userStore'
import { validateEmail, sanitizeEmail, getClientIp } from '@/lib/security'
import { passwordResetStore } from '@/lib/passwordResetStore'
import { sendPasswordResetEmail } from '@/lib/email'

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
      
      // Send password reset email
      const emailResult = await sendPasswordResetEmail(sanitizedEmail, token)
      
      if (!emailResult.success) {
        console.error('Failed to send password reset email:', emailResult.error)
        // Don't reveal error to user for security
      }
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
