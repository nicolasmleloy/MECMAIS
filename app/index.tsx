import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Header from "./components/header";

export default function Index() {
  return (
    <View className="flex">
      <Header tipo="comPerfil"/>
      <View className="flex gap-5">
        <TouchableOpacity onPress={() => router.push("/login/login?tp=professor")} className="flex justify-center items-center border w-70 p-10 rounded-lg">
          <Text className="text-2xl">Sou professor(a)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/login/login?tp=cozinha")} className="flex justify-center items-center border w-70 p-10 rounded-lg">
          <Text className="text-2xl">Sou cozinheiro(a)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/login/login?tp=aluno/responsavel")} className="flex justify-center items-center border w-70 p-10 rounded-lg">
          <Text className="text-2xl">Sou aluno/responsável</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
