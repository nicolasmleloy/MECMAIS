import { Text, View } from "../../node_modules/react-native";
import Header from "../components/header";

export default function Notificacoes() {
    return (
    <View className="flex">
      <Header tipo="semPerfil"/>
      <View className="flex items-center mt-5">
        <Text className="text-4xl font-semibold">Nutrição</Text>
      </View>

      <View className="flex-row m-10 justify-between p-10 rounded-[20px] bg-[#E4ECFD] shadow">
        <View className="flex bg-gray-300 items-center justify-center gap-2 shadow p-2 rounded-[10px]">
          <Text className="text-xl">Estimativa</Text>
          <Text className="text-3xl font-semibold">132</Text>
        </View>
    )
}