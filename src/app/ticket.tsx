import { Button } from "@/components/button";
import { colors } from "@/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Share,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "@/components/header";
import { Credential } from "@/components/credential";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { QRCode } from "@/components/qrcode";
import { useBadgeStore } from "@/store/badge-store";
import { Redirect, router } from "expo-router";
import { MotiView } from "moti";

export default function Ticket() {
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const badgeStore = useBadgeStore();

  const handleShare = async () => {
    try {
      if (badgeStore.data?.checkInURL) {
        await Share.share({
          message: badgeStore.data.checkInURL,
        });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Compartilhar", "Não foi possível compartilhar.");
    }
  };
  const handleAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (result.assets) {
        badgeStore.updateAvatar((result.assets[0].uri));
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Foto", "Não foi possível selecionar a imagem.")
    }
  };

  if (!badgeStore.data?.checkInURL) {
    return <Redirect href="/" />;
  }
  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title="Minha Credencial" />
      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential
          data={badgeStore.data}
          onChangeAvatar={handleAvatar}
          onShowQRCode={() => setShowQRCode(true)}
        />
        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: 10,
          }}
          transition={{
            loop: true,
            type: "timing",
            duration: 700,
          }}
        >
          <FontAwesome
            name="angle-double-down"
            color={colors.gray[300]}
            size={24}
            className="self-center my-6"
          />
        </MotiView>

        <Text className="text-2xl font-bold text-white mt-4">
          Compartilhar Credencial
        </Text>
        <Text className="font-regular text-white text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do evento {badgeStore.data.eventTitle}!
        </Text>

        <Button title="Compartilhar" onPress={() => handleShare()} />

        <TouchableOpacity
          className="mt-10"
          activeOpacity={0.8}
          onPress={() => badgeStore.remove()}
        >
          <Text className="text-base font-bold text-white text-center">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showQRCode} statusBarTranslucent>
        <View className="flex-1 bg-green-500 items-center justify-center">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowQRCode(false)}
          >
            <QRCode value="teste" size={200} />
            <Text className="text-sm font-bold text-center text-orange-500 mt-10">
              Fechar QRCode
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
