import { Text } from "@/components/ui/text";
import { StyleSheet, View } from "react-native";

export function Page() {
  return (
    <>
      <View style={styles.container}>
        <Text>Home Page Element</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
