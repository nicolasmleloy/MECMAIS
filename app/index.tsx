import { Link, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Header from "./components/header";
import React from "react";

export default function Index() {
  return (
    <View className="flex-1">
      <Header tipo="semPerfil" />
      
      <View className="flex-1 justify-between mt-10 px-10">
        <View className="gap-5">
          <TouchableOpacity
            onPress={() => router.push("/login/login?tp=professor")}
            className="flex justify-center items-center border w-full p-10 rounded-lg"
          >
            <Text className="text-xl font-semibold">Sou professor(a)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/login/login?tp=cozinha")}
            className="flex justify-center items-center border w-full p-10 rounded-lg"
          >
            <Text className="text-xl font-semibold">Sou cozinheiro(a)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/login/login?tp=aluno/responsavel")}
            className="flex justify-center items-center border w-full p-10 rounded-lg"
          >
            <Text className="text-xl font-semibold">
              Sou aluno/responsável
            </Text>
          </TouchableOpacity>
        </View>

      </View>
      <View className="ml-1 mb-1">
        <Link href="/login/login?tp=admin">
          <Text className="text-gray-500 text-xs">Área administrativa</Text>
        </Link>
      </View>
    </View>
  );
}
