import React from "react";
import { Text, View, Image } from "react-native";
import Header from "../components/header";
import FooterOpcoes from "../components/footerOpcoes";
import Notificacao from "../components/notificacao";

export default function NotificacoesCozinha() {
    return (
        <View className="flex">
            <Header tipo="semPerfil"/>
                <View className="flex items-center mt-5">
                    <Text className="text-4xl font-semibold">Notificações</Text>
                </View>

            <Notificacao Tipo="Atenção" Mensagem="O cardápio da semana já está disponível"/>
            <Notificacao Tipo="Aviso" Mensagem="A Turma 2024.1.144 não realizou a chamada"/>

            <FooterOpcoes perfil="cozinha" pagina='notificacoes'/>
        </View>

    )
}