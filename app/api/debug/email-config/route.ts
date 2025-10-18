import { NextRequest, NextResponse } from 'next/server'

/**
 * Debug endpoint to check email configuration
 */
export async function GET(request: NextRequest) {
  try {
    const hasApiKey = !!process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Test if Resend is working
    let resendStatus = 'Not configured'
    if (hasApiKey) {
      resendStatus = 'Configured ✅'
    } else {
      resendStatus = 'Missing API key (console mode) 📝'
    }

    return NextResponse.json({
      success: true,
      emailConfig: {
        resendStatus,
        hasApiKey,
        fromEmail,
        baseUrl,
        mode: hasApiKey ? 'Production (real emails)' : 'Development (console only)'
      },
      instructions: {
        step1: 'Go to https://resend.com and sign up',
        step2: 'Create API key at https://resend.com/api-keys',
        step3: 'Add to .env.local: RESEND_API_KEY=re_your_key_here',
        step4: 'Restart server: taskkill /F /IM node.exe && npm run dev',
        step5: 'Test forgot password again'
      },
      quickTest: {
        url: `${baseUrl}/api/debug/test-email`,
        method: 'POST',
        body: { email: 'your@email.com' }
      }
    })

  } catch (error) {
    console.error('Email debug error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
