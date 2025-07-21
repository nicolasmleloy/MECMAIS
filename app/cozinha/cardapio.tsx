import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import Header from "../components/header";
import FooterOpcoes from "../components/footerOpcoes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function CardapioAluno() {
  const router = useRouter();

 
  
  

  return (
    <View className="flex-1 bg-white">
      <Header tipo="semPerfil" />

      <View className="flex-1 px-4 py-4">
        <Text className="text-xl font-bold text-gray-800 mb-6 text-center">
          Cardápio da semana
        </Text>

        <ScrollView className="flex-1 px-4 py-4 space-y-6">
          {Object.entries(cardapioSemana).map(([dia, { prato, ingredientes }], index) => (
            <View
              key={index}
              className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-200"
            >
              <View className="flex-row justify-between items-center mb-2">
                <View>
                  <Text className="text-lg font-bold text-gray-700">{dia}</Text>
                  <Text className="text-sm text-gray-500 mt-1">{prato}</Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "../components/editarcardapio",
                      params: { dia, prato },
                    })
                  }
                >
                  <Ionicons name="create-outline" size={22} color="#000" />
                </TouchableOpacity>
              </View>

              <View className="mt-2">
                <Text className="text-sm font-semibold text-gray-600 mb-1">Ingredientes:</Text>
                {ingredientes.map((ing, i) => (
                  <Text key={i} className="text-sm text-gray-500">
                    - {ing}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <FooterOpcoes perfil="cozinha" pagina="cardapio" />
    </View>
  );
}
