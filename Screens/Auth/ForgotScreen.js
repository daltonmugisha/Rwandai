// Screens/Auth/ForgotPassword.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [popupMsg, setPopupMsg] = useState("");

  const validateInput = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleContinue = async () => {
    if (!validateInput()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://10.58.28.247:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() }), // <-- key fixed here
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setPopupMsg("Verification code sent! Redirecting...");
        setTimeout(() => {
          setPopupMsg("");
          navigation.navigate("OtpScreen", { email });
        }, 1500);
      }
    } catch (err) {
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }} showsVerticalScrollIndicator={false}>
        {/* Back Arrow */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Title & Subtitle */}
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email and we’ll send you a verification code.
        </Text>

        {/* Input */}
        <TextInput
          style={{
            ...styles.input,
            borderColor: error ? "red" : "#555",
            marginBottom: error ? 5 : 20,
          }}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (error) setError("");
          }}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Continue Button */}
        <TouchableOpacity
          style={{ ...styles.primaryButton, opacity: email ? 1 : 0.3 }}
          disabled={!email || loading}
          onPress={handleContinue}
        >
          {loading ? (
            <ActivityIndicator color="#121212" />
          ) : (
            <Text style={styles.primaryButtonText}>Continue</Text>
          )}
        </TouchableOpacity>

        {/* Return to Sign In */}
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={styles.linkContainer}>
          <Text style={styles.linkText}>Return to Sign In</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Fixed Bottom: Create New Account */}
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
          <Text style={styles.bottomText}>Create New Account</Text>
        </TouchableOpacity>
      </View>

      {/* Popup */}
      {popupMsg ? (
        <View style={styles.popupContainer}>
          <View style={styles.popupBox}>
            <Text style={styles.popupText}>{popupMsg}</Text>
          </View>
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = {
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 20, paddingTop: 50 },
  backButton: { position: "absolute", top: 0, left: 0, padding: 0, zIndex: 1 },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 10, textAlign: "left", marginTop: 40 },
  subtitle: { fontSize: 14, color: "#999", marginBottom: 30, lineHeight: 20, textAlign: "left" },
  input: { height: 50, borderWidth: 1, borderColor: "#555", borderRadius: 10, paddingHorizontal: 15, fontSize: 14, color: "#fff" },
  primaryButton: { backgroundColor: "#fff", paddingVertical: 15, borderRadius: 10, alignItems: "center", marginBottom: 15, height: 50, justifyContent: "center" },
  primaryButtonText: { color: "#121212", fontSize: 16, fontWeight: "bold" },
  linkContainer: { marginBottom: 20 },
  linkText: { color: "#999", fontSize: 14, textAlign: "center" },
  bottom: { position: "absolute", bottom: 40, left: 0, right: 0, alignItems: "center" },
  bottomText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
  errorText: { color: "red", fontSize: 12, marginBottom: 15 },
  popupContainer: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", zIndex: 9999 },
  popupBox: { backgroundColor: "#222", borderWidth: 1, borderColor: "#555", borderRadius: 10, padding: 20, width: "80%", minHeight: 100, justifyContent: "center" },
  popupText: { color: "#fff", fontSize: 14, textAlign: "center", fontWeight: "600", lineHeight: 20 },
};
