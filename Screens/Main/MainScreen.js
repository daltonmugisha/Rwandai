import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
  FlatList,
  Dimensions,
  Keyboard,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Sidebar from "./SidebarScreen";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function MainScreen() {
  const sidebarX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const mainX = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [inputHeight, setInputHeight] = useState(46);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardHeight(0)
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const openSidebar = () => {
    setSidebarOpen(true);
    Animated.parallel([
      Animated.timing(sidebarX, { toValue: 0, duration: 280, useNativeDriver: true }),
      Animated.timing(mainX, { toValue: SCREEN_WIDTH * 0.25, duration: 280, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 1, duration: 280, useNativeDriver: true }),
    ]).start();
  };

  const closeSidebar = () => {
    Animated.parallel([
      Animated.timing(sidebarX, { toValue: -SCREEN_WIDTH, duration: 280, useNativeDriver: true }),
      Animated.timing(mainX, { toValue: 0, duration: 280, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0, duration: 280, useNativeDriver: true }),
    ]).start(() => setSidebarOpen(false));
  };

  const sendMessage = () => {
    if (!text.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text, sent: true }]);
    setText("");
    setInputHeight(46);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Sidebar sidebarX={sidebarX} closeSidebar={closeSidebar} />

      {sidebarOpen && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <TouchableOpacity style={{ flex: 1 }} onPress={closeSidebar} />
        </Animated.View>
      )}

      <Animated.View style={[styles.mainContent, { transform: [{ translateX: mainX }] }]}>
        {/* TOP */}
        <View style={styles.topOverlay}>
          <TouchableOpacity style={styles.circleButton} onPress={openSidebar}>
            <Ionicons name="menu" size={20} color="#fff" />
          </TouchableOpacity>

          <View>
            <TouchableOpacity style={styles.centerTextContainer}>
            <MaterialIcons name="auto-awesome" size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.upgradeText}>Upgrade</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.circleButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* MESSAGES */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.msgBubble, item.sent ? styles.msgSent : styles.msgReceived]}>
              <Text style={{ color: "#fff" }}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        />

        {/* CHAT INPUT */}
        <Animated.View style={[styles.chatInputWrapper, { bottom: keyboardHeight }]}>
          {/* PLUS ICON */}
          <TouchableOpacity style={styles.plusIconWrapper}>
            <Ionicons name="add" size={22} color="#888" />
          </TouchableOpacity>

          {/* INPUT BOX */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { height: inputHeight, fontSize: 18 }]}
              placeholder="Ask anything..."
              placeholderTextColor="#666"
              value={text}
              multiline
              onChangeText={setText}
              scrollEnabled={inputHeight >= 120}
              onContentSizeChange={(e) => {
                const h = e.nativeEvent.contentSize.height;
                setInputHeight(Math.min(h, 120));
              }}
            />

            {/* MIC ICON */}
            {!text.trim() && (
              <TouchableOpacity style={styles.micWrapper}>
                <Ionicons name="mic-outline" size={24} color="#888" />
              </TouchableOpacity>
            )}

            {/* SEND ICON */}
            {text.trim().length > 0 && (
              <TouchableOpacity style={styles.sendWrapper} onPress={sendMessage}>
                <Ionicons name="arrow-up" size={20} color="#222" />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

/* ------------------------- STYLES ------------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 150,
  },

  mainContent: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 15,
    backgroundColor: "#121212",
    zIndex: 100,
  },

  topOverlay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#222",
    borderWidth:1,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
  },

  centerTextContainer: {
    flexDirection: "row",
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#555",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },

  upgradeText: { color: "#fff", fontSize: 14, fontWeight: "bold" },

  msgBubble: {
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
    maxWidth: "80%",
  },
  msgSent: { alignSelf: "flex-end", backgroundColor: "#00BFFF" },
  msgReceived: { alignSelf: "flex-start", backgroundColor: "#1b1b1b" },

  /* ---- INPUT AREA ---- */
  chatInputWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  plusIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginBottom: 4,
  },

  inputWrapper: {
    flex: 1,
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 0,
    minHeight: 46,
    maxHeight: 120,
    justifyContent: "center",
  },

  input: {
    color: "#fff",
    fontSize: 16,
    paddingRight: 100, // space for mic/send icons
    maxHeight: 120,
  },

  micWrapper: {
    position: "absolute",
    right: 10,
    bottom: 11,
  },

  sendWrapper: {
    position: "absolute",
    right: 10,
    bottom: 8,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
