import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OTPScreen({ navigation }) {
  const [otp, setOtp] = useState(["", "", "", ""]);

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

  return (
    <View style={stylesheet.container}>
      {/* Back */}
      <TouchableOpacity
        style={stylesheet.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={stylesheet.title}>Enter Verification Code</Text>
      <Text style={stylesheet.subtitle}>
        We have sent a verification code to your provided phone and email.
      </Text>

      {/* OTP Boxes */}
      <View style={stylesheet.otpRow}>
        {otp.map((digit, index) => (
          <View key={index} style={stylesheet.otpBox}>
            <Text style={stylesheet.otpDigit}>{digit}</Text>
          </View>
        ))}
      </View>

      {/* Continue */}
      <TouchableOpacity
        style={[
          stylesheet.button,
          { opacity: isComplete ? 1 : 0.3 },
        ]}
        disabled={!isComplete}
        onPress={() => navigation.navigate("MainScreen")}
      >
        <Text style={stylesheet.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Resend */}
      <Text style={stylesheet.resendText}>
        Didn’t receive the OTP?{" "}
        <Text style={stylesheet.resendLink}>Resend</Text>
      </Text>

      {/* Keypad */}
      <View style={stylesheet.keypad}>
        {[
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
          ["delete", "0"],
        ].map((row, i) => (
          <View key={i} style={stylesheet.keyRow}>
            {row.map((key) => (
              <TouchableOpacity
                key={key}
                style={stylesheet.key}
                onPress={() => handleKeyPress(key)}
              >
                {key === "delete" ? (
                  <Ionicons
                    name="backspace-outline"
                    size={28}
                    color="#bbb"
                  />
                ) : (
                  <Text style={stylesheet.keyText}>{key}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const stylesheet = {
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 17,
    padding: 0,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "left",
    marginTop: 40,
  },

  subtitle: {
    fontSize: 14,
    color: "#999",
    marginBottom: 30,
    lineHeight: 20,
    textAlign: "left",
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },

  otpBox: {
    width: 55,
    height: 60,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 10,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  otpDigit: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#121212",
  },

  resendText: {
    color: "#aaa",
    textAlign: "center",
    marginBottom: 25,
    fontSize: 14,
  },

  resendLink: {
    fontWeight: "bold",
    color: "white",
  },

  keypad: {
    marginTop: 10,
    alignItems: "center",
  },

  keyRow: {
    flexDirection: "row",
  },

  key: {
    width: 70,
    height: 70,
    backgroundColor: "#1e1e1e",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  keyText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
};
