import { Input } from "@/components/input";
import { View, Image, StatusBar, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { Link, router } from "expo-router";
import { useState } from "react";

export default function Home() {
  const [ticket, setTicket] = useState("");

  const handleSubmitTicket = (value: string) => {
    if(!value.trim ()){
      return Alert.alert("Erro", "Preencha o campo de código do ingresso")
    }

    router.push("/ticket")
  }
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
          <Input.Field placeholder="Código do ingresso" keyboardType="numeric" onChangeText={(value) => setTicket(value)} />
        </Input>
      </View>

      <Button title="ACESSAR CREDENCIAL" onPress={() => handleSubmitTicket(ticket)} />

      <Link href="/register" className="text-base text-white mt-8 font-bold">
        Ainda não possui ingresso?
      </Link>
    </View>
  );
}
