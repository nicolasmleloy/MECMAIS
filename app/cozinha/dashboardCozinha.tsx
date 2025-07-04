import { Text, View } from "react-native";
import Header from "../components/header";

export default function DashboardCozinha() {
  return (
    <View className="flex">
      <Header tipo="semPerfil"/>
      <View>
      <Text className="text-5xl text-dark-200 font-bold">Dashboard cozinha</Text>
      </View>
    </View>
  );
}