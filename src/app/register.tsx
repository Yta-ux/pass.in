import { Input } from "@/components/input";
import { View, Image, StatusBar, Alert } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { Link, router } from "expo-router";
import { useState } from "react";

export default function Register() {
  const [user, setUser] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  const handleSubscription = (value: { name: string; email: string }) => {
    if(!value.name.trim().length || !value.email.trim()){
      return Alert.alert("Erro", "Preencha todos os campos corretamente")
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
          <FontAwesome6
            name="user-circle"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="Nome completo"
            onChangeText={(value) => setUser({ ...user, name: value })}
          />
        </Input>
        <Input>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={(value) => setUser({ ...user, email: value })}
          />
        </Input>
      </View>

      <Button title="realizar inscrição" onPress={() => handleSubscription(user)} />

      <Link href="/" className="text-base text-white mt-8 font-bold">
        Já possui ingresso?
      </Link>
    </View>
  );
}
