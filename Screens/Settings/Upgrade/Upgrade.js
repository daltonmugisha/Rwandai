// Screens/UpgradeScreen.js
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function UpgradeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("Plan");

  const subscriptionPlans = [
    {
      title: "Free Plan",
      price: "0 RWF",
      features: [
        "Daily Assistant",
        "Basic Learning Assistant",
        "Full Rwai Model Access",
        "5% fallback to Rwai Turbo",
        "1,000 tokens/day",
        "Small top-ups only"
      ],
      icon: "rocket-outline",
      accent: "#A0A0A0"
    },
    {
      title: "Professional Plan",
      price: "4,000 RWF",
      features: [
        "RSSB Assistant",
        "RRA Assistant",
        "Health Insurance Assistant",
        "Business Registration Assistant",
        "Advanced Learning Assistant",
        "Advanced Daily Assistant",
        "Document Helper",
        "Medium Tax Assistant",
        "Faster Response Rwai",
        "8,000 tokens/day",
        "Medium & Large top-ups",
        "Dial Assistant"
      ],
      icon: "star-outline",
      accent: "#A0A0A0",
      mostPopular: true
    },
    {
      title: "Business Plan",
      price: "10,000 RWF",
      features: [
        "Everything in Professional Plan",
        "Team / Company Accounts",
        "Staff Access Levels",
        "Shared credit pool",
        "RRA Advanced Business Filing",
        "RSSB Corporate Services",
        "Advanced Health Services",
        "Irembo Pro Services",
        "Government Ministry Services",
        "Private Company Services",
        "Priority Response",
        "20,000 tokens/day",
        "All top-ups unlocked"
      ],
      icon: "briefcase-outline",
      accent: "#A0A0A0"
    }
  ];

  const topUpGroups = [
    {
      plan: "Free Plan",
      packs: [
        { title: "20k Tokens", price: "1,000 RWF" },
        { title: "60k Tokens", price: "2,000 RWF" },
        { title: "150k Tokens", price: "4,000 RWF" }
      ]
    },
    {
      plan: "Professional Plan",
      packs: [
        { title: "100k Tokens", price: "2,000 RWF" },
        { title: "300k Tokens", price: "5,000 RWF" },
        { title: "700k Tokens", price: "10,000 RWF" }
      ]
    },
    {
      plan: "Business Plan",
      packs: [
        { title: "200k Tokens", price: "3,000 RWF" },
        { title: "600k Tokens", price: "7,000 RWF" },
        { title: "1.5M Tokens", price: "15,000 RWF" }
      ]
    }
  ];

  const handleTabSwitch = (tab) => setActiveTab(tab);

  const renderPlanCard = (item) => (
    <View key={item.title} style={styles.card}>
      {item.mostPopular && (
        <View style={styles.popularBanner}>
          <Text style={styles.popularBannerText}>Most Popular</Text>
        </View>
      )}

      <View style={styles.cardHeader}>
        <Ionicons name={item.icon} size={26} color={item.accent} />
        <Text style={styles.planTitle}>{item.title}</Text>
      </View>

      <Text style={styles.planPrice}>{item.price}</Text>

      <View style={{ marginTop: 8 }}>
        {item.features.map((feat, i) => (
          <View key={i} style={styles.featureRow}>
            <MaterialIcons name="check-circle-outline" size={18} color={item.accent} />
            <Text style={styles.featureText}>{feat}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={[styles.button, { borderColor: item.accent }]}>
        <Text style={[styles.buttonText, { color: item.accent }]}>Select Plan</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTopUps = () =>
    topUpGroups.map((group) => (
      <View key={group.plan} style={styles.card}>
        <Text style={styles.topupPlanTitle}>{group.plan}</Text>

        <View style={{ marginTop: 12 }}>
          {group.packs.map((pack, idx) => (
            <View key={idx} style={styles.topupRow}>
              <Text style={styles.topupTitle}>{pack.title}</Text>
              <Text style={styles.topupPrice}>{pack.price}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={[styles.button, { marginTop: 12, borderColor: "#A0A0A0" }]}>
          <Text style={[styles.buttonText, { color: "#A0A0A0" }]}>Top Up</Text>
        </TouchableOpacity>
      </View>
    ));

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upgrade Your Plan</Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "Plan" && styles.activeTab]}
          onPress={() => handleTabSwitch("Plan")}
        >
          <Text style={[styles.tabText, activeTab === "Plan" && styles.activeTabText]}>
            Plan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === "TopUps" && styles.activeTab]}
          onPress={() => handleTabSwitch("TopUps")}
        >
          <Text style={[styles.tabText, activeTab === "TopUps" && styles.activeTabText]}>
            TopUps
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {activeTab === "Plan" ? subscriptionPlans.map(renderPlanCard) : renderTopUps()}
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
    paddingTop: 20
  },
  backBtn: { width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  headerTitle: { flex: 1, marginLeft: 8, fontSize: 20, color: "#FFF", fontWeight: "600" },

  // TABS
  tabContainer: {
    flexDirection: "row",
    height: 44,
    backgroundColor: "#222",
    borderRadius: 22,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22
  },
  activeTab: {
    backgroundColor: "rgba(255,255,255,0.1)"
  },
  tabText: { fontSize: 15, color: "#A0A0A0" },
  activeTabText: { color: "#FFF", fontWeight: "700" },

  // PLAN CARDS
  card: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)"
  },
  cardHeader: { flexDirection: "row", alignItems: "center" },
  planTitle: { marginLeft: 10, fontSize: 18, fontWeight: "700", color: "#FFF" },
  planPrice: { color: "#FFF", fontSize: 20, fontWeight: "700", marginTop: 6 },
  featureRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  featureText: { marginLeft: 8, color: "#A0A0A0", fontSize: 14 },

  popularBanner: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "gold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  popularBannerText: { color: "#000", fontSize: 12, fontWeight: "700" },

  button: {
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center"
  },
  buttonText: { fontSize: 15, fontWeight: "600" },

  // TOP-UP CARDS
  topupPlanTitle: { fontSize: 18, fontWeight: "700", color: "#FFF" },
  topupRow: {
    backgroundColor: "#1b1b1b",
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)"
  },
  topupTitle: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  topupPrice: { color: "#A0A0A0", marginTop: 4 }
});
