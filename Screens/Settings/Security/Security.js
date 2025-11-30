import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SecurityScreen({ navigation }) {
  const [mfaEnabled, setMfaEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Multi-Factor Authentication (MFA)</Text>
            <Text style={styles.cardText}>
              MFA adds an extra layer of security by requiring a second verification. 
              It protects your account even if your password is stolen. 
              You can use an authentication app or SMS code. 
              Enabling MFA reduces the risk of breaches. 
              Only you can access your account securely.
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#555", true: "#888" }}
            thumbColor={mfaEnabled ? "#FFF" : "#FFF"}
            ios_backgroundColor="#555"
            onValueChange={(value) => setMfaEnabled(value)}
            value={mfaEnabled}
            style={styles.switch}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141414" },
  header: { 
    height: 80, 
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 5, 
    backgroundColor: "#141414",
    paddingTop: 20, 
  },
  backBtn: { width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  headerTitle: { flex: 1, marginLeft: 8, fontSize: 20, color: "#FFF", fontWeight: "600" },

  content: { padding: 16 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  cardTitle: { color: "#FFF", fontSize: 16, fontWeight: "600", marginBottom: 6 },
  cardText: { color: "#A0A0A0", fontSize: 13, lineHeight: 18 },
  switch: { transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }, // enlarges the toggle
});
