import React, { useEffect, useState } from 'react';
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

  const [qtdAlunosPresentes, setQtdAlunosPresentes] = useState(0);
  const [qtdAlunosEstimados, setQtdAlunosEstimados] = useState(0);

  async function QtdAlunosPresentes() {
    try {
      const resposta = await fetch("http://localhost/MECMAIS/router/chamadaRouter.php?acao=QtdAlunosPresentes", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
      })

      const dadosResposta = await resposta.json()
      setQtdAlunosPresentes(Number(dadosResposta[0].alunosPresentes));
    } catch (error) {
      console.log("Erro", error);
    }
  }

  useEffect(() => {
    QtdAlunosPresentes();
  }, [])

  useEffect(() => {
    if (!isNaN(qtdAlunosPresentes)) {
      const estimativa = Math.round(qtdAlunosPresentes + (qtdAlunosPresentes * 0.05));
      setQtdAlunosEstimados(estimativa);
    }
  }, [qtdAlunosPresentes]);

  const dadosAlimentos = [
    { "nome": "Arroz", "porcao_por_aluno_g": 120 },
    { "nome": "Feijão", "porcao_por_aluno_g": 90 },
    { "nome": "Carne Moída", "porcao_por_aluno_g": 100 },
    { "nome": "Macarrão", "porcao_por_aluno_g": 100 },
    { "nome": "Alface", "porcao_por_aluno_g": 30 },
    { "nome": "Tomate", "porcao_por_aluno_g": 20 },
    { "nome": "Maçã", "porcao_por_aluno_unidade": 1},
    { "nome": "Suco", "porcao_por_aluno_ml": 200 }
  ]

  function calcularIngredientes(dadosAlimentos: Alimento[], quantidadeAlunosEstimados: number): IngredienteCalculado[] {
    return dadosAlimentos.map(item => {
      if (item.porcao_por_aluno_g) {
        const totalGramas = item.porcao_por_aluno_g * quantidadeAlunosEstimados;
        if (totalGramas < 1000) {
          return { nome: item.nome, quantidade: `${Math.round(totalGramas)} g` };
        } else {
          const totalKg = totalGramas / 1000;
          return { nome: item.nome, quantidade: `${totalKg.toFixed(1)} kg` };
        }
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

  const ingredientesCalculados = calcularIngredientes(dadosAlimentos, qtdAlunosEstimados);


  return (
    <View className="flex">
      <Header tipo="semPerfil"/>
      <View className="flex items-center mt-2">
        <Text className="text-4xl font-semibold">Nutrição</Text>
      </View>

      <View className="flex-row ml-10 mr-10 mt-5 justify-between p-10 rounded-[20px] bg-[#E4ECFD] shadow">
        <View className="flex bg-gray-300 items-center justify-center gap-2 shadow p-2 rounded-[10px]">
          <Text className="text-xl">Chamada</Text>
          <Text className="text-3xl font-semibold">{qtdAlunosPresentes}</Text>
        </View>
        <View className="flex bg-gray-300 items-center justify-center gap-2 shadow p-2 rounded-[10px]">
          <Text className="text-xl">Estimativa</Text>
          <Text className="text-3xl font-semibold text-green-800">{qtdAlunosEstimados}</Text>
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