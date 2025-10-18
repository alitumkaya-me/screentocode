/**
 * Sign Up API Route
 * Secure user registration with email/password
 */

import { NextResponse } from 'next/server'
import { userStore } from '@/lib/userStore'
import { 
  validateEmail, 
  validatePassword, 
  sanitizeEmail, 
  sanitizeString,
  hashPassword,
  getClientIp
} from '@/lib/security'

export async function POST(req: Request) {
  try {
    // Rate limiting check
    const clientIp = getClientIp(req)
    if (!userStore.checkRateLimit(`signup_${clientIp}`)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many signup attempts. Please try again later.' 
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await req.json()
    const { email, password, name } = body

    // Validate email
    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      return NextResponse.json(
        { 
          success: false, 
          error: emailValidation.error 
        },
        { status: 400 }
      )
    }

    // Validate password
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { 
          success: false, 
          error: passwordValidation.error 
        },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeEmail(email)
    const sanitizedName = name ? sanitizeString(name) : null

    // Check if user already exists
    const existingUser = userStore.findByEmail(sanitizedEmail)
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'An account with this email already exists' 
        },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const newUser = userStore.createUser(
      sanitizedEmail,
      hashedPassword,
      sanitizedName
    )

    // Return success (don't send password hash!)
    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Sign up error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred during registration' 
      },
      { status: 500 }
    )
  }
}
