import { NextRequest, NextResponse } from 'next/server'
import { userStore } from '@/lib/userStore'
import { validatePassword, sanitizeString, hashPassword, getClientIp } from '@/lib/security'
import { passwordResetStore } from '@/lib/passwordResetStore'

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    // Validate token
    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Invalid reset token' },
        { status: 400 }
      )
    }

    // Validate password
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.error || 'Password does not meet requirements' },
        { status: 400 }
      )
    }

    // Rate limiting
    const clientIp = getClientIp(request)
    const identifier = `reset_password_${clientIp}`
    if (!userStore.checkRateLimit(identifier)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Verify token
    const resetToken = passwordResetStore.verifyToken(token)
    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Find user
    const user = userStore.findByEmail(resetToken.email)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Hash new password
    const hashedPassword = await hashPassword(password)

    // Update password in userStore
    const updated = userStore.updatePassword(user.id, hashedPassword)
    
    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to update password' },
        { status: 500 }
      )
    }

    // Mark token as used
    passwordResetStore.markAsUsed(token)

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully'
    })

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
