import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView} from "react-native";
import Header from "../components/header";
import FooterOpcoes from "../components/footerOpcoes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";

export default function CardapioAluno() {
  const [cardapioSemana] = useState({
    "Segunda-feira": "Arroz com carne",
    "Terça-feira": "Feijão tropeiro",
    "Quarta-feira": "Frango assado",
    "Quinta-feira": "Macarrão ao molho",
    "Sexta-feira": "Peixe frito com salada",
  });

  return (
    <View className="flex-1 bg-white">
      <Header tipo="semPerfil" />

      <View className="flex-1 px-4 py-4">
        <Text className="text-xl font-bold text-gray-800 mb-6 text-center">
          Cardápio da semana
        </Text>

        <ScrollView className="flex gap-5 mr-5 ml-5">
          {Object.entries(cardapioSemana).map(([dia, prato], index) => (
            <View
              key={index}
              className="flex-row justify-between items-center bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-200"
            >
              <View>
                  <Text className="text-lg font-bold text-gray-700">{dia}</Text>
                  <Text className="text-sm text-gray-500 mt-1">{prato}</Text>
                  <Text className="text-sm text-gray-500 mt-1">{}</Text>
              </View>
              <TouchableOpacity>
                    <Ionicons name="create-outline" size={20} color="#000" />
                </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <FooterOpcoes perfil="aluno" pagina="cardapio" />
    </View>
  );
}
