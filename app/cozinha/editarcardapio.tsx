import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Header from "../components/header";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import BtnVoltar from "../components/btnVoltar";

export default function EditarCardapio() {
  interface Cardapio {
    id: string;
    nome: string;
    tipo_porcao: string;
    selecionado?: boolean;
  }

  const [ingredientes, setIngredientes] = useState<Cardapio[]>([]);
  const { dia, prato } = useLocalSearchParams();
  const router = useRouter();
  const [cardapio, setCardapio] = useState(prato || "");
  const [inputPesquisa, setInputPesquisa] = useState("");

  const alternarSelecionado = (id: string) => {
    setIngredientes((prevIngredientes) => {
      const novosIngredientes = prevIngredientes.map((item) =>
        item.id === id ? { ...item, selecionado: !item.selecionado } : item
      );
  
      const selecionados = novosIngredientes.filter((item) => item.selecionado);
      console.log("Selecionados:", selecionados.map((i) => i.nome));
  
      return novosIngredientes;
    });
  };

  const ingredientesFiltrados = ingredientes.filter((item) =>
    item.nome.toLowerCase().includes(inputPesquisa.toLowerCase()) ||
    item.tipo_porcao?.toLowerCase().includes(inputPesquisa.toLowerCase())
  );

  useEffect(() => {
    async function carregarIngredientes() {
      try {
        const resIngredientes = await fetch("http://localhost/MECMAIS/router/cardapioRouter.php?acao=buscarIngredientes");
        const resCardapioDia = await fetch("http://localhost/MECMAIS/router/cardapioRouter.php?acao=buscarCardapioSemana");

        const dadosIngredientes = await resIngredientes.json();
        const dadosCardapio = await resCardapioDia.json();

        const ingredientesSelecionados = dadosCardapio[dia]?.ingredientes || [];

        const listaIngredientes = Array.isArray(dadosIngredientes[0]) ? dadosIngredientes[0] : dadosIngredientes;

        const ingredientesComStatus = listaIngredientes.map((item: Cardapio) => ({
          ...item,
          selecionado: ingredientesSelecionados.includes(item.nome),
        }));

        setIngredientes(ingredientesComStatus);
      } catch (error) {
        console.error("Erro ao buscar ingredientes:", error);
      }
    }

    carregarIngredientes();
  }, []);

  async function salvarCardapio() {
    const ingredientesSelecionados = ingredientes
      .filter((item) => item.selecionado)
      .map((item) => item.id);

    try {
      const resposta = await fetch("http://localhost/MECMAIS/router/cardapioRouter.php?acao=salvarCardapio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dia,
          prato: cardapio,
          ingredientes: ingredientesSelecionados,
        }),
      });

      const resultado = await resposta.json();
      console.log(resultado);

      if (resultado.status === "sucesso") {
        alert("Cardápio salvo com sucesso!");
        router.push("../cozinha/cardapio");
      } else {
        alert("Erro ao salvar cardápio.");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  }

  return (
    <View className="flex-1 bg-white">
      <Header tipo="semPerfil" />

      <View className="flex px-4 py-4">
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

        <ScrollView className="max-h-[300px] border rounded-b-xl">
          {ingredientesFiltrados.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center justify-between px-2 py-2 border-b border-gray-300"
            >
              <Text className="w-1/2 text-gray-700">{item.nome}</Text>
              <Text className="w-1/4 text-gray-700 text-center">{item.tipo_porcao}</Text>
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
        onPress={salvarCardapio}
      >
        <Text className="text-white text-lg font-bold">Concluir</Text>
      </TouchableOpacity>

      <BtnVoltar />
    </View>
  );
}
