import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import Header from "../components/header";
import SelecaoTurma from "../components/Turmasele";
import ListaAlunosPorTurma from "../components/listaAlunos";
import ConfirmacaoPopup from "../components/confirChama";

export default function Chamada() {
  const [turmaSelecionada, setTurmaSelecionada] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);

  return (
    <View className="flex-1 bg-white">
      <Header tipo="semPerfil" />

      <ScrollView className="flex-1 px-4 pt-6">
        <Text className="text-3xl font-bold text-black text-center mb-2">Chamada</Text>

        <SelecaoTurma
          turmaSelecionada={turmaSelecionada}
          setTurmaSelecionada={setTurmaSelecionada}
        />

        {turmaSelecionada !== "" && (
          <ListaAlunosPorTurma turma={turmaSelecionada} />
        )}
      </ScrollView>

      <View className="px-4 py-4">
        <TouchableOpacity
          className="bg-green-700 py-3 rounded-lg shadow-md mb-3"
          onPress={() => setMostrarPopup(true)}
        >
          <Text className="text-white text-center font-semibold text-lg">Concluir</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("./telaInicialProfessor")}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <ConfirmacaoPopup visible={mostrarPopup} onClose={() => setMostrarPopup(false)} />
    </View>
  );
}
