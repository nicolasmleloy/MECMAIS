import { Text, View} from "react-native";
import Header from "../components/header";
import React from "react";
import FooterOpcoes from "../components/footerOpcoes";

export default function CardapioAlunoPais() {
    
  return (
    <View className="flex">
      <Header tipo="semPerfil"/>
      <Text className="text-lg font-bold">Cardapio AlunoPais</Text>
      <FooterOpcoes perfil="aluno/pais" pagina='cardapio'/>
    </View>
  );
}
