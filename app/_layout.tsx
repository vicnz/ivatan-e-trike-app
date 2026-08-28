import "@/global.css";
import { PortalHost } from "@rn-primitives/portal";
import { useKeepAwake } from "expo-keep-awake";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  useKeepAwake(); //!ONLY FOR DEVELOPMENT, REMOVE THIS BEFORE BUILDING APP

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen
          name="auth/forgot-password"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="auth/reset-password"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
      <PortalHost />
    </SafeAreaProvider>
  );
}
