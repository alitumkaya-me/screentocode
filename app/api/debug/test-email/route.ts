import { NextRequest, NextResponse } from 'next/server'
import { sendPasswordResetEmail } from '@/lib/email'

/**
 * Debug endpoint to test email sending
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Generate test token
    const testToken = 'test_' + Math.random().toString(36).substring(7)

    // Try to send email
    const result = await sendPasswordResetEmail(email, testToken)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email sent successfully! Check your inbox (and spam folder)',
        mode: process.env.RESEND_API_KEY ? 'Production (real email sent)' : 'Development (check console)',
        testResetLink: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${testToken}`
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error,
        message: 'Failed to send email. Check console for details.'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      { 
        error: 'An error occurred',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
