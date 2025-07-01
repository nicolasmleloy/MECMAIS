import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Login() {
  const {tp} = useLocalSearchParams();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl text-dark-200 font-bold">Login {tp}</Text>
    </View>
  );
}