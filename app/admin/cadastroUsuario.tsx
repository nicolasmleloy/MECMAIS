import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Header from "../components/header";
import { Picker } from "@react-native-picker/picker";

export default function CadastroUsuario() {
    const [perfil, setPerfil] = useState("");

    return (
        <View className="flex-1">
            <Header tipo="semPerfil"/>
            <Text className="flex justify-center mt-10 text-3xl">Cadastro de usuário</Text>
            <View className="flex-1 mt-10 items-center">
                <TextInput
                    placeholder="Nome"
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                />

                <TextInput
                    keyboardType="email-address"
                    placeholder="Email"
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                />
                
                <TextInput
                    placeholder="Senha"
                    secureTextEntry
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                />

                <TextInput
                    placeholder="Confirmar Senha"
                    secureTextEntry
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                />

                <Picker
                    onValueChange={setPerfil}
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                    dropdownIconColor="#000"
                    >
                    <Picker.Item label="Professor(a)" value="Professor(a)"/>
                    <Picker.Item label="Cozinheiro(a)" value="Cozinheiro(a)"/>
                    <Picker.Item label="Aluno(a)" value="Aluno(a)"/>
                </Picker>

                {perfil === "Aluno(a)" && (
                    <Picker
                        className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                        dropdownIconColor="#000"
                        >
                        <Picker.Item label="Ex.: 2024.1.144" value="Ex.: 2024.1.144"/>
                        <Picker.Item label="2024.1.144" value="2024.1.144" />
                        <Picker.Item label="2024.1.145" value="2024.1.145" />
                        <Picker.Item label="2024.1.146" value="2024.1.146" />
                        <Picker.Item label="2024.1.147" value="2024.1.147" />
                        <Picker.Item label="2024.1.148" value="2024.1.148" />
                    </Picker>
                )}

                <TouchableOpacity className="w-[75%] bg-[#0a57d6] py-3.5 rounded-lg items-center shadow-md">
                    <Text className="text-white text-xl font-semibold">Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}