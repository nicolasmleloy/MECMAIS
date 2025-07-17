import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import Header from "../components/header";
import { router } from "expo-router";
import BtnVoltar from "../components/btnVoltar";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function listagemDeTurmas(){
    const [inputPesquisa, setInputPesquisa] = useState("");
    
    const turmas = [
        "2024.1.144",
        "2024.1.145",
        "2024.1.146",
        "2024.1.147",
        "2024.1.148",
        "2024.1.149",
        "2024.1.150",
        "2024.1.151",
        "2024.1.152",
        "2024.1.153"
      ];
      

    const turmasFiltradas = turmas.filter(item => 
        item.toLocaleLowerCase().includes(inputPesquisa.toLocaleLowerCase())
    )

    return (
        <View className="flex">
            <Header tipo="semPerfil"/>
            <Text className="flex justify-center mt-5 text-3xl">Listagem de Turmas</Text>
            
            <View className="flex-row justify-center items-center gap-2 mt-5">
                <TextInput value={inputPesquisa}
                onChangeText={setInputPesquisa}
                placeholder="Digite a turma:" className="border rounded-lg p-2 w-[70%]" placeholderTextColor={"gray"}/>
            </View>
            

            <View className="mt-5 px-4">
                <View className="flex-row justify-between items-center border px-2 py-2 bg-gray-300 rounded-t-xl">
                    <Text className="font-bold text-start w-1/3">Turma</Text>
                    <Text className="font-bold text-end w-1/3">Ações</Text>
                </View>

                <ScrollView className="max-h-[350px] rounded-b-xl border-b">
                    {turmasFiltradas.map((item, index) => (
                        <View
                            key={index}
                            className="flex-row justify-between items-center border-x border-b px-2 py-2"
                        >
                            <View className="text-sm w-1/3">
                                <Text className="text-start">{item}</Text>
                            </View>
                            <View className="flex-row justify-end gap-3 text-sm w-1/3">
                                <TouchableOpacity onPress={() => router.push({
                                    pathname: "/admin/cadastroDeTurmas",
                                    params: {
                                        turma: item,
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
                <Text className="flex justify-end mt-2 text-gray-700">Total de alunos: {turmasFiltradas.length}</Text>
            </View>

            <View className="flex items-center mt-5">
                <TouchableOpacity onPress={() => router.push("/admin/cadastroDeTurmas")} 
                className="flex-row items-center gap-2 justify-center w-[70%] p-4 rounded-lg bg-green-700 shadow-md font-semibold text-white text-lg">
                Novo Cadastro
                <Ionicons name="add-outline" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            <BtnVoltar/>
        </View>
    )
}