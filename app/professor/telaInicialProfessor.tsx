import { Text, View,TouchableOpacity} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Header from "../components/header";
import { router } from "expo-router";
import React from "react";
import BtnVoltar from "../components/btnVoltar";

export default function TelaInicialProfessor() {
  const {tp} = useLocalSearchParams();
    const [dateTime, setDateTime] = useState(new Date());
    useEffect(() => {
      const timer = setInterval(() => {
      setDateTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleDateString('pt-BR');

  return (
    <View className="flex">
      <Header tipo="semPerfil"/>
      <View className="flex-1 justify-center items-center">
        <Text className="text-[30px] mb-6 font-bold text-black text-center">Olá Professor(a):</Text>

        <TouchableOpacity
        onPress={() => router.push("./chamada")}
        className="w-[75%] mb-4 rounded-lg overflow-hidden shadow-lg"
        >
        <View className="bg-green-700 py-2">
            <Text className="text-white text-center text-[20px] font-semibold">Chamada {formattedDate}</Text>
        </View>

        <View className="bg-gray-300 py-2">
            <Text className="text-center text-black text-sm font-medium">Editar</Text>
        </View>
        </TouchableOpacity>

      </View>
      <BtnVoltar/>
    </View>
  );
}
