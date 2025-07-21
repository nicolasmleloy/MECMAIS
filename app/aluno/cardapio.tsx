import React, { useState } from "react";
import { Text, View } from "react-native";
import Header from "../components/header";
import FooterOpcoes from "../components/footerOpcoes";

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

        <View className="space-y-4 mr-5 ml-5">
          {Object.entries(cardapioSemana).map(([dia, prato], index) => (
            <View
              key={index}
              className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-200"
            >
              <Text className="text-lg font-bold text-gray-700">{dia}</Text>
              <Text className="text-sm text-gray-500 mt-1">{prato}</Text>
            </View>
          ))}
        </View>
      </View>

      <FooterOpcoes perfil="aluno" pagina="cardapio" />
    </View>
  );
}
