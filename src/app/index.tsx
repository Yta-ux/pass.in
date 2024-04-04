import { Input } from "@/components/input";
import { View, Image, StatusBar, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { Link, Redirect, router } from "expo-router";
import { useState } from "react";
import { api } from "@/server/api";
import { useBadgeStore } from "@/store/badge-store";

export default function Home() {
  const [ticket, setTicket] = useState("");
  const [loading, setLoading] = useState(false);
  const badgeStore = useBadgeStore();

  const handleSubmitTicket = async (value: string) => {
    try {
      if (!value.trim()) {
        return Alert.alert("Erro", "Preencha o campo de código do ingresso");
      }
      setLoading(true);

      const { data } = await api.get(`/attendees/${value}/badge`);
      badgeStore.save(data.badge);
    } catch (error) {
      console.log(error);
      setLoading(false);

      Alert.alert("Ingresso", "Ingresso não encontrado");
    }
  };

  if(badgeStore.data?.checkInURL){
    return <Redirect href="/ticket" />
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
          <Input.Field
            placeholder="Código do ingresso"
            keyboardType="numeric"
            onChangeText={(value) => setTicket(value)}
          />
        </Input>
      </View>

      <Button
        title="ACESSAR CREDENCIAL"
        isLoading={loading}
        onPress={() => handleSubmitTicket(ticket)}
      />

      <Link href="/register" className="text-base text-white mt-8 font-bold">
        Ainda não possui ingresso?
      </Link>
    </View>
  );
}
