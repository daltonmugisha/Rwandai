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

// ... Keep all your imports

export default function SignupScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [popupMsg, setPopupMsg] = useState("");

  const validateInputs = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!emailRegex.test(email.trim())) {
      newErrors.email = "Invalid email address";
      valid = false;
    }
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
      const response = await fetch("http://10.175.143.247:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const newErrors = { email: "", password: "", general: "" };
        if (data.error) {
          if (data.error.toLowerCase().includes("email")) newErrors.email = data.error;
          else if (data.error.toLowerCase().includes("password")) newErrors.password = data.error;
          else newErrors.general = data.error;
        }
        setErrors(newErrors);
      } else {
        // Registration success message
        setPopupMsg(
          "your account has been Registered successful!\nYou are being redirected to the login screen..."
        );
        setTimeout(() => {
          setPopupMsg("");
          navigation.navigate("LoginScreen");
        }, 2000); // 2 seconds
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
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false} // hide scrollbar
      >
        <Text style={stylesheet.title}>Create your{"\n"}Rwai account</Text>
        <Text style={stylesheet.subtitle}>
          Please fill in your details below {"\n"}to get started with Rwai
        </Text>

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
        <TouchableOpacity
          style={stylesheet.termsContainer}
          onPress={() => setAgreeTerms(!agreeTerms)}
        >
          <View
            style={{
              ...stylesheet.checkbox,
              ...(agreeTerms && stylesheet.checkboxChecked),
            }}
          >
            {agreeTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={stylesheet.termsText}>
            By signing up, you agree to our{" "}
            <Text style={stylesheet.linkText}>Terms and Conditions</Text>
          </Text>
        </TouchableOpacity>

        {/* Signup Button */}
        <TouchableOpacity
          style={{
            ...stylesheet.signupButton,
            opacity: email && password && agreeTerms ? 1 : 0.3,
          }}
          disabled={!(email && password && agreeTerms) || loading}
          onPress={handleSignup}
        >
          {loading ? (
            <ActivityIndicator color="#121212" />
          ) : (
            <Text style={stylesheet.signupText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Social Buttons */}
        <TouchableOpacity
          style={stylesheet.socialButton}
          onPress={() => console.log("Google Signup")}
        >
          <Image source={require("../../assets/google.png")} style={stylesheet.socialIcon} />
          <Text style={stylesheet.socialText}>Sign up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={stylesheet.socialButton}
          onPress={() => console.log("Apple Signup")}
        >
          <Image source={require("../../assets/appl.png")} style={stylesheet.socialIcon} />
          <Text style={stylesheet.socialText}>Sign up with Apple</Text>
        </TouchableOpacity>

        {/* Already have an account */}
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
          <Text style={{ color: "#999" }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Popup alert */}
      {popupMsg ? (
        <View style={stylesheet.popupContainer}>
          <View style={stylesheet.popupBox}>
            <Text style={stylesheet.popupText}>{popupMsg}</Text>
          </View>
        </View>
      ) : null}
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
  socialButton: { backgroundColor: "#222", borderWidth: 1, borderColor: "#555", flexDirection: "row", alignItems: "center", borderRadius: 10, height: 50, marginBottom: 10 },
  socialIcon: { width: 22, height: 24, marginLeft: 10 },
  socialText: { color: "#fff", fontSize: 16, fontWeight: "bold", flex: 1, textAlign: "center", marginRight: 32 },
  popupContainer: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", zIndex: 9999 },
  popupBox: { backgroundColor: "#222", borderWidth: 1, borderColor: "#555", borderRadius: 10, padding: 20, width: "80%", minHeight: 100, justifyContent: "center" },
  popupText: { color: "#fff", fontSize: 14, textAlign: "center", fontWeight: "600", lineHeight: 20 },
  errorText: { color: "red", fontSize: 12, marginBottom: 15 },
};