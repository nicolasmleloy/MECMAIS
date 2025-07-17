import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../components/header";
import { router } from "expo-router";
import BtnVoltar from "../components/btnVoltar";

export default function opcoesAdm(){
    return (
        <View className="flex-1">
            <Header tipo="semPerfil"/>
            <Text className="flex w-full justify-center text-3xl font-semibold mt-10">Opções de Cadastro</Text>

            <View className="flex-1 justify-between mt-10 px-10">
                <View className="gap-5">
                    <TouchableOpacity
                    onPress={() => router.push("/admin/listagemDeUsuarios")}
                    className="flex justify-center items-center border w-full p-10 rounded-lg"
                    >
                    <Text className="text-xl font-semibold">Gerenciar Usuários</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => router.push("/admin/listagemDeTurmas")}
                    className="flex justify-center items-center border w-full p-10 rounded-lg"
                    >
                    <Text className="text-xl font-semibold">Gerenciar Turmas</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <BtnVoltar/>
        </View>
    )
}