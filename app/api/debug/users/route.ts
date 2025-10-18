import { NextRequest, NextResponse } from 'next/server'
import { userStore } from '@/lib/userStore'

/**
 * Debug endpoint to list registered users
 * Remove in production!
 */
export async function GET(request: NextRequest) {
  try {
    // Get all users
    const users = userStore.getAllUsers()

    // Return sanitized user list (no passwords)
    const sanitizedUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      loginAttempts: user.loginAttempts,
      isLocked: userStore.isUserLocked(user)
    }))

    return NextResponse.json({
      success: true,
      count: sanitizedUsers.length,
      users: sanitizedUsers,
      message: '⚠️ This is a debug endpoint. Remove in production!'
    })

  } catch (error) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
