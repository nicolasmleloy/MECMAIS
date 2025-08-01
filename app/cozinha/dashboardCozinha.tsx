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
  const [ingredientesDoDia, setingredientesDoDia] = useState([]);
  
  function capturarDiaDaSemana(){
    const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const dataAtual = new Date();
    const numeroDia = dataAtual.getDay();
    const diaSemana = diasDaSemana[numeroDia];

    return diaSemana;
  }

  async function PegarIngredientesDoDia() {
    try {
      const resposta = await fetch("http://localhost/MECMAIS/router/cardapioRouter.php?acao=capturarIngredientes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({diaDaSemana: capturarDiaDaSemana()})
      })

      const dadosResposta = await resposta.json()
      setingredientesDoDia(dadosResposta)
    } catch (error) {
      console.log("Erro", error);
    }
  }

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
    PegarIngredientesDoDia();
  }, [])

  useEffect(() => {
    if (!isNaN(qtdAlunosPresentes)) {
      const estimativa = Math.round(qtdAlunosPresentes + (qtdAlunosPresentes * 0.05));
      setQtdAlunosEstimados(estimativa);
    }
  }, [qtdAlunosPresentes]);

  const dadosAlimentos = [
    { nome: "Arroz", porcao_por_aluno_g: 100 },
    { nome: "Feijão", porcao_por_aluno_g: 120 },
    { nome: "Frango", porcao_por_aluno_g: 150 },
    { nome: "Salada de alface", porcao_por_aluno_g: 50 },
    { nome: "Macarrão", porcao_por_aluno_g: 130 },
    { nome: "Ovo cozido", porcao_por_aluno_unidade: 1 },
    { nome: "Banana", porcao_por_aluno_unidade: 1 },
    { nome: "Leite", porcao_por_aluno_ml: 200 },
    { nome: "Pão francês", porcao_por_aluno_unidade: 1 },
    { nome: "Carne moída", porcao_por_aluno_g: 140 }
  ];

  const ingredientesFiltradosCalculados: IngredienteCalculado[] = ingredientesDoDia.map((ingrediente: any) => {
    const alimento = dadosAlimentos.find(item => item.nome.toLowerCase() === ingrediente.nome.toLowerCase());
  
    if (alimento) {
      if (alimento.porcao_por_aluno_g) {
        const totalGramas = alimento.porcao_por_aluno_g * qtdAlunosEstimados;
        if (totalGramas < 1000) {
          return { nome: alimento.nome, quantidade: `${Math.round(totalGramas)} g` };
        } else {
          const totalKg = totalGramas / 1000;
          return { nome: alimento.nome, quantidade: `${totalKg.toFixed(1)} kg` };
        }
      }
  
      if (alimento.porcao_por_aluno_ml) {
        const totalLitros = (alimento.porcao_por_aluno_ml * qtdAlunosEstimados) / 1000;
        return { nome: alimento.nome, quantidade: `${Math.round(totalLitros)} l` };
      }
  
      if (alimento.porcao_por_aluno_unidade) {
        return {
          nome: alimento.nome,
          quantidade: `${Math.round(alimento.porcao_por_aluno_unidade * qtdAlunosEstimados)} un`
        };
      }
    }
  
    return null;
  }).filter(Boolean) as IngredienteCalculado[];

  const ingredientesCalculados = ingredientesFiltradosCalculados;

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

      <Text className="flex justify-center mt-5 text-2xl">Ingredientes Estimados</Text>
      <Text className="flex justify-center mb-5 text-xl text-gray-600 mt-2">{capturarDiaDaSemana()}</Text>
      <ScrollView className="flex max-h-[200px] ml-5 mr-5 gap-2 shadow-gray shadow rounded-lg p-3">
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