import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../components/header";
import BtnVoltar from "../components/btnVoltar";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function listagemDeUsuarios(){
    const dados = [
        { nome: "Nícolas Marcelo", Tipo: "Aluno" },
        { nome: "Ana Clara Ramos", Tipo: "Professora" },
        { nome: "Carlos Eduardo", Tipo: "Cozinha" },
        { nome: "Mariana Souza", Tipo: "Bibliotecária" },
        { nome: "Rafael Silva", Tipo: "Limpeza" },
        { nome: "Bianca Fernandes", Tipo: "Aluna" },
        { nome: "Lucas Pereira", Tipo: "TI" },
        { nome: "Juliana Costa", Tipo: "Professora" },
        { nome: "Thiago Alves", Tipo: "Aluno" },
        { nome: "Fernanda Gomes", Tipo: "Direção" },
        { nome: "Pedro Henrique", Tipo: "Cozinha" },
        { nome: "Isabela Duarte", Tipo: "Coordenação" },
        { nome: "Gabriel Santos", Tipo: "Manutenção" },
        { nome: "Larissa Oliveira", Tipo: "Aluna" },
        { nome: "Victor Lima", Tipo: "Professor" }
      ];

    return (
        <View className="flex">
            <Header tipo="semPerfil"/>
            
            <View className="mt-6 px-4">
                <View className="flex-row justify-between items-center border px-2 py-2 bg-gray-300 rounded-t-xl">
                    <Text className="font-bold text-start w-1/3">Nome</Text>
                    <Text className="font-bold text-center w-1/3">Tipo</Text>
                    <Text className="font-bold text-end w-1/3">Ações</Text>
                </View>
            {dados.map((item) => (
                <View className="flex-row justify-between items-center border-x border-b px-2 py-2">
                    <View className="text-sm w-1/3">
                        <Text className="text-start">{item.nome}</Text>
                    </View>
                    <View className="text-sm w-1/3">
                        <Text className="text-center">{item.Tipo}</Text>
                    </View>
                    <View className="flex-row justify-end gap-3 text-sm w-1/3">
                        <TouchableOpacity>
                            <Ionicons name="create-outline" size={20} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="trash-outline" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            </View>
            <BtnVoltar/>
        </View>
    )
}