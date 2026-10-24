import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const VIP_BG = "#0B0F17";
const VIP_BORDER = "rgba(255,255,255,0.10)";
const GOLD = "#D9B35F";
const MUTED = "rgba(255,255,255,0.55)";

function ProfileAvatarIcon({ focused }: { focused: boolean }) {
  return (
    <View
      style={{
        width: 28,
        height: 28,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: focused ? 2 : 1,
        borderColor: focused ? GOLD : "rgba(255,255,255,0.22)",
        backgroundColor: "rgba(11,15,23,0.92)",
      }}
    >
      <Ionicons
        name="person"
        size={16}
        color={focused ? GOLD : "rgba(255,255,255,0.65)"}
      />
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const androidBottomInset = Platform.OS === "android" ? insets.bottom : 0;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
position: Platform.OS === "ios" ? "absolute" : "relative",
          left: 0,
          right: 0,
          bottom: 0,

          backgroundColor: "rgba(11,15,23,0.92)",
          borderTopColor: "rgba(255,255,255,0.08)",
          borderTopWidth: 1,

          height: Platform.OS === "android" ? 66 + androidBottomInset : 92,
          paddingTop: 10,
          paddingBottom: Platform.OS === "android" ? Math.max(8, androidBottomInset) : 26,

          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: -8 },
        },
        tabBarActiveTintColor: GOLD,
        tabBarInactiveTintColor: MUTED,
        tabBarLabelStyle: { fontWeight: "800", fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size ?? 22} />
          ),
        }}
      />

      {/* More is a folder route */}
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" color={color} size={size ?? 22} />
          ),
        }}
      />

      <Tabs.Screen
        name="church"
        options={{
          title: "Church",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="church"
              color={color}
              size={(size ?? 22) + 2}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Me",
          tabBarIcon: ({ focused }) => <ProfileAvatarIcon focused={focused} />,
        }}
      />

      {/* hide internal routes (only if they exist) */}
      <Tabs.Screen name="_ministry_hidden/index" options={{ href: null }} />
    </Tabs>
  );
}
