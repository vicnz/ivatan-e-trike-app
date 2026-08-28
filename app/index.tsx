import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  openBrowserAsync,
  WebBrowserPresentationStyle,
} from "expo-web-browser";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const router = useRouter();
  return (
    <SafeAreaView edges={["right", "left", "bottom"]}>
      <View
        className="h-screen w-screen flex flex-col bg-white"
        style={{ height: "100%", width: "100%" }}
      >
        <View
          className="flex-1 bg-primary w-full h-full relative"
          style={{ height: "100%", width: "100%" }}
        >
          <Image
            className="object-cover flex-1 absolute inset-0"
            source={require("@/assets/images/lighthouse.jpg")}
            contentFit="cover"
            transition={1000}
            style={{ height: "100%", width: "100%" }}
          />
          <LinearGradient
            colors={["#FFFFFF00", "#FFFFFF30", "#FFFFFF"]}
            className="h-full w-full absolute inset-0 flex gap-2 justify-center"
          >
            <Image
              source={require("@/assets/images/e-trike-logo.png")}
              contentFit="contain"
              transition={1000}
              style={{ height: 100, width: "auto" }}
            />
            <Text
              className="text-center font-black text-primary-foreground"
              variant={"h1"}
            >
              iTRYKE
            </Text>
          </LinearGradient>
        </View>
        <View className="py-6">
          <Text className="text-center text-xs text-muted-foreground tracking-tighter italic">
            from the developers of
          </Text>
          <Pressable
            onPress={async (event) => {
              if (process.env.EXPO_OS !== "web") {
                event.preventDefault();
                await openBrowserAsync(`https://batanes360.com`, {
                  presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
                });
              }
            }}
          >
            <Image
              source={require("@/assets/images/batanes360.jpg")}
              contentFit="contain"
              transition={1000}
              style={{ height: 50, width: "auto" }}
            />
          </Pressable>
          <View className="py-3 px-6">
            <Separator className="bg-primary" />
          </View>
          <Button
            className="w-[90%] mx-auto rounded-full h-14"
            variant={"default"}
            size="lg"
            onPress={() => router.push("/auth/login")}
          >
            <Text className="font-bold text-lg">GET STARTED</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
