import { Text, View } from "react-native";
import Header from "../components/header";

export default function TelaInicialProfessor() {
  return (
    <View className="flex">
      <Header tipo="semPerfil"/>
      <View>
      <Text className="text-5xl text-dark-200 font-bold">Tela inicial Professor</Text>
      </View>
    </View>
  );
}