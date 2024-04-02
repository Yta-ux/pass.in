import { Input } from "@/components/input";
import { View, Image, StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View className="bg-green-500 flex-1 justify-center items-center p-8">
      <StatusBar barStyle="light-content" />
      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />

      <View className="mt-12 mb-4 w-full gap-3">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field placeholder="Código do ingresso"></Input.Field>
        </Input>
      </View>

      <Button title="ACESSAR CREDENCIAL" onPress={() => console.log("Oi")} />

      <Link href="/register" className="text-base text-white mt-8 font-bold">
        Ainda não possui ingresso?
      </Link>
    </View>
  );
}
