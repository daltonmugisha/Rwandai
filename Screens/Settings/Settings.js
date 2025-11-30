// Screens/SettingsScreen.js
import React from "react";
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Linking 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
  const user = {
    initials: "MD",
    fullName: "Mugisha Dalton",
    email: "mugishadalton23@gmail.com",
    phone: "+250791418187"
  };

  // Settings Sections
  const myRwai = [
    { label: "Personalization", icon: "color-palette-outline", onPress: () => navigation.navigate("PersonalizationScreen") },
    { label: "Apps & Connectors", icon: "apps-outline", onPress: () => navigation.navigate("AppsConnectorsScreen") }, // placeholder
  ];

  const myAccount = [
    { label: "Workspace", sub: "Personal", icon: "briefcase-outline", onPress: () => navigation.navigate("WorkspaceScreen") }, // placeholder
    { label: "Upgrade to Pro", sub: "Explore Advanced Features", icon: "rocket-outline", accent: "#FFD700", onPress: () => navigation.navigate("UpgradeScreen") },
    { label: "Email", sub: user.email, icon: "mail-outline", onPress: () => Linking.openURL(`mailto:${user.email}`) },
    { label: "Phone number", sub: user.phone, icon: "call-outline", onPress: () => Linking.openURL(`tel:${user.phone}`) },
  ];

  const coreSettings = [
    { label: "General", icon: "settings-outline", onPress: () => navigation.navigate("GeneralScreen") },
    { label: "Data Controls", icon: "server-outline", onPress: () => navigation.navigate("DataControlScreen") },
    { label: "Security", icon: "shield-outline", onPress: () => navigation.navigate("SecurityScreen") },
    { label: "About", icon: "information-circle-outline", onPress: () => navigation.navigate("AboutScreen") },
  ];

  const handleLogout = () => {
    // TODO: Clear auth/session if needed
    navigation.replace("LoginScreen");
  };

  const renderSection = (title, items) => (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.glassRow} 
          onPress={item.onPress ? item.onPress : null}
        >
          <Ionicons 
            name={item.icon} 
            size={22} 
            color={item.accent ? item.accent : "#FFF"} 
            style={{ marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.rowLabel}>{item.label}</Text>
            {item.sub && <Text style={styles.rowSub}>{item.sub}</Text>}
          </View>
          <Ionicons name="chevron-forward" size={18} color="#A0A0A0" />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Avatar + Info */}
        <View style={styles.topProfile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.initials}</Text>
          </View>
          <Text style={styles.fullName}>{user.fullName}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Edit profile</Text>
          </TouchableOpacity>
        </View>

        {/* Sections */}
        {renderSection("My Rwanda AI", myRwai)}
        {renderSection("Account", myAccount)}
        {renderSection("Core Settings", coreSettings)}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
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

  scrollContent: { paddingBottom: 24, paddingTop: 8 },

  topProfile: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: "#A855F7", justifyContent: "center", alignItems: "center", marginBottom: 10 },
  avatarText: { color: "#FFF", fontSize: 32, fontWeight: "700" },
  fullName: { color: "#FFF", fontSize: 18, fontWeight: "600", marginBottom: 2 },
  email: { color: "#A0A0A0", fontSize: 14, marginBottom: 10 },
  editBtn: { 
     backgroundColor: "rgba(255,255,255,0.05)",
     borderColor: "rgba(255,255,255,0.1)",
     borderWidth: 1, 
     paddingHorizontal: 18, 
     paddingVertical: 6, 
     borderRadius: 18 },
  editText: { color: "#A0A0A0", fontSize: 14, fontWeight: "500" },

  sectionTitle: { color: "#A0A0A0", fontSize: 13, fontWeight: "500", marginHorizontal: 16, marginBottom: 8 },

  glassRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  rowLabel: { color: "#FFF", fontSize: 15, fontWeight: "500" },
  rowSub: { color: "#A0A0A0", fontSize: 13, marginTop: 1 },

  logoutBtn: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 14, 
    marginTop: 32, 
    borderRadius: 14, 
    marginHorizontal: 16, 
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    justifyContent: "center"
  },
  logoutText: { color: "#FF3B30", fontSize: 15, fontWeight: "500", marginLeft: 6 },
});
