import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../components/header";

export default function cadastroDeTurmas(){
    return (
        <View className="flex">
            <Header tipo="semPerfil"/>
            <Text>Cadastro de Turmas</Text>
        </View>
    )
}