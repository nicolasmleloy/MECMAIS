import React from "react";
import { Link, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Header from "./components/header";


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
            <Text className="text-xl font-semibold">Professor(a)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/login/login?tp=cozinha")}
            className="flex justify-center items-center border w-full p-10 rounded-lg"
          >
            <Text className="text-xl font-semibold">Cozinha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/login/login?tp=aluno")}
            className="flex justify-center items-center border w-full p-10 rounded-lg"
          >
            <Text className="text-xl font-semibold">
              Aluno(a)
            </Text>
          </TouchableOpacity>
        </View>

      </View>
      <View className="ml-1 mb-1 justufy-center w-full">
        <Link href="/login/login?tp=admin">
          <Text className="text-gray-500 text-xs text-center">Área administrativa</Text>
        </Link>
      </View>
    </View>
  );
}
