// Screens/Auth/OTPScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OTPScreen({ navigation, route }) {
  const { email } = route.params || {}; // only email
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [popupMsg, setPopupMsg] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes countdown
  const timerRef = useRef(null);

  // Start timer on mount
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleKeyPress = (digit) => {
    let newOtp = [...otp];
    const emptyIndex = newOtp.findIndex((v) => v === "");

    if (digit === "delete") {
      const lastFilledIndex = newOtp
        .map((v, i) => (v !== "" ? i : -1))
        .filter((i) => i >= 0)
        .pop();
      if (lastFilledIndex !== undefined) newOtp[lastFilledIndex] = "";
    } else if (emptyIndex !== -1) {
      newOtp[emptyIndex] = digit;
    }

    setOtp(newOtp);
  };

  const isComplete = otp.every((d) => d !== "");

  const handleContinue = () => {
    if (!isComplete) return;
    setPopupMsg("OTP Verified! Redirecting...");
    setTimeout(() => {
      setPopupMsg("");
      navigation.navigate("MainScreen");
    }, 1500);
  };

  const handleResend = () => {
    setPopupMsg("OTP resent successfully!");
    setTimer(300); // reset timer
    startTimer();
    setTimeout(() => setPopupMsg(""), 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        {/* Back */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        {/* Title & Subtitle */}
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          We have sent a verification code to <Text style={{ fontWeight: "bold" }}>{email}</Text>. Check your inbox & spam folder.
        </Text>

        {/* OTP Boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <View key={index} style={styles.otpBox}>
              <Text style={styles.otpDigit}>{digit}</Text>
            </View>
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={{ ...styles.button, opacity: isComplete ? 1 : 0.3 }}
          disabled={!isComplete}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {/* Timer */}
        <Text style={{ color: "#aaa", textAlign: "center", marginBottom: 5 }}>
          {formatTime(timer)}
        </Text>

        {/* Resend OTP */}
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>
            Didn’t receive the OTP? <Text style={styles.resendLink}>Resend</Text>
          </Text>
        </TouchableOpacity>

        {/* Keypad */}
        <View style={styles.keypad}>
          {[
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            ["delete", "0"],
          ].map((row, i) => (
            <View key={i} style={styles.keyRow}>
              {row.map((key) => (
                <TouchableOpacity key={key} style={styles.key} onPress={() => handleKeyPress(key)}>
                  {key === "delete" ? (
                    <Ionicons name="backspace-outline" size={28} color="#bbb" />
                  ) : (
                    <Text style={styles.keyText}>{key}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

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
  title: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 5, textAlign: "left", marginTop: 40 },
  subtitle: { fontSize: 14, color: "#999", marginBottom:10, lineHeight: 20, textAlign: "left", maxWidth: "90%" },
  otpRow: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  otpBox: { width: 55, height: 60, borderWidth: 1, borderColor: "#555", borderRadius: 10, marginHorizontal: 8, alignItems: "center", justifyContent: "center" },
  otpDigit: { fontSize: 22, color: "#fff", fontWeight: "bold" },
  button: { backgroundColor: "#fff", borderRadius: 10, height: 50, justifyContent: "center", alignItems: "center", marginBottom: 10 },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "#121212" },
  resendText: { color: "#aaa", textAlign: "center", marginBottom: 5, fontSize: 14 },
  resendLink: { fontWeight: "bold", color: "#fff" },
  keypad: { marginTop: 10, alignItems: "center" },
  keyRow: { flexDirection: "row" },
  key: { width: 70, height: 70, backgroundColor: "#1e1e1e", borderRadius: 35, justifyContent: "center", alignItems: "center", margin: 10 },
  keyText: { fontSize: 22, color: "#fff", fontWeight: "bold" },
  popupContainer: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", zIndex: 9999 },
  popupBox: { backgroundColor: "#222", borderWidth: 1, borderColor: "#555", borderRadius: 10, padding: 20, width: "80%", minHeight: 100, justifyContent: "center" },
  popupText: { color: "#fff", fontSize: 14, textAlign: "center", fontWeight: "600", lineHeight: 20 },
};
