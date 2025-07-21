import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Header from "../components/header";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import BtnVoltar from "./btnVoltar";

export default function EditarCardapio() {
  const { dia, prato } = useLocalSearchParams();
  const router = useRouter();
  const [cardapio, setCardapio] = useState(prato || "");
  const [inputPesquisa, setInputPesquisa] = useState("");

  const [ingredientes, setIngredientes] = useState([
    { id: "1", nome: "Arroz", tipo: "kg", selecionado: true },
    { id: "2", nome: "Macarrão", tipo: "kg", selecionado: false },
    { id: "3", nome: "Carne", tipo: "kg", selecionado: false },
    { id: "4", nome: "Frango", tipo: "kg", selecionado: false },
    { id: "5", nome: "Peixe", tipo: "kg", selecionado: false },
    { id: "6", nome: "Óleo", tipo: "L", selecionado: false },
    { id: "7", nome: "Farinha", tipo: "kg", selecionado: false },
    { id: "8", nome: "Batata", tipo: "kg", selecionado: false },
    { id: "9", nome: "Cebola", tipo: "kg", selecionado: false },
    { id: "10", nome: "Tomate", tipo: "kg", selecionado: false },
    { id: "11", nome: "Cenoura", tipo: "kg", selecionado: false },
  ]);

  const alternarSelecionado = (id) => {
    setIngredientes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selecionado: !item.selecionado } : item
      )
    );
  };

  const ingredientesFiltrados = ingredientes.filter((item) =>
    item.nome.toLowerCase().includes(inputPesquisa.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white">
      <Header tipo="semPerfil" />

      <View className="flex-1 px-4 py-4">
        <Text className="text-lg font-bold text-gray-800 text-center mb-4">
          {dia || "Dia da Semana"}
        </Text>

        <TextInput
          placeholder="Escreva o cardápio do dia aqui"
          value={cardapio}
          onChangeText={setCardapio}
          className="border border-gray-300 rounded-lg p-3 bg-blue-50 text-gray-700 mb-4"
        />

        <Text className="text-sm text-black mb-2">
          Selecione os ingredientes do cardápio:
        </Text>

        <TextInput
          placeholder="Pesquisar ingrediente..."
          value={inputPesquisa}
          onChangeText={setInputPesquisa}
          className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700 mb-4"
        />

        <View className="flex-row justify-between px-2 py-2 bg-gray-200 rounded-md mb-2">
          <Text className="w-1/2 text-sm font-bold">Ingredientes</Text>
          <Text className="w-1/4 text-sm font-bold text-center">Tipo</Text>
          <Text className="w-1/4 text-sm font-bold text-center">Ação</Text>
        </View>

        <ScrollView className="max-h-[350px] border rounded-b-xl">
          {ingredientesFiltrados.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center justify-between px-2 py-2 border-b border-gray-300"
            >
              <Text className="w-1/2 text-gray-700">{item.nome}</Text>
              <Text className="w-1/4 text-gray-700 text-center">{item.tipo}</Text>
              <TouchableOpacity
                className="w-1/4 items-center"
                onPress={() => alternarSelecionado(item.id)}
              >
                <Ionicons
                  name={item.selecionado ? "checkbox" : "square-outline"}
                  size={22}
                  color={item.selecionado ? "#22c55e" : "#555"}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        className="bg-green-600 m-4 py-3 rounded-lg items-center"
        onPress={() => router.push("../cozinha/cardapio")}
      >
        <Text className="text-white text-lg font-bold">Concluir</Text>
      </TouchableOpacity>
      <BtnVoltar />
    </View>

  );
}
