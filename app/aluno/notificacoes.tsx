import React, { useEffect, useState } from "react";
import { ScrollView, Text, View} from "react-native";
import Header from "../components/header";
import FooterOpcoes from "../components/footerOpcoes";
import Notificacao from "../components/notificacao";

export default function NotificacoesAlunoPais() {
    type notificacao = {
        titulo: string,
        mensagem: string
    }

    const [dadosNotificacao, setDadosNotificacao] = useState<notificacao[]>([]);

    async function ObterNotificações() {
        try {
            const resposta = await fetch("http://localhost/MECMAIS/router/notificacaoRouter.php?acao=obterNotificacoesAluno", {
                method: "GET"
            })

            const dadosResposta = await resposta.json();
            setDadosNotificacao(dadosResposta[0]);
            console.log(dadosResposta[0])
        } catch (error) {
            console.log("Erro: ", error);
        }
    }

    useEffect(() => {
        ObterNotificações();
    }, [])

    return (
        <View className="flex">
            <Header tipo="semPerfil"/>
                <View className="flex items-center mt-5">
                    <Text className="text-4xl font-semibold">Notificações</Text>
                </View>

            <ScrollView className="max-h-[550px]">
            {dadosNotificacao.map((notificacao) => (
                <View>
                    <Notificacao Titulo={notificacao.titulo} Mensagem={notificacao.mensagem}/>
                </View>
            ))}
            </ScrollView>

            <FooterOpcoes perfil="aluno" pagina='notificacoes'/>
        </View>

    )
}
