// Screens/Auth/LoginScreen.js
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthProvider";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });

  const validateInputs = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = "Invalid email address";
      valid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return valid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setErrors({ email: "", password: "", general: "" });

    try {
      const response = await fetch("http://10.58.28.247:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const newErrors = { email: "", password: "", general: "" };
        if (data.error) newErrors.general = data.error;
        setErrors(newErrors);
      } else {
        const userObj = data.user || data; 
        await loginUser(userObj, rememberMe);

        // Navigate immediately without popup
        navigation.replace("MainScreen");
      }
    } catch (err) {
      setErrors(prev => ({ ...prev, general: "Unable to connect to server" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={stylesheet.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <Text style={stylesheet.title}>Welcome back{"\n"}To Rwandai</Text>
        <Text style={stylesheet.subtitle}>Enter your login credentials to continue</Text>

        {/* Email */}
        <TextInput
          style={{
            ...stylesheet.input,
            borderColor: errors.email ? "red" : "#555",
            marginBottom: errors.email ? 5 : 20,
          }}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={stylesheet.errorText}>{errors.email}</Text>}

        {/* Password */}
        <View
          style={{
            ...stylesheet.passwordContainer,
            borderColor: errors.password ? "red" : "#555",
            marginBottom: errors.password ? 5 : 20,
          }}
        >
          <TextInput
            style={stylesheet.passwordInput}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: "" });
            }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#999" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={stylesheet.errorText}>{errors.password}</Text>}

        {/* Remember Me + Forgot Password */}
        <View style={stylesheet.rememberForgotRow}>
          <TouchableOpacity style={stylesheet.rememberContainer} onPress={() => setRememberMe(!rememberMe)}>
            <View style={{ ...stylesheet.checkbox, ...(rememberMe && stylesheet.checkboxChecked) }}>
              {rememberMe && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            <Text style={stylesheet.rememberText}>Remember Me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotScreen")}>
            <Text style={stylesheet.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* General Errors */}
        {errors.general ? <Text style={stylesheet.errorText}>{errors.general}</Text> : null}

        {/* Login Button */}
        <TouchableOpacity
          style={{ ...stylesheet.loginButton, opacity: email && password ? 1 : 0.3 }}
          disabled={!email || !password || loading}
          onPress={handleLogin}
        >
          {loading ? <ActivityIndicator color="#121212" /> : <Text style={stylesheet.loginText}>Login</Text>}
        </TouchableOpacity>

        {/* OR Separator */}
        <View style={stylesheet.orContainer}>
          <View style={stylesheet.line} />
          <Text style={stylesheet.orText}>OR</Text>
          <View style={stylesheet.line} />
        </View>

        {/* Social Buttons */}
        <TouchableOpacity style={stylesheet.socialButton} onPress={() => console.log("Google Login")}>
          <Image source={require("../../assets/google.png")} style={stylesheet.socialIcon} />
          <Text style={stylesheet.socialText}>Login with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesheet.socialButton} onPress={() => console.log("Apple Login")}>
          <Image source={require("../../assets/appl.png")} style={stylesheet.socialIcon} />
          <Text style={stylesheet.socialText}>Login with Apple</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={stylesheet.signupRow}>
          <Text style={{ color: "#999" }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const stylesheet = {
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 20, paddingTop: 60 },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#999", marginBottom: 25, lineHeight: 22 },
  input: { borderWidth: 1, borderColor: "#555", borderRadius: 10, paddingHorizontal: 15, paddingVertical: 14, color: "#fff", height: 50 },
  passwordContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#555", borderRadius: 10, paddingHorizontal: 15, height: 50 },
  passwordInput: { flex: 1, color: "#fff", height: "100%" },
  rememberForgotRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  rememberContainer: { flexDirection: "row", alignItems: "center" },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: "#fff", justifyContent: "center", alignItems: "center", marginRight: 10 },
  checkboxChecked: { backgroundColor: "#222" },
  rememberText: { color: "#fff", flexShrink: 1 },
  forgotText: { color: "#acacac", fontSize: 14 },
  loginButton: { backgroundColor: "#fff", borderRadius: 10, alignItems: "center", justifyContent: "center", height: 50, marginBottom: 15 },
  loginText: { color: "#121212", fontSize: 16, fontWeight: "bold" },
  errorText: { color: "red", fontSize: 12, marginBottom: 15 },
  orContainer: { flexDirection: "row", alignItems: "center", marginVertical: 15 },
  line: { flex: 1, height: 1, backgroundColor: "#555" },
  orText: { color: "#fff", marginHorizontal: 10 },
  socialButton: { backgroundColor: "#222", borderWidth: 1, borderColor: "#555", flexDirection: "row", alignItems: "center", borderRadius: 10, height: 50, marginBottom: 10 },
  socialIcon: { width: 22, height: 24, marginLeft: 10 },
  socialText: { color: "#fff", fontSize: 16, fontWeight: "bold", flex: 1, textAlign: "center", marginRight: 32 },
  signupRow: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
};
