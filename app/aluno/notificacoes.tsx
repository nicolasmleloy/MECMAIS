import { Text, View} from "react-native";
import Header from "../components/header";
import React from "react";
import FooterOpcoes from "../components/footerOpcoes";

export default function NotificacoesAlunoPais() {
    
  return (
    <View className="flex">
      <Header tipo="semPerfil"/>
      <Text className="text-lg font-bold">Notificações AlunoPais</Text>
      <FooterOpcoes perfil="aluno" pagina='notificacoes'/>
    </View>
  );
}
