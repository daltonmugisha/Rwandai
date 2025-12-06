import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user session on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
      } catch (err) {
        console.log("AuthProvider error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const loginUser = async (userData, rememberMe = false) => {
    setUser(userData);
    if (rememberMe) {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logoutUser = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
