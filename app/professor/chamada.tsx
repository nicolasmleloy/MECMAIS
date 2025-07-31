import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Header from "../components/header";
import ConfirmacaoPopup from "../components/confirChama";
import BtnVoltar from "../components/btnVoltar";

interface Aluno {
  id: number;
  nome: string;
  presente: boolean;
}

interface Turma {
  id: number;
  nome_turma: string;
}

// const agora = new Date();
// const hora = agora.getHours();
// const minutos = agora.getMinutes();

// const horaAtual =  `${hora}:${minutos}`;
// console.log(horaAtual);

// if(horaAtual === "14:34"){
//   console.log("Em ponto!!!!!");
// }

export default function Chamada() {
  const [mostrarPopupConfirmar, setMostrarPopupConfirmar] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState<string>("");
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [totalPresentes, setTotalPresentes] = useState<number>(0);
  const [alunosPresentes, setAlunosPresentes] = useState<Aluno[]>([]);

  async function EnviarPresencas() {
    const ids = alunosPresentes.map(a => a.id);

    const resposta = await fetch("http://localhost/MECMAIS/router/chamadaRouter.php?acao=enviarPresencas", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ ids, turma: turmaSelecionada })
    });

    const dadosResposta = await resposta.json();
    console.log(dadosResposta)

    if (dadosResposta.erro) {
      window.alert(`Erro: ${dadosResposta.erro}`);
      return;
    }
    
    if (dadosResposta.mensagens && Array.isArray(dadosResposta.mensagens)) {
      window.alert(`${dadosResposta.mensagens.join("\n")}`);
    }else{
      setMostrarPopup(true);
    }

  }

  useEffect(() => {
    async function buscarTurmas() {
      const resposta = await fetch("http://localhost/MECMAIS/router/chamadaRouter.php?acao=buscarTurmas");
      const dados = await resposta.json();
      setTurmas(dados);
    }

    buscarTurmas();
  }, []);

  useEffect(() => {
    async function buscarAlunos() {
      if (turmaSelecionada === "") return;

      const resposta = await fetch(`http://localhost/MECMAIS/router/chamadaRouter.php?acao=buscarAlunos&turma=${turmaSelecionada}`);
      const dados = await resposta.json();
      const alunosFormatados = dados.map((aluno: any) => ({
        ...aluno,
        presente: false
      }));
      setAlunos(alunosFormatados);
      setTotalPresentes(0);
    }

    buscarAlunos();
  }, [turmaSelecionada]);

  const togglePresenca = (index: number) => {
    const copia = [...alunos];
    copia[index].presente = !copia[index].presente;
    setAlunos(copia);
    setTotalPresentes(copia.filter(a => a.presente).length);
    setAlunosPresentes(copia.filter(a => a.presente))
  };

  return (
    <View className= "flex-1 bg-white">
    <Header tipo="semPerfil" />
    <ScrollView className="w-full mt-4 px-4">
      <Text className="text-lg font-bold text-center mb-4">Chamada de Alunos</Text>

      <View className="border border-black-400 mb-4">
        <Picker
          selectedValue={turmaSelecionada}
          onValueChange={(value) => setTurmaSelecionada(value)}
          className="h-12 w-full"
        >
          <Picker.Item label="Selecione uma turma" value="" />
          {turmas.map((turma, index) => (
            <Picker.Item key={index} label={turma.nome_turma} value={turma.nome_turma} />
          ))}
        </Picker>
      </View>

      {alunos.length > 0 && (
        <>
          <View className="flex-row justify-between items-center border px-2 py-2 bg-gray-100 rounded-t-md">
            <Text className="font-bold w-[75%]">Nome do aluno</Text>
            <Text className="font-bold text-center w-[25%]">Presença</Text>
          </View>

          {alunos.map((aluno, index) => (
            <View key={aluno.id} className="flex-row justify-between items-center border-x border-b px-2 py-2">
              <Text className="text-sm w-[75%]">{aluno.nome}</Text>
              <TouchableOpacity onPress={() => togglePresenca(index)} className="w-[25%] items-center">
                <Text className="text-2xl">{aluno.presente ? "✅" : "❌"}</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View className="border px-2 py-2 rounded-b-md bg-gray-100">
            <Text className="text-right text-sm text-gray-700">
              Total de alunos presentes: {totalPresentes}
            </Text>
          </View>
        </>
      )}
    </ScrollView>

    <View className="px-4 py-4 mb-5">
      <TouchableOpacity
        className="bg-green-700 py-3 rounded-lg shadow-md mb-3"
        onPress={() => setMostrarPopupConfirmar(true)}
      >
        <Text className="text-white text-center font-semibold text-lg">Concluir</Text>
      </TouchableOpacity>
    
    </View>

    <ConfirmacaoPopup function={() => null} Tipo_compon="ConfirmarComImagem" mensagem="Enviado com sucesso!" visible={mostrarPopup} onClose={() => setMostrarPopup(false)} />
    <ConfirmacaoPopup function={() => EnviarPresencas()} Tipo_compon="Deletar" mensagem="Finalizar chamada?" visible={mostrarPopupConfirmar} onClose={() => setMostrarPopupConfirmar(false)} />
    <BtnVoltar/>
    </View>
  );
}
