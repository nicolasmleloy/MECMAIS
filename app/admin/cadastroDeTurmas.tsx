import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Header from "../components/header";
import { router, useLocalSearchParams } from "expo-router";
import BtnVoltar from "../components/btnVoltar";
import ConfirmacaoPopup from "../components/confirChama";

export default function cadastroDeTurmas(){
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [mostrarPopupEditar, setmostrarPopupEditar] = useState(false);
    const [formTurmaAtual, setFormTurmaAtual] = useState("");
    const [formTurmaEditado, setFormTurmaEditado] = useState("");
    const [idTurma, setIdTurma] = useState("");

    const params = useLocalSearchParams();
    const nomeBotao = params.modo === "editar" ? "Confirmar" : "Cadastrar";
    const titulo = params.modo === "editar" ? "Editar turma" : "Cadastrar turma";

    useEffect(() => {
        if(params.modo === "editar"){
            setIdTurma(params.idTurma as string)
            setFormTurmaAtual(params.turma as string)
            setFormTurmaEditado(params.turma as string)
        }
    }, [])

    function fecharPopupERedirecionar() {
        if(params.modo === "editar"){
            setmostrarPopupEditar(false);
        }else{
            setMostrarPopup(false);
        }
        router.push("/admin/listagemDeTurmas");
    }

    async function DadosTurmas(){
        const dadosEditar = {
            idTurma: idTurma,
            turma_atual: formTurmaAtual,
            turma_editado: formTurmaEditado
        }

        const dadosCadastrar = {
            turma: formTurmaEditado,
        }

        if(params.modo == "editar"){
            const resposta = await fetch("http://localhost/MECMAIS/router/turmaRouter.php?acao=update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosEditar)
            })

            const dadosResposta = await resposta.json()
            
            if(dadosResposta[0]){
                setmostrarPopupEditar(true);
            }else{
                window.alert(`Não foi possível editar!`)
            }

        }else{
            const resposta = await fetch("http://localhost/MECMAIS/router/turmaRouter.php?acao=create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosCadastrar)
            })

            const dadosResposta = await resposta.json()
            
            if(dadosResposta[0]){
                setMostrarPopup(true);
            }else{
                window.alert(`Turma já existe no banco de dados!`)
            }
        }

    }

    return (
        <View className="flex-1">
            <Header tipo="semPerfil"/>
            <Text className="flex justify-center mt-5 text-3xl">{titulo}</Text>
            <View className="flex-1 mt-5 items-center">
                <TextInput
                value={formTurmaEditado}
                onChangeText={setFormTurmaEditado}
                    placeholder="Nome"
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                />

                <TouchableOpacity onPress={DadosTurmas} className="w-[75%] bg-[#0a57d6] py-3.5 rounded-lg items-center shadow-md">
                    <Text className="text-white text-xl font-semibold">{nomeBotao}</Text>
                </TouchableOpacity>
            </View>
            
            <ConfirmacaoPopup function={() => null} Tipo_compon="ConfirmarComImagem" mensagem={`"${formTurmaEditado}" cadastrado com sucesso!`} visible={mostrarPopup} onClose={fecharPopupERedirecionar} />
            <ConfirmacaoPopup function={() => null} Tipo_compon="ConfirmarComImagem" mensagem={`"${formTurmaAtual}" editado com sucesso!`} visible={mostrarPopupEditar} onClose={fecharPopupERedirecionar} />
            <BtnVoltar/>
        </View>
    )
}