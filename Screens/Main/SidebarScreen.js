// Screens/SidebarScreen.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
  TextInput,
  ScrollView,
  Dimensions
} from "react-native";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.80;

export default function Sidebar({ sidebarX, closeSidebar, user, recentChats = [] }) {
  const navigation = useNavigation();

  // Default menu items
  const menuItems = [
    { id: "1", label: "New chat", icon: "chatbubbles-outline", lib: "ION" },
    { id: "2", label: "Rwanda", lib: "FLAG" },
    { id: "3", label: "Workspace", icon: "briefcase-outline", lib: "MI" },
    { id: "4", label: "New project", icon: "folder-outline", lib: "MCI" }
  ];

  // Extract display name and initials from email
  const getDisplayName = (email) => {
    if (!email) return "User";
    let name = email.split("@")[0]; // before @
    name = name.replace(".com", "").replace(".gmail", ""); // remove common endings
    return name;
  };

   const getInitials = (email) => {
    if (!email) return "US";
    const name = email.split("@")[0]; // take the part before @
    const parts = name.split(/[\._]/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return parts.map(p => p.charAt(0).toUpperCase()).join("").substring(0, 2);
  };

  const renderIcon = (item) => {
    switch(item.lib) {
      case "ION":
        return <Ionicons name={item.icon} size={25} color="#38A832" />;
      case "MI":
        return <Ionicons name={item.icon} size={25} color="#F0A433" />;
      case "MCI":
        return <Ionicons name={item.icon} size={25} color="#1CA6E4" />;
      case "FLAG":
        return <Text style={{ fontSize: 22 }}>🇷🇼</Text>;
      default:
        return null;
    }
  };

  return (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarX }] }]}>
      <SafeAreaView style={styles.safe}>
        {/* Top Row: Search + Close */}
        <View style={styles.topRow}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#AAA" style={{ marginLeft: 12, marginRight: 8 }} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#AAA"
              style={styles.searchInputTop}
            />
          </View>
          <TouchableOpacity onPress={closeSidebar}>
            <Ionicons name="chevron-forward" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={closeSidebar}
              >
                {renderIcon(item)}
                <Text style={styles.menuText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Recent Chats</Text>
          <View style={styles.recentContainer}>
            {recentChats.length > 0 ? (
              recentChats.map((title, index) => (
                <TouchableOpacity key={index} onPress={closeSidebar} style={styles.recentItem}>
                  <Text style={styles.recentText}>{title}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={[styles.recentText, { fontStyle: "italic", opacity: 0.6 }]}>
                No chats yet
              </Text>
            )}
          </View>
        </ScrollView>

        {/* Bottom User Info */}
        <TouchableOpacity
          style={styles.bottomUser}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("SettingsScreen")}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(user?.email)}</Text>
          </View>
          <Text style={styles.username}>{getDisplayName(user?.email)}</Text>
          <Ionicons name="chevron-down" size={22} color="#999" />
        </TouchableOpacity>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: 40,
    zIndex: 200,
  },
  safe: { flex: 1 },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    borderRadius: 15,
    height: 50,
  },
  searchInputTop: { flex: 1, color: "#E0E0E0", fontSize: 15, paddingVertical: 8, paddingRight: 15 },
  scrollContainer: { flex: 1 },
  menuContainer: { marginBottom: 25 },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  menuText: { color: "#E0E0E0", fontSize: 16, marginLeft: 16 },
  sectionTitle: { color: "#999", fontWeight: "500", fontSize: 17, marginBottom: 12, marginTop: 10 },
  recentContainer: { marginBottom: 20 },
  recentItem: { paddingVertical: 10 },
  recentText: { color: "#E0E0E0", opacity: 0.9, fontSize: 16, lineHeight: 24 },
  bottomUser: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 20 },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#57007B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  username: { color: "#E0E0E0", fontSize: 16, flex: 1, marginLeft: 10 },
});
