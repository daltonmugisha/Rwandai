// Screens/Auth/SuccessScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function SuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, username } = route.params || {}; // get registered email & username

  const timestamp = new Date().toLocaleString(); // current date & time

  return (
    <View style={styles.container}>
      {/* Circle with tick */}
      <View style={styles.circle}>
        <Ionicons name="checkmark" size={60} color="#fff" />
      </View>

      {/* Confirmation message */}
      <Text style={styles.title}>Registration Successful!</Text>
      <Text style={styles.message}>
        Your account{" "}
        <Text style={styles.highlight}>{username || "User"}</Text> (
        <Text style={styles.highlight}>{email || "user@example.com"}</Text>
        ) has been successfully created. You will be redirected to the login
        screen to access your account. Registered on:{" "}
        <Text style={styles.highlight}>{timestamp}</Text>
      </Text>

      {/* Continue button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.replace("LoginScreen")}
      >
        <Text style={styles.continueText}>Continue to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#acacac",
    shadowColor: "#acacac",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 5,
    lineHeight: 22,
  },
  highlight: {
    color: "#555",
    fontWeight: "bold",
  },
  continueButton: {
    marginTop: 40,
    backgroundColor: "rgba(255,255,255,0.05)", // subtle glass effect
    borderWidth: 1,
    borderColor: "#acacac",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    // Glow/shadow
    shadowColor: "#acacac",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    // REMOVE elevation for Android to prevent weird bulky shadow
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
