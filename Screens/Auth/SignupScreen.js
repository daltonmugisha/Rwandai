// Screens/Auth/SignupScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", email: "", password: "", general: "" });

  const validateInputs = () => {
    let valid = true;
    const newErrors = { username: "", email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // Username validation
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      newErrors.username = "Username is required";
      valid = false;
    } else if (trimmedUsername.length < 8 || trimmedUsername.length > 20) {
      newErrors.username = "Username must be 8–20 characters";
      valid = false;
    }

    // Email validation
    if (!emailRegex.test(email.trim())) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    // Password validation
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase, number & special char";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (!agreeTerms) {
      setErrors(prev => ({ ...prev, general: "You must accept the Terms and Conditions" }));
      return;
    }

    if (!validateInputs()) return;

    setLoading(true);

    try {
      const response = await fetch("http://10.58.28.247:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim() || "unknown", // safety fallback
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const newErrors = { username: "", email: "", password: "", general: "" };
        if (data.error) {
          if (data.error.toLowerCase().includes("username")) newErrors.username = data.error;
          else if (data.error.toLowerCase().includes("email")) newErrors.email = data.error;
          else if (data.error.toLowerCase().includes("password")) newErrors.password = data.error;
          else newErrors.general = data.error;
        }
        setErrors(newErrors);
      } else {
        navigation.replace("SuccessScreen", { username: username.trim(), email: email.trim() });
      }
    } catch (err) {
      setErrors(prev => ({ ...prev, general: "Unable to connect to the server" }));
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
        <Text style={stylesheet.title}>Create your{"\n"}Rwandai account</Text>
        <Text style={stylesheet.subtitle}>
          Please fill in your details below {"\n"}to get started with Rwai
        </Text>

        {/* Username */}
        <TextInput
          style={{
            ...stylesheet.input,
            borderColor: errors.username ? "red" : "#555",
            marginBottom: errors.username ? 5 : 20,
          }}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={text => {
            setUsername(text);
            if (errors.username) setErrors({ ...errors, username: "" });
          }}
        />
        {errors.username && <Text style={stylesheet.errorText}>{errors.username}</Text>}

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

        {/* Terms */}
        <TouchableOpacity style={stylesheet.termsContainer} onPress={() => setAgreeTerms(!agreeTerms)}>
          <View style={{ ...stylesheet.checkbox, ...(agreeTerms && stylesheet.checkboxChecked) }}>
            {agreeTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={stylesheet.termsText}>
            By signing up, you agree to our <Text style={stylesheet.linkText}>Terms and Conditions</Text>
          </Text>
        </TouchableOpacity>

        {/* Signup Button */}
        <TouchableOpacity
          style={{ ...stylesheet.signupButton, opacity: username && email && password && agreeTerms ? 1 : 0.3 }}
          disabled={!(username && email && password && agreeTerms) || loading}
          onPress={handleSignup}
        >
          {loading ? <ActivityIndicator color="#121212" /> : <Text style={stylesheet.signupText}>Sign Up</Text>}
        </TouchableOpacity>
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
  termsContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: "#fff", justifyContent: "center", alignItems: "center", marginRight: 10 },
  checkboxChecked: { backgroundColor: "#121212" },
  termsText: { color: "#fff", flexShrink: 1 },
  linkText: { color: "#acacac", textDecorationLine: "underline" },
  signupButton: { backgroundColor: "#fff", borderRadius: 10, alignItems: "center", justifyContent: "center", height: 50, marginBottom: 15 },
  signupText: { color: "#121212", fontSize: 16, fontWeight: "bold" },
  errorText: { color: "red", fontSize: 12, marginBottom: 15 },
};
