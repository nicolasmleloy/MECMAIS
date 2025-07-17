import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Header from "../components/header";
import { useLocalSearchParams } from "expo-router";
import BtnVoltar from "../components/btnVoltar";

export default function cadastroDeTurmas(){
    const [formTurma, setFormTurma] = useState("");

    const params = useLocalSearchParams();
    const nomeBotao = params.modo === "editar" ? "Confirmar" : "Cadastrar";
    const titulo = params.modo === "editar" ? "Editar turma" : "Cadastrar turma";

    useEffect(() => {
        if(params.modo === "editar"){
            setFormTurma(params.turma as string)
        }
    }, [params])

    return (
        <View className="flex-1">
            <Header tipo="semPerfil"/>
            <Text className="flex justify-center mt-5 text-3xl">{titulo}</Text>
            <View className="flex-1 mt-5 items-center">
                <TextInput
                value={formTurma}
                onChangeText={setFormTurma}
                    placeholder="Nome"
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                />

                <TouchableOpacity className="w-[75%] bg-[#0a57d6] py-3.5 rounded-lg items-center shadow-md">
                    <Text className="text-white text-xl font-semibold">{nomeBotao}</Text>
                </TouchableOpacity>
            </View>

            <BtnVoltar/>
        </View>
    )
}