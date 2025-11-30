// Screens/AboutScreen.js
import React from "react";
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AboutScreen() {
  const navigation = useNavigation();

  const aboutItems = [
    { label: "Help Center", screen: "HelpCenterScreen", icon: "help-circle-outline" },
    { label: "Terms of Use", screen: "TermsScreen", icon: "document-text-outline" },
    { label: "Privacy Policy", screen: "PrivacyScreen", icon: "lock-closed-outline" },
    { label: "Licenses", screen: "LicensesScreen", icon: "file-tray-full-outline" },
    { label: "Rwai for Android", screen: "RwaiAndroidScreen", icon: "logo-android" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 16 }}>
          {aboutItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.glassRowSmall} 
              activeOpacity={0.75}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Ionicons name={item.icon} size={20} color="#fff" style={{ marginRight: 12 }} />
              <Text style={styles.rowLabelSmall}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#888" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141414" },

  // Header style from DataControlScreen
  header: { 
    height: 80, 
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 5, 
    backgroundColor: "#141414",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
  },
  backBtn: { width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  headerTitle: { flex: 1, marginLeft: 8, fontSize: 20, color: "#FFF", fontWeight: "600" },

  scrollContent: { paddingBottom: 16, paddingTop: 16 },

  // ChatHistory style for About screen rows
  glassRowSmall: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    justifyContent: "space-between"
  },
  rowLabelSmall: { color: "#FFF", fontSize: 15, fontWeight: "500", flex: 1 },
});
