/**
 * Email Service using Resend
 * Free tier: 3,000 emails/month, 100 emails/day
 * Sign up: https://resend.com
 */

import { Resend } from 'resend'

// Initialize Resend only if API key exists
// This prevents build errors when RESEND_API_KEY is not set
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

// Your verified sender email
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const APP_NAME = 'ScreenToCode'
const APP_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  to: string,
  resetToken: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // If no API key, fall back to console logging (development)
    if (!process.env.RESEND_API_KEY || !resend) {
      console.log('=================================')
      console.log('📧 EMAIL WOULD BE SENT (DEV MODE):')
      console.log(`To: ${to}`)
      console.log(`Reset Link: ${APP_URL}/auth/reset-password?token=${resetToken}`)
      console.log('=================================')
      return { success: true }
    }

    const resetLink = `${APP_URL}/auth/reset-password?token=${resetToken}`

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: `${APP_NAME} - Şifre Sıfırlama Talebi`,
      html: getPasswordResetEmailHTML(resetLink),
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error: error.message }
    }

    console.log('✅ Password reset email sent:', data?.id)
    return { success: true }

  } catch (error) {
    console.error('Email service error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

/**
 * HTML Email Template for Password Reset
 */
function getPasswordResetEmailHTML(resetLink: string): string {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Şifre Sıfırlama</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 40px 30px; text-align: center;">
        <div style="width: 80px; height: 80px; background: white; border-radius: 20px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
          <span style="font-size: 40px;">✨</span>
        </div>
        <h1 style="margin: 0; color: white; font-size: 28px; font-weight: bold;">ScreenToCode</h1>
        <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">AI-Powered Design to Code</p>
      </td>
    </tr>
    
    <!-- Body -->
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 24px;">Şifre Sıfırlama Talebi</h2>
        
        <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
          Merhaba,
        </p>
        
        <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
          ScreenToCode hesabınız için şifre sıfırlama talebinde bulundunuz. Aşağıdaki butona tıklayarak yeni şifrenizi belirleyebilirsiniz.
        </p>
        
        <!-- CTA Button -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
          <tr>
            <td style="text-align: center;">
              <a href="${resetLink}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: white; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);">
                Şifremi Sıfırla
              </a>
            </td>
          </tr>
        </table>
        
        <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
          Eğer buton çalışmıyorsa, aşağıdaki linki kopyalayıp tarayıcınıza yapıştırabilirsiniz:
        </p>
        
        <div style="background: #f3f4f6; border-radius: 8px; padding: 15px; margin: 0 0 20px 0; word-break: break-all;">
          <a href="${resetLink}" style="color: #8b5cf6; text-decoration: none; font-size: 13px;">
            ${resetLink}
          </a>
        </div>
        
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
            ⏱️ <strong>Önemli:</strong> Bu link 1 saat içinde geçerliliğini yitirecektir ve sadece bir kez kullanılabilir.
          </p>
        </div>
        
        <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
          Eğer bu talebi siz yapmadıysanız, bu emaili görmezden gelebilirsiniz. Şifreniz değiştirilmeyecektir.
        </p>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
          <strong>ScreenToCode</strong> - AI ile Tasarımdan Koda
        </p>
        <p style="margin: 0 0 15px 0; color: #9ca3af; font-size: 12px;">
          © 2025 ScreenToCode. Tüm hakları saklıdır.
        </p>
        <div style="margin: 15px 0 0 0;">
          <a href="${APP_URL}" style="color: #8b5cf6; text-decoration: none; font-size: 12px; margin: 0 10px;">Ana Sayfa</a>
          <span style="color: #d1d5db;">|</span>
          <a href="${APP_URL}/app" style="color: #8b5cf6; text-decoration: none; font-size: 12px; margin: 0 10px;">Dashboard</a>
          <span style="color: #d1d5db;">|</span>
          <a href="${APP_URL}/pricing" style="color: #8b5cf6; text-decoration: none; font-size: 12px; margin: 0 10px;">Fiyatlandırma</a>
        </div>
      </td>
    </tr>
  </table>
  
  <!-- Security Notice -->
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto;">
    <tr>
      <td style="text-align: center; padding: 20px;">
        <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 12px; line-height: 1.6;">
          🔒 Bu email otomatik olarak gönderilmiştir. Lütfen yanıtlamayın.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

/**
 * Send welcome email (optional)
 */
export async function sendWelcomeEmail(
  to: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY || !resend) {
      console.log('📧 Welcome email would be sent to:', to)
      return { success: true }
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: `${APP_NAME}'e Hoş Geldiniz! 🎉`,
      html: `
        <h1>Hoş Geldiniz ${name}!</h1>
        <p>ScreenToCode'a katıldığınız için teşekkür ederiz.</p>
        <p>3 ücretsiz deneme hakkınız hazır!</p>
        <a href="${APP_URL}/app">Hemen Başla</a>
      `,
    })

    if (error) {
      console.error('Welcome email error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }

  } catch (error) {
    console.error('Welcome email service error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}
