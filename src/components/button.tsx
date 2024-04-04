import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import { Loading } from "./loading";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, isLoading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.8}
      className="bg-orange-500 w-full h-14 flex-row items-center justify-center rounded-lg"
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          className={`"bg-orange-500 text-green-500 flex-1 items-center justify-center`}
        />
      ) : (
        <Text className="font-bold text-base text-green-500 uppercase">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
