import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { dadosTurmas, Aluno } from "../dados";

export default function ListaAlunosPorTurma({ turma }: { turma: string }) {
  const turmaDados = dadosTurmas[turma];
  const [alunos, setAlunos] = useState<Aluno[]>(turmaDados?.alunos || []);
  const [totalPresentes, setTotalPresentes] = useState(turmaDados?.totalPresentes || 0);

  const togglePresenca = (index: number) => {
    const copia = [...alunos];
    copia[index].presente = !copia[index].presente;

    const novosPresentes = copia.filter((a) => a.presente).length;

    setAlunos(copia);
    setTotalPresentes(novosPresentes);

    dadosTurmas[turma].alunos = copia;
    dadosTurmas[turma].totalPresentes = novosPresentes;
  };

  useEffect(() => {
    if (turma && dadosTurmas[turma]) {
      setAlunos(dadosTurmas[turma].alunos);
      setTotalPresentes(dadosTurmas[turma].totalPresentes);
    }
  }, [turma]);

  return (
    <View className="mt-6 px-4">
      <View className="flex-row justify-between items-center border px-2 py-2 bg-gray-100 rounded-t-md">
        <Text className="font-bold w-[75%]">Nome do aluno</Text>
        <Text className="font-bold text-center w-[25%]">Presença</Text>
      </View>

      {alunos.map((aluno, index) => (
        <View
          key={index}
          className="flex-row justify-between items-center border-x border-b px-2 py-2"
        >
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
    </View>
  );
}
