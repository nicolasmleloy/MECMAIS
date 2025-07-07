import { Text, View } from "react-native";
import Header from "../components/header";

export default function DashboardCozinha() {
  return (
    <View className="flex">
      <Header tipo="semPerfil"/>
      <View className="">
        <Text className="text-5xl text-dark-200 text-center mt-[30]">Nutrição</Text>
      </View>
    </View>
  );
}