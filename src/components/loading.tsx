import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

export function Loading({ className, ...rest }: ActivityIndicatorProps) {
  return (
    <ActivityIndicator
      className={`bg-green-500 flex-1 items-center justify-center text-orange-500 ${className}`}
      {...rest}
    />
  );
}
