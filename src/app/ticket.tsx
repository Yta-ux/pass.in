import { Button } from "@/components/button";
import { colors } from "@/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
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

export default function Ticket() {
  const [imageUri, setImageUri] = useState<string>("");
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  const handleAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (result.assets) {
        setImageUri(result.assets[0].uri);
        console.log(result.assets);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title="Minha Credencial" />
      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
      >
        <Credential
          imageUri={imageUri}
          onChangeAvatar={handleAvatar}
          onShowQRCode={() => setShowQRCode(true)}
        />
        <FontAwesome
          name="angle-double-down"
          color={colors.gray[300]}
          size={24}
          className="self-center my-6"
        />

        <Text className="text-2xl font-bold text-white mt-4">
          Compartilhar Credencial
        </Text>
        <Text className="font-regular text-white text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do Unite Summit!
        </Text>

        <Button title="Compartilhar" />

        <TouchableOpacity className="mt-10" activeOpacity={0.8}>
          <Text className="text-base font-bold text-white text-center">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showQRCode} statusBarTranslucent>
        <View className="flex-1 bg-green-500 items-center justify-center">
          <TouchableOpacity activeOpacity={0.8} onPress={() => setShowQRCode(false)}>
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
