import { View, Text } from "react-native";

export default function Chamada() {


  return (
    <View className="w-full mt-2">
      <View className="flex-row justify-between px-2 mb-2">
        <Text className="font-bold">Nome do aluno</Text>
        <Text className="font-bold">Presença</Text>
      </View>

        <View  className="flex-row justify-between items-center border-b px-2 py-2">
          <Text className="w-[75%] text-sm"></Text>
        </View>

      <Text className="text-right text-sm mt-2 text-gray-600">
        Total de alunos presentes: 
      </Text>
    </View>
  );
}
