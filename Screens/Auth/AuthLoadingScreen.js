import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { AuthContext } from "../../context/AuthProvider";

export default function AuthLoadingScreen({ navigation }) {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      navigation.replace(user ? "MainScreen" : "LoginScreen");
    }
  }, [loading, user]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
