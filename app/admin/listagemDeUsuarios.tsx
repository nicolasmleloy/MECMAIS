import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import Header from "../components/header";
import BtnVoltar from "../components/btnVoltar";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import ConfirmacaoPopup from "../components/confirChama";

export default function ListagemDeUsuarios() {
    interface Usuario {
        id: string;
        nome: string;
        tipo: string;
        email: string;
        senha: string;
        nome_turma: string;
    }

    const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
    const [usuarioRemovido, setUsuarioRemovido] = useState<string | null>(null);
    const [popUpRemovido, setPopUpRemovido] = useState(false);
    const [inputPesquisa, setInputPesquisa] = useState("");
    const [dadosResposta, setDadosResposta] = useState([]);
    const [dadosUsuarios, setDadosUsuarios] = useState<Usuario[]>([]);

    async function RemoverUsuario(idUsuario: string, nomeUsuario: string, tipoPerfil: string) {
        const dados = {
            idUsuario: idUsuario,
            tipoPerfil: tipoPerfil
        }
        
        const respostaUsuario = await fetch("http://localhost/MECMAIS/router/usuarioRouter.php?acao=delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })

        const dadosResposta = await respostaUsuario.json()
        console.log(dadosResposta);
        setUsuarioRemovido(nomeUsuario);
        setPopUpRemovido(true);
        setDadosResposta(dadosResposta)
    }

    async function BuscarUsuarios(){
        const respostaUsuarios = await fetch("http://localhost/MECMAIS/router/usuarioRouter.php?acao=buscarUsuarios", {
            method: "GET"
        })

        const dadosUsuarios = await respostaUsuarios.json();
        setDadosUsuarios(dadosUsuarios[0]);
    }

    useEffect(() => {
        BuscarUsuarios();
    }, [dadosResposta])
    
    const dadosFiltrados = dadosUsuarios.filter(item =>
        item.nome.toLocaleLowerCase().includes(inputPesquisa.toLocaleLowerCase()) || 
        item.tipo.toLocaleLowerCase().includes(inputPesquisa.toLocaleLowerCase())
    )

    return (
        <View className="flex-1">
            <Header tipo="semPerfil" />

            <Text className="flex justify-center mt-5 text-3xl">Listagem de Usuários</Text>
            
            <View className="flex-row justify-center items-center gap-2 mt-5">
                <TextInput value={inputPesquisa}
                onChangeText={setInputPesquisa}
                placeholder="Digite o nome ou tipo:" className="border rounded-lg p-2 w-[70%]" placeholderTextColor={"gray"}/>
            </View>
            

            <View className="mt-5 px-4">
                <View className="flex-row justify-between items-center border px-2 py-2 bg-gray-300 rounded-t-xl">
                    <Text className="font-bold text-start w-1/3">Nome</Text>
                    <Text className="font-bold text-center w-1/3">Tipo</Text>
                    <Text className="font-bold text-end w-1/3">Ações</Text>
                </View>

                <ScrollView className="max-h-[350px] rounded-b-xl border-b">
                    {dadosFiltrados.map((item, index) => (
                        <View
                            key={index}
                            className="flex-row justify-between items-center border-x border-b px-2 py-2"
                        >
                            <View className="text-sm w-1/3">
                                <Text className="text-start">{item.nome}</Text>
                            </View>
                            <View className="text-sm w-1/3">
                                <Text className="text-center">{item.tipo}</Text>
                            </View>
                            <View className="flex-row justify-end gap-3 text-sm w-1/3">
                                <TouchableOpacity onPress={() => router.push({
                                    pathname: "/admin/cadastroUsuario",
                                    params: {
                                        idUsuario: item.id,
                                        nome: item.nome,
                                        tipo: item.tipo,
                                        email: item.email,
                                        senha: item.senha,
                                        turma: item.nome_turma,
                                        modo: "editar"
                                    }
                                })}>
                                    <Ionicons name="create-outline" size={20} color="#000" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setUsuarioSelecionado(item)}>
                                    <Ionicons name="trash-outline" size={20} color="#000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <Text className="flex justify-end mt-2 text-gray-700">Total de usuários: {dadosFiltrados.length}</Text>
            </View>

            <View className="flex items-center mt-5">
                <TouchableOpacity onPress={() => router.push("/admin/cadastroUsuario")} 
                className="flex-row items-center gap-2 justify-center w-[70%] p-4 rounded-lg bg-green-700 shadow-md font-semibold text-white text-lg">
                <Text className="text-white text-lg">Novo Cadastro</Text>
                <Ionicons name="add-outline" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            <BtnVoltar />

            {usuarioSelecionado && (
                <ConfirmacaoPopup
                    function={() => {
                        RemoverUsuario(usuarioSelecionado.id, usuarioSelecionado.nome, usuarioSelecionado.tipo);
                        console.log(usuarioSelecionado.id, usuarioSelecionado.nome, usuarioSelecionado.tipo)
                        setUsuarioSelecionado(null);
                    }}
                    Tipo_compon="Deletar"
                    mensagem={`Deseja deletar "${usuarioSelecionado.nome}"?`}
                    visible={true}
                    onClose={() => setUsuarioSelecionado(null)}
                />
            )}

            <ConfirmacaoPopup
                function={() => setPopUpRemovido(false)}
                Tipo_compon="ConfirmarComImagem"
                mensagem={`${usuarioRemovido} removido com sucesso!`}
                visible={popUpRemovido}
                onClose={() => setPopUpRemovido(false)}
            />
        </View>
    );
}
