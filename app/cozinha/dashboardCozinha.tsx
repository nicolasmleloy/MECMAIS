import React from 'react';
import { ScrollView, Text, View } from "react-native";
import Header from "../components/header";
import FooterOpcoes from '../components/footerOpcoes';

export default function DashboardCozinha() {
  type Alimento = {
    nome: string;
    porcao_por_aluno_g?: number;
    porcao_por_aluno_ml?: number;
    porcao_por_aluno_unidade?: number;
    peso_estimado_g?: number;
  };
  
  type IngredienteCalculado = {
    nome: string;
    quantidade: string;
  };

  const dadosAlimentos = [
    { "nome": "Arroz", "porcao_por_aluno_g": 120 },
    { "nome": "Feijão", "porcao_por_aluno_g": 90 },
    { "nome": "Carne Moída", "porcao_por_aluno_g": 100 },
    { "nome": "Macarrão", "porcao_por_aluno_g": 100 },
    { "nome": "Alface", "porcao_por_aluno_g": 30 },
    { "nome": "Tomate", "porcao_por_aluno_g": 20 },
    { "nome": "Maçã", "porcao_por_aluno_unidade": 1, "peso_estimado_g": 100 },
    { "nome": "Suco", "porcao_por_aluno_ml": 200 }
  ]

  function calcularIngredientes(dadosAlimentos: Alimento[], quantidadeAlunosEstimados: number): IngredienteCalculado[] {
    return dadosAlimentos.map(item => {
      if (item.porcao_por_aluno_g) {
        const totalKg = (item.porcao_por_aluno_g * quantidadeAlunosEstimados) / 1000;
        return { nome: item.nome, quantidade: `${Math.round(totalKg)} kg` };
      }
      if (item.porcao_por_aluno_ml) {
        const totalLitros = (item.porcao_por_aluno_ml * quantidadeAlunosEstimados) / 1000;
        return { nome: item.nome, quantidade: `${Math.round(totalLitros)}l` };
      }
      if (item.porcao_por_aluno_unidade) {
        return { nome: item.nome, quantidade: `${Math.round(item.porcao_por_aluno_unidade * quantidadeAlunosEstimados)} uni` };
      }
      return { nome: item.nome, quantidade: "N/A" };
    });
  }

  const quantidadeAlunos = 128;
  const quantidadeAlunosEstimados = Math.round(quantidadeAlunos + (quantidadeAlunos * 0.05));
  const ingredientesCalculados = calcularIngredientes(dadosAlimentos, quantidadeAlunosEstimados);

  return (
    <View className="flex">
      <Header tipo="semPerfil"/>
      <View className="flex items-center mt-2">
        <Text className="text-4xl font-semibold">Nutrição</Text>
      </View>

      <View className="flex-row ml-10 mr-10 mt-5 justify-between p-10 rounded-[20px] bg-[#E4ECFD] shadow">
        <View className="flex bg-gray-300 items-center justify-center gap-2 shadow p-2 rounded-[10px]">
          <Text className="text-xl">Chamada</Text>
          <Text className="text-3xl font-semibold">{quantidadeAlunos}</Text>
        </View>
        <View className="flex bg-gray-300 items-center justify-center gap-2 shadow p-2 rounded-[10px]">
          <Text className="text-xl">Estimativa</Text>
          <Text className="text-3xl font-semibold text-green-800">{quantidadeAlunosEstimados}</Text>
        </View>
      </View>

      <Text className="flex justify-center mt-5 mb-5 text-xl">Ingredientes Estimados</Text>
      <ScrollView className="flex max-h-[200px] ml-5 mr-5 gap-2">
        {ingredientesCalculados.map((item, index) => (
        <View key={index} className="w-full flex-row justify-between px-4">
          <Text className="text-base font-semibold">{item.nome}:</Text>
          <Text className="text-base font-semibold">{item.quantidade}</Text>
        </View>
      ))}
      </ScrollView>

      <FooterOpcoes perfil="cozinha" pagina='dashboard'/>
    </View>
  );
}