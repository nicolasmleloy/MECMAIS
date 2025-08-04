import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import Header from "../components/header";
import FooterOpcoes from "../components/footerOpcoes";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

export default function CardapioAluno() {
  const router = useRouter();
  const [cardapioSemana, setCardapioSemana] = useState<any>({});

  useEffect(() => {
    async function buscarCardapio() {
      try {
        const response = await fetch("http://localhost/MECMAIS/router/cardapioRouter.php?acao=buscarCardapioSemana");
        const data = await response.json();
        setCardapioSemana(data);
      } catch (error) {
        console.error("Erro ao carregar cardápio:", error);
      }
    }

    buscarCardapio();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <Header tipo="semPerfil" />

      <View className="flex-1 px-4 py-4">
        <Text className="text-xl font-bold text-gray-800 mb-6 text-center">
          Cardápio da semana
        </Text>

        <ScrollView className="flex-1 px-1 py-1 mr-5 ml-5">
          <View className="pb-28">
            {Object.entries(cardapioSemana).map(([dia, { prato, ingredientes }]: any, index) => (
              <View
                key={index}
                className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-200 mb-6"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <View>
                    <Text className="text-lg font-bold text-gray-700">{dia}</Text>
                    <Text className="text-sm text-gray-500 mt-1">
                      {prato || "Nenhum prato cadastrado"}
                    </Text>
                  </View>
                </View>

                {ingredientes.length > 0 && (
                  <View className="mt-2">
                    <Text className="text-sm font-semibold text-gray-600 mb-1">
                      Ingredientes:
                    </Text>
                    {ingredientes.map((ing: string, i: number) => (
                      <Text key={i} className="text-sm text-gray-500">
                        - {ing}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <FooterOpcoes perfil="aluno" pagina="cardapio" />
    </View>
  );
}
