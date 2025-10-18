/**
 * Password Reset Token Store
 * In-memory storage for password reset tokens
 * Production: Replace with database (Prisma/MongoDB)
 */

export interface PasswordResetToken {
  email: string
  token: string
  expiresAt: Date
  used: boolean
}

class PasswordResetStore {
  private tokens: Map<string, PasswordResetToken> = new Map()

  /**
   * Generate a secure random token
   */
  generateToken(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let token = ''
    for (let i = 0; i < 32; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return token
  }

  /**
   * Create a password reset token
   */
  createToken(email: string): string {
    const token = this.generateToken()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    this.tokens.set(token, {
      email,
      token,
      expiresAt,
      used: false
    })

    return token
  }

  /**
   * Verify and get token
   */
  verifyToken(token: string): PasswordResetToken | null {
    const resetToken = this.tokens.get(token)

    if (!resetToken) {
      return null
    }

    // Check if expired
    if (new Date() > resetToken.expiresAt) {
      this.tokens.delete(token)
      return null
    }

    // Check if already used
    if (resetToken.used) {
      return null
    }

    return resetToken
  }

  /**
   * Mark token as used
   */
  markAsUsed(token: string): void {
    const resetToken = this.tokens.get(token)
    if (resetToken) {
      resetToken.used = true
    }
  }

  /**
   * Delete token
   */
  deleteToken(token: string): void {
    this.tokens.delete(token)
  }

  /**
   * Cleanup expired tokens (call periodically)
   */
  cleanupExpired(): void {
    const now = new Date()
    for (const [token, data] of this.tokens.entries()) {
      if (now > data.expiresAt || data.used) {
        this.tokens.delete(token)
      }
    }
  }
}

export const passwordResetStore = new PasswordResetStore()

// Cleanup expired tokens every 15 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    passwordResetStore.cleanupExpired()
  }, 15 * 60 * 1000)
}
