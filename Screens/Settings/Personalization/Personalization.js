import React, { useState } from "react";
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  Switch 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PersonalizationScreen() {
  const navigation = useNavigation();

  // Top-level toggles
  const [enablePersonalization, setEnablePersonalization] = useState(false);
  const [enableCustom, setEnableCustom] = useState(false);

  // Advanced toggles (independent)
  const [advWebSearch, setAdvWebSearch] = useState(false);
  const [advCodingSupport, setAdvCodingSupport] = useState(false);

  // Personality
  const [showPersonality, setShowPersonality] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState("Default");

  const [showAdvanced, setShowAdvanced] = useState(false);

  const personalities = [
    { title: "Default", subtitle: "Balanced style and tone" },
    { title: "Professional", subtitle: "Formal and structured" },
    { title: "Friendly", subtitle: "Warm and casual" },
    { title: "Candid", subtitle: "Direct and honest" },
    { title: "Quirky", subtitle: "Playful and expressive" },
    { title: "Efficient", subtitle: "Short and concise" },
    { title: "Nerd", subtitle: "Technical and deep" },
    { title: "Cynical", subtitle: "Dry humor" },
  ];

  const SWITCH_TRACK = { false: "#555", true: "#FFF" };
  const SWITCH_THUMB = (val) => (val ? "#000" : "#999");

  // Toggle card helper
  const renderToggleCard = (title, subtitle, value, onChange, showIcon = false, iconName = "") => (
    <View style={styles.glassRow}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {showIcon && <Ionicons name={iconName} size={22} color="#FFF" />}
        <View style={{ marginLeft: showIcon ? 12 : 0 }}>
          <Text style={styles.rowLabel}>{title}</Text>
          <Text style={styles.rowSub}>{subtitle}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={SWITCH_TRACK}
        thumbColor={SWITCH_THUMB(value)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personalization</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top-level Toggles */}
        {renderToggleCard(
          "Enable Personalization",
          "Personalize your Rwai experience",
          enablePersonalization,
          setEnablePersonalization
        )}
        {renderToggleCard(
          "Enable Custom Instructions",
          "Write your own instructions for Rwai",
          enableCustom,
          setEnableCustom
        )}

        {/* Personality Dropdown */}
        <TouchableOpacity
          style={styles.glassRow}
          activeOpacity={0.9}
          onPress={() => setShowPersonality(!showPersonality)}
        >
          <View>
            <Text style={styles.rowLabel}>Rwai Personality</Text>
            <Text style={styles.rowSub}>{selectedPersonality}</Text>
          </View>
          <Ionicons
            name={showPersonality ? "chevron-up" : "chevron-down"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>

        {showPersonality && (
          <View style={styles.dropdownCard}>
            {personalities.map((p, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.dropdownRow}
                onPress={() => setSelectedPersonality(p.title)}
              >
                <View>
                  <Text style={styles.dropdownTitle}>{p.title}</Text>
                  <Text style={styles.dropdownSubtitle}>{p.subtitle}</Text>
                </View>
                {selectedPersonality === p.title && (
                  <Ionicons name="checkmark" size={20} color="#FFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Custom Inputs */}
        <Text style={styles.inputTitle}>Custom Instructions</Text>
        <TextInput
          style={[styles.inputBox, !enableCustom && styles.disabled]}
          placeholder="Write your instructions..."
          placeholderTextColor="#777"
          editable={enableCustom}
          multiline
        />

        <Text style={styles.inputTitle}>Your nickname</Text>
        <TextInput
          style={[styles.inputBox, !enableCustom && styles.disabled]}
          placeholder="Enter nickname"
          placeholderTextColor="#777"
          editable={enableCustom}
        />

        <Text style={styles.inputTitle}>Your occupation</Text>
        <TextInput
          style={[styles.inputBox, !enableCustom && styles.disabled]}
          placeholder="Enter occupation"
          placeholderTextColor="#777"
          editable={enableCustom}
        />

        <Text style={styles.inputTitle}>More about you</Text>
        <TextInput
          style={[styles.inputBox, !enableCustom && styles.disabled]}
          placeholder="Tell Rwai about you..."
          placeholderTextColor="#777"
          editable={enableCustom}
          multiline
        />

        {/* Advanced Section */}
        <TouchableOpacity
          style={styles.glassRow}
          onPress={() => setShowAdvanced(!showAdvanced)}
        >
          <Text style={styles.rowLabel}>Advanced</Text>
          <Ionicons
            name={showAdvanced ? "chevron-up" : "chevron-down"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>

        {showAdvanced && (
          <>
            {renderToggleCard(
              "Web Search",
              "Allow Rwai to search the web",
              advWebSearch,
              setAdvWebSearch,
              true,
              "globe-outline"
            )}
            {renderToggleCard(
              "Coding Support",
              "Improve coding answers",
              advCodingSupport,
              setAdvCodingSupport,
              true,
              "code-slash-outline"
            )}
          </>
        )}

        <View style={{ height: 32 }} />
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
  scrollContent: { paddingBottom: 16, paddingTop: 16 },
  glassRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  rowLabel: { color: "#FFF", fontSize: 16, fontWeight: "600", marginBottom: 4 },
  rowSub: { color: "#A0A0A0", fontSize: 14, lineHeight: 20 },
  dropdownCard: {
    marginHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    marginBottom: 12,
  },
  dropdownRow: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.07)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownTitle: { color: "#FFF", fontSize: 15, fontWeight: "500" },
  dropdownSubtitle: { color: "#999", fontSize: 12, marginTop: 2 },
  inputTitle: { marginLeft: 16, marginBottom: 6, marginTop: 10, color: "#FFF", fontSize: 14, fontWeight: "500" },
  inputBox: {
    marginHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: 14,
    color: "#FFF",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 12,
  },
  disabled: { opacity: 0.3 },
});
