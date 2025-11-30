import React from "react";
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DataControlScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data Control</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Delete Account Card */}
        <TouchableOpacity style={[styles.glassRow, { backgroundColor: "rgba(255,0,0,0.1)", borderColor: "rgba(255,0,0,0.3)" }]}>
  <Text style={[styles.rowLabel, { color: "#FF3B30" }]}>Delete Your Rwai Account</Text>
  <Text style={styles.rowSub}>
    Permanently delete your Rwai account including all personal data. 
    This action cannot be undone.
  </Text>

  <TouchableOpacity style={styles.deleteButton}>
    <Ionicons name="trash-outline" size={18} color="#A0A0A0" style={{ marginRight: 8 }} />
    <Text style={styles.deleteButtonText}>Delete The Account</Text>
  </TouchableOpacity>
</TouchableOpacity>

        {/* Gap */}
        <View style={{ height: 16 }} />

        {/* Chat History Section */}
        <Text style={styles.sectionTitle}>Chat History</Text>

        <TouchableOpacity style={styles.glassRowSmall}>
          <Text style={styles.rowLabelSmall}>View Archived Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.glassRowSmall}>
          <Text style={styles.rowLabelSmall}>Archive Chat History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.glassRowSmall}>
          <Text style={styles.rowLabelSmall}>Clear Chat History</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    deleteButton: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 12,
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "rgba(255,59,48,0.6)",
  backgroundColor: "rgba(255,59,48,0.15)",
},
deleteButtonText: {
  color: "#A0A0A0",
  fontWeight: "600",
  fontSize: 15,
},

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
  scrollContent: { paddingBottom: 16, paddingTop: 16 },

  sectionTitle: { 
    color: "#A0A0A0", 
    fontSize: 14, 
    fontWeight: "500", 
    marginHorizontal: 20, 
    marginBottom: 8 
  },

  // Delete Account & large rows
  glassRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  rowLabel: { color: "#FFF", fontSize: 16, fontWeight: "600", marginBottom: 6 },
  rowSub: { color: "#A0A0A0", fontSize: 14, lineHeight: 20 },

  // Small chat rows like About screen
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
  },
  rowLabelSmall: { color: "#FFF", fontSize: 15, fontWeight: "500" },
});
