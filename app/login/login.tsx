import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import Header from "../components/header";

export default function Login() {
  const {tp} = useLocalSearchParams();

  return (
    <View className="flex">
      <Header tipo="comPerfil"/>
      <View className="flex items-center">
        <Text className="text-xl text-dark-200 font-bold">Login {tp}</Text>
      </View>
    </View>
  );
}