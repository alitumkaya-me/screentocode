/**
 * In-Memory User Store
 * Production'da Prisma/MongoDB/PostgreSQL kullanılmalı
 * Bu sadece development ve demo için
 */

export interface User {
  id: string
  email: string
  password: string // bcrypt hashed
  name: string | null
  image: string | null
  createdAt: Date
  lastLoginAt: Date | null
  loginAttempts: number
  lockedUntil: Date | null
}

// In-memory user storage (development only)
const users: Map<string, User> = new Map()

// Rate limiting map
const loginAttempts: Map<string, { count: number; timestamp: number }> = new Map()

export const userStore = {
  /**
   * Create new user
   */
  createUser: (email: string, hashedPassword: string, name: string | null): User => {
    const user: User = {
      id: generateId(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      name: name || email.split('@')[0],
      image: null,
      createdAt: new Date(),
      lastLoginAt: null,
      loginAttempts: 0,
      lockedUntil: null,
    }
    users.set(user.id, user)
    return user
  },

  /**
   * Find user by email
   */
  findByEmail: (email: string): User | undefined => {
    const normalizedEmail = email.toLowerCase().trim()
    return Array.from(users.values()).find(u => u.email === normalizedEmail)
  },

  /**
   * Find user by ID
   */
  findById: (id: string): User | undefined => {
    return users.get(id)
  },

  /**
   * Update user's last login
   */
  updateLastLogin: (userId: string): void => {
    const user = users.get(userId)
    if (user) {
      user.lastLoginAt = new Date()
      user.loginAttempts = 0
      user.lockedUntil = null
    }
  },

  /**
   * Increment login attempts
   */
  incrementLoginAttempts: (userId: string): void => {
    const user = users.get(userId)
    if (user) {
      user.loginAttempts += 1
      
      // Lock account after 5 failed attempts for 15 minutes
      if (user.loginAttempts >= 5) {
        user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000)
      }
    }
  },

  /**
   * Check if user is locked
   */
  isUserLocked: (user: User): boolean => {
    if (!user.lockedUntil) return false
    
    if (new Date() > user.lockedUntil) {
      // Unlock user
      user.lockedUntil = null
      user.loginAttempts = 0
      return false
    }
    
    return true
  },

  /**
   * Rate limiting for login attempts by IP
   */
  checkRateLimit: (identifier: string): boolean => {
    const now = Date.now()
    const attempt = loginAttempts.get(identifier)
    
    if (!attempt) {
      loginAttempts.set(identifier, { count: 1, timestamp: now })
      return true
    }
    
    // Reset after 15 minutes
    if (now - attempt.timestamp > 15 * 60 * 1000) {
      loginAttempts.set(identifier, { count: 1, timestamp: now })
      return true
    }
    
    // Max 10 attempts per 15 minutes
    if (attempt.count >= 10) {
      return false
    }
    
    attempt.count += 1
    return true
  },

  /**
   * Get all users (admin only - for debugging)
   */
  getAllUsers: (): User[] => {
    return Array.from(users.values())
  },

  /**
   * Delete user (for testing)
   */
  deleteUser: (userId: string): boolean => {
    return users.delete(userId)
  }
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}
