import { Text, View} from "react-native";
import Header from "../components/header";
import React from "react";
import FooterOpcoes from "../components/footerOpcoes";

export default function CardapioAlunoPais() {
    
  return (
    <View className="flex">
      <Header tipo="semPerfil"/>
      <Text className="text-lg font-bold">Cardapio Aluno</Text>
      <FooterOpcoes perfil="aluno" pagina='cardapio'/>
    </View>
  );
}
