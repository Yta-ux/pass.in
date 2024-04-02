import { Input } from "@/components/input";
import { View, Image, StatusBar } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { Link } from "expo-router";

export default function Register() {
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
          <FontAwesome6
            name="user-circle"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field placeholder="Nome completo"></Input.Field>
        </Input>
        <Input>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field placeholder="E-mail" keyboardType="email-address" ></Input.Field>
        </Input>
      </View>

      <Button title="realizar inscrição" onPress={() => console.log("Oi")} />

      <Link href="/" className="text-base text-white mt-8 font-bold">
        Já possui ingresso?
      </Link>
    </View>
  );
}
