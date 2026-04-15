import { createContext, useContext, useState, useEffect } from 'react'
import { USERS } from '../data/seed'

const AuthContext = createContext(null)

const STORAGE_KEY = 'nkabom_auth'
const USERS_KEY = 'nkabom_users'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [allUsers, setAllUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(USERS_KEY)
      return saved ? JSON.parse(saved) : USERS
    } catch {
      return USERS
    }
  })

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(allUsers))
  }, [allUsers])

  const login = (role) => {
    const profile = allUsers.find(u => u.role === role)
    if (!profile) return false
    setUser(profile)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    return true
  }

  const loginWithUser = (userData) => {
    setUser(userData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
  }

  const register = (newUser) => {
    const userWithDefaults = {
      ...newUser,
      id: newUser.id || `user-${Date.now()}`,
      joinedAt: newUser.joinedAt || new Date().toISOString().split('T')[0],
      totalDonated: newUser.totalDonated || 0,
      totalRaised: newUser.totalRaised || 0,
      campaigns: newUser.campaigns || [],
      donations: newUser.donations || [],
    }
    setAllUsers(prev => [...prev, userWithDefaults])
    setUser(userWithDefaults)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithDefaults))
    return userWithDefaults
  }

  const updateUser = (userId, updates) => {
    setUser(prev => {
      if (prev && prev.id === userId) {
        const updated = { ...prev, ...updates }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      }
      return prev
    })
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const switchRole = (role) => {
    login(role)
  }

  const getAllUsers = () => allUsers

  const getUserById = (id) => allUsers.find(u => u.id === id)

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser,
      login, 
      loginWithUser,
      logout, 
      switchRole, 
      register,
      updateUser,
      getAllUsers,
      getUserById,
      isLoggedIn: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
