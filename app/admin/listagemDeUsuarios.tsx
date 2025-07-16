import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import Header from "../components/header";
import BtnVoltar from "../components/btnVoltar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";

export default function ListagemDeUsuarios() {
    const [inputPesquisa, setInputPesquisa] = useState("");
    
    const dados = [
        { nome: "Nícolas Marcelo", tipo: "Aluno(a)", email: "nicolas.marcelo@email.com", senha: "senha123", turma: "2024.1.144" },
        { nome: "Ana Clara Ramos", tipo: "Professor(a)", email: "ana.ramos@email.com", senha: "senha456", turma: "" },
        { nome: "Carlos Eduardo", tipo: "Cozinheiro(a)", email: "carlos.eduardo@email.com", senha: "senha789", turma: "" },
        { nome: "Mariana Souza", tipo: "Professor(a)", email: "mariana.souza@email.com", senha: "prof321", turma: "" },
        { nome: "Rafael Silva", tipo: "Cozinheiro(a)", email: "rafael.silva@email.com", senha: "cozinheiro123", turma: "" },
        { nome: "Bianca Fernandes", tipo: "Aluno(a)", email: "bianca.fernandes@email.com", senha: "senha234", turma: "2024.1.145" },
        { nome: "Lucas Pereira", tipo: "Aluno(a)", email: "lucas.pereira@email.com", senha: "senha345", turma: "2024.1.146" },
        { nome: "Juliana Costa", tipo: "Professor(a)", email: "juliana.costa@email.com", senha: "senha456", turma: "" },
        { nome: "Thiago Alves", tipo: "Aluno(a)", email: "thiago.alves@email.com", senha: "senha567", turma: "2024.1.147" },
        { nome: "Fernanda Gomes", tipo: "Professor(a)", email: "fernanda.gomes@email.com", senha: "prof567", turma: "" },
        { nome: "Pedro Henrique", tipo: "Cozinheiro(a)", email: "pedro.henrique@email.com", senha: "senha890", turma: "" },
        { nome: "Isabela Duarte", tipo: "Professor(a)", email: "isabela.duarte@email.com", senha: "senha910", turma: "" },
        { nome: "Gabriel Santos", tipo: "Cozinheiro(a)", email: "gabriel.santos@email.com", senha: "coz456", turma: "" },
        { nome: "Larissa Oliveira", tipo: "Aluno(a)", email: "larissa.oliveira@email.com", senha: "senha678", turma: "2024.1.148" },
        { nome: "Victor Lima", tipo: "Professor(a)", email: "victor.lima@email.com", senha: "prof789", turma: "" }
    ];    
    
    const dadosFiltrados = dados.filter(item => 
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
                                        nome: item.nome,
                                        tipo: item.tipo,
                                        email: item.email,
                                        senha: item.senha,
                                        turma: item.turma,
                                        modo: "editar"
                                    }
                                })}>
                                    <Ionicons name="create-outline" size={20} color="#000" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Ionicons name="trash-outline" size={20} color="#000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <Text className="flex justify-end mt-2 text-gray-700">Total de alunos: {dadosFiltrados.length}</Text>
            </View>
            <BtnVoltar />

            <View className="flex items-center mt-5">
                <TouchableOpacity onPress={() => router.push("/admin/cadastroUsuario")} 
                className="flex-row items-center gap-2 justify-center w-[70%] p-4 rounded-lg bg-green-700 shadow-md font-semibold text-white text-lg">
                Novo Cadastro
                <Ionicons name="add-outline" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
