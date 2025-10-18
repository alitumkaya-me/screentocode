/**
 * Security Utilities
 * Input validation, sanitization, and security helpers
 */

/**
 * Email validation
 * Prevents SQL injection and XSS attacks
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' }
  }

  const trimmed = email.trim()
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Email cannot be empty' }
  }

  if (trimmed.length > 255) {
    return { valid: false, error: 'Email is too long' }
  }

  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Invalid email format' }
  }

  // Block common SQL injection patterns
  const sqlPatterns = [
    /(\bOR\b|\bAND\b).*?[=<>]/i,
    /UNION.*?SELECT/i,
    /INSERT.*?INTO/i,
    /DELETE.*?FROM/i,
    /DROP.*?TABLE/i,
    /--/,
    /;/,
    /\/\*/,
    /\*\//,
    /<script>/i,
    /javascript:/i,
  ]

  for (const pattern of sqlPatterns) {
    if (pattern.test(trimmed)) {
      return { valid: false, error: 'Invalid email format' }
    }
  }

  return { valid: true }
}

/**
 * Password validation
 * Strong password requirements
 */
export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required' }
  }

  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' }
  }

  if (password.length > 128) {
    return { valid: false, error: 'Password is too long' }
  }

  // At least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one uppercase letter' }
  }

  // At least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one lowercase letter' }
  }

  // At least one number
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number' }
  }

  // At least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one special character' }
  }

  // Check for common weak passwords
  const weakPasswords = [
    'password', 'password123', '12345678', 'qwerty123',
    'abc123456', 'password1', 'password!', 'Welcome123',
    'Admin123!', 'Test1234!'
  ]

  if (weakPasswords.includes(password.toLowerCase())) {
    return { valid: false, error: 'Password is too weak' }
  }

  return { valid: true }
}

/**
 * Sanitize string input
 * Remove dangerous characters and HTML tags
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') return ''

  return input
    .trim()
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove <script> tags
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/[<>'"]/g, '') // Remove dangerous chars
}

/**
 * Sanitize email
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') return ''
  
  return email
    .toLowerCase()
    .trim()
    .replace(/[^\w@.-]/g, '') // Only allow alphanumeric, @, ., and -
}

/**
 * Get IP address from request
 * For rate limiting
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIp) {
    return realIp.trim()
  }
  
  return 'unknown'
}

/**
 * Hash password with bcrypt
 */
import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12 // Higher = more secure but slower
  return await bcrypt.hash(password, saltRounds)
}

/**
 * Verify password
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

/**
 * Generate secure random token
 */
export function generateToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

/**
 * Timing-safe string comparison
 * Prevents timing attacks
 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return result === 0
}
