import { Input } from "@/components/input";
import { View, Image, StatusBar, Alert } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { Link, router } from "expo-router";
import { useState } from "react";
import { api } from "@/server/api";
import { useBadgeStore } from "@/store/badge-store";
import axios from "axios";

const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33";
export default function Register() {
  const [user, setUser] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const badgeStore = useBadgeStore();
  
  const handleSubscription = async (value: { name: string; email: string }) => {
    try {
      if (!value.name.trim().length || !value.email.trim()) {
        return Alert.alert("Erro", "Preencha todos os campos corretamente");
      }
      setLoading(true);

      const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, {
        ...user,
      });

      if (registerResponse.data.attendeeId) {
        const badgeResponse = await api.get(
          `/attendees/${registerResponse.data.attendeeId}/badge`
        );

        badgeStore.save(badgeResponse.data.badge);

        Alert.alert("Sucesso", "Inscrição realizada com sucesso", [
          {
            text: "Ok",
            onPress: () => router.push("/ticket"),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (
          String(error.response?.data.message).includes("already registered")
        ) {
          return Alert.alert("Inscrição", "Este e-mail já está cadastrado!");
        }
      }

      Alert.alert("Inscrição", "Não foi possível fazer a inscrição");
    }
  };
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

      <Button
        title="realizar inscrição"
        isLoading={loading}
        onPress={() => handleSubscription(user)}
      />

      <Link href="/" className="text-base text-white mt-8 font-bold">
        Já possui ingresso?
      </Link>
    </View>
  );
}
