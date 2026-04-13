import { createContext, useContext, useState, useEffect } from 'react';
import { USERS } from '../data/seed';

const AuthContext = createContext(null);

const ROLE_USERS = {
  user:    USERS.find(u => u.role === 'user'),
  agent:   USERS.find(u => u.role === 'agent'),
  company: USERS.find(u => u.role === 'company'),
  admin:   USERS.find(u => u.role === 'admin'),
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ghcrowd_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (role) => {
    const profile = ROLE_USERS[role];
    if (!profile) return;
    setUser(profile);
    localStorage.setItem('ghcrowd_user', JSON.stringify(profile));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ghcrowd_user');
  };

  const switchRole = (role) => {
    login(role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
