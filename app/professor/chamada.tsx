import { View, Text, TouchableOpacity, ScrollView} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from "react";
import { router } from "expo-router";
import Header from "../components/header";

export default function Chamada() {
  const [turmaSelecionada, setTurmaSelecionada] = useState("");

  return (
    <ScrollView className="flex-1 bg-white">
      <Header tipo="semPerfil" />

      <View className="items-center px-4 py-2">
        <Text className="text-[50px] mb-6 font-bold text-black text-center">Chamada</Text>
        <Text className="text-[20px] text-gray-500 mb-4">Selecione a turma</Text>

        <TouchableOpacity
          onPress={() => setTurmaSelecionada("20241A4")}
          className="border border-gray-400 rounded-md px-4 py-2 w-full mb-4"
        >
          <Text className="text-black">"Ex: 20241A4"</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/")}
          className="mt-8 w-full bg-green-700 py-3 rounded-lg shadow-md">
          <Text className="text-white text-center font-semibold text-lg">Concluir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("./telaInicialProfessor")}
          className="mt-3">
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
