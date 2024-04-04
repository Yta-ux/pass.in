import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { QRCode } from "@/components/qrcode";

interface CredentialProps {
  imageUri?: string;
  onChangeAvatar?: () => void;
  onShowQRCode?: () => void;
}

export function Credential({ imageUri, onChangeAvatar, onShowQRCode }: CredentialProps) {
  return (
    <View className="w-full self-stretch items-center">
      <Image
        source={require("@/assets/ticket/band.png")}
        className="w-24 h-52 z-10"
      />
      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          source={require("@/assets/ticket/header.png")}
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
        >
          <View className="flex-row w-full justify-between">
            <Text className=" text-zinc-50 text-sm font-bold">
              Unite Summit
            </Text>
            <Text className=" text-zinc-50 text-sm font-bold">#123</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>
        {imageUri ? (
          <TouchableOpacity
            activeOpacity={0.8}
            className="items-center justify-center"
            onPressOut={onChangeAvatar}
          >
            <Image
              source={{ uri: imageUri }}
              className="w-36 h-36 rounded-full -mt-24"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center"
            onPressOut={onChangeAvatar}
          >
            <Feather name="camera" color={colors.green[400]} size={32} />
          </TouchableOpacity>
        )}

        <Text className="text-zinc-50 text-2xl font-bold mt-4">
          Ítalo Gustavo
        </Text>
        <Text className="text-zinc-300 mt-1 text-base font-regular mb-4">
          itamelo555@gmail.com
        </Text>

        <QRCode value="teste" size={120} />

        <TouchableOpacity className="mt-6" activeOpacity={0.8} onPress={onShowQRCode}>
          <Text className="text-sm font-body text-orange-500">
            Ampliar QRCode
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
