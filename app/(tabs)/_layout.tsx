import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#ffd33d", // Active tab icon color
                headerStyle: {
                    backgroundColor: "#25292e", // Header background color
                },
                headerShadowVisible: false, // Remove shadow under header
                headerTintColor: "#fff", // Header text color
                tabBarStyle: {
                    // Tab bar background color
                    backgroundColor: "#25292e",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "贴纸Icon",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "home-sharp" : "home-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: "关于",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={
                                focused
                                    ? "information-circle"
                                    : "information-circle-outline"
                            }
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
