import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  // Restore session from LocalStorage
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('resumify_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('resumify_token') || null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [geminiStatus, setGeminiStatus] = useState({ configured: false, model: 'gemini-3.1-flash-lite' });

  // Sync token with axios headers and LocalStorage
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        localStorage.setItem('resumify_token', token);
      } catch {}
    } else {
      delete axios.defaults.headers.common['Authorization'];
      try {
        localStorage.removeItem('resumify_token');
      } catch {}
    }
  }, [token]);

  // Sync user with LocalStorage
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('resumify_user', JSON.stringify(user));
      } catch {}
    } else {
      try {
        localStorage.removeItem('resumify_user');
      } catch {}
    }
  }, [user]);

  // Check backend health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await axios.get(`${API_BASE}/health`);
        if (res.data?.gemini) {
          setGeminiStatus(res.data.gemini);
        }
      } catch (err) {
        // Backend health probe
      }
    };
    checkHealth();
  }, []);

  // Register with LocalStorage persistence + backend API sync
  const register = async (name, email, password) => {
    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name.trim();

    if (!cleanName || !cleanEmail || !password) {
      return { success: false, message: 'All fields are required.' };
    }
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    try {
      // 1. Check existing accounts in LocalStorage
      const localUsers = JSON.parse(localStorage.getItem('resumify_registered_users') || '[]');
      const userExists = localUsers.some(u => u.email.toLowerCase() === cleanEmail);

      if (userExists) {
        return {
          success: false,
          message: 'An account with this email address already exists. Please sign in.',
        };
      }

      // 2. Try registering with backend
      let sessionToken = 'resumify_tok_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
      let userData = {
        id: 'usr_' + Date.now(),
        name: cleanName,
        email: cleanEmail,
        createdAt: new Date().toISOString(),
      };

      try {
        const backendRes = await axios.post(`${API_BASE}/auth/register`, {
          name: cleanName,
          email: cleanEmail,
          password,
        });

        if (backendRes.data && backendRes.data.success) {
          sessionToken = backendRes.data.token || sessionToken;
          userData = backendRes.data.user || userData;
        }
      } catch (apiErr) {
        // If backend storage is offline, fallback seamlessly to LocalStorage
      }

      // 3. Save new user to LocalStorage accounts repository
      const newUserRecord = {
        ...userData,
        password, // stored locally for credential comparison
      };
      localStorage.setItem('resumify_registered_users', JSON.stringify([...localUsers, newUserRecord]));

      // 4. Update session state
      setToken(sessionToken);
      setUser(userData);

      return { success: true };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, message: err.message || 'Registration failed.' };
    }
  };

  // Login with LocalStorage verification + backend API sync
  const login = async (email, password) => {
    const cleanEmail = email.toLowerCase().trim();

    if (!cleanEmail || !password) {
      return { success: false, message: 'Please provide both email and password.' };
    }

    try {
      // 1. Verify credentials against LocalStorage accounts
      const localUsers = JSON.parse(localStorage.getItem('resumify_registered_users') || '[]');
      const localMatch = localUsers.find(
        u => u.email.toLowerCase() === cleanEmail && u.password === password
      );

      let sessionToken = 'resumify_tok_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
      let userData = null;

      if (localMatch) {
        userData = {
          id: localMatch.id,
          name: localMatch.name,
          email: localMatch.email,
          createdAt: localMatch.createdAt,
        };
      }

      // 2. Attempt backend authentication
      try {
        const backendRes = await axios.post(`${API_BASE}/auth/login`, {
          email: cleanEmail,
          password,
        });

        if (backendRes.data && backendRes.data.success) {
          sessionToken = backendRes.data.token || sessionToken;
          userData = backendRes.data.user || userData;
        }
      } catch (apiErr) {
        // If backend database is offline, proceed with local verification
      }

      // 3. If neither matched
      if (!userData && !localMatch) {
        return {
          success: false,
          message: 'Invalid email or password. Please check your credentials or create an account.',
        };
      }

      // 4. Update session
      setToken(sessionToken);
      setUser(userData || localMatch);

      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: err.message || 'Login failed.' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem('resumify_token');
      localStorage.removeItem('resumify_user');
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        geminiStatus,
        login,
        register,
        logout,
        isAuthenticated: Boolean(user && token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
