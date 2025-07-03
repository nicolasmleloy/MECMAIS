import { router } from "expo-router";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Header from "./components/header";

export default function Index() {
  return (
    <View className="flex">
      <Header tipo="semPerfil"/>
      <View className="flex gap-5 mt-20 ml-10 mr-10">
        <TouchableOpacity onPress={() => router.push("/login/login?tp=professor")} className="flex justify-center items-center border w-70 p-10 rounded-lg">
          <Text className="text-xl font-semibold">Sou professor(a)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/login/login?tp=cozinha")} className="flex justify-center items-center border w-70 p-10 rounded-lg">
          <Text className="text-xl font-semibold">Sou cozinheiro(a)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/login/login?tp=aluno/responsavel")} className="flex justify-center items-center border w-70 p-10 rounded-lg">
          <Text className="text-xl font-semibold">Sou aluno/responsável</Text>
        </TouchableOpacity>
    </View>
    <View className="items-center justify-center pl-1 pt-1 mt-40 mb-4">
        <Link href="/politicaPrivacidade/politicaPrivacidade?t=/">
            <Text className="text-gray-600 text-center text-base font-medium">
            Política de Privacidade {"\n"}         e Segurança
            </Text>
        </Link>
    </View>

    </View>
  );
}
