import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Header from "../components/header";
import { router } from "expo-router";
import BtnVoltar from "../components/btnVoltar";

export default function TelaInicialProfessor() {
  const { id } = useLocalSearchParams(); 
  const [nome, setNome] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    if (!id) return;

    async function buscarNome() {
      try {
        const response = await fetch(`http://localhost/MECMAIS/router/chamadaRouter.php?acao=buscarNomeProfessor&id=${id}`);
        const data = await response.json();
        console.log(data)
        if (data.nome) {
          setNome(data.nome);
        } else {
          setNome("Desconhecido");
        }
      } catch (error) {
        setNome("Erro ao buscar nome");
      }
    }

    buscarNome();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleDateString("pt-BR");

  return (
    <View className="flex">
      <Header tipo="semPerfil" />
      <View className="flex-1 justify-center items-center">
        <Text className="text-[30px] mt-6 mb-6 font-bold text-black text-center">
          Olá Professor(a): {nome}
        </Text>

        <TouchableOpacity
          onPress={() => router.push("./chamada")}
          className="w-[75%] mb-4 rounded-lg overflow-hidden shadow-lg"
        >
          <View className="bg-green-700 py-2">
            <Text className="text-white text-center text-[20px] font-semibold">
              Chamada {formattedDate}
            </Text>
          </View>

          <View className="bg-gray-300 py-2">
            <Text className="text-center text-black text-sm font-medium">
              Editar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <BtnVoltar />
    </View>
  );
}
