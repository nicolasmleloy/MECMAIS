import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../components/header";
import { router } from "expo-router";
import BtnVoltar from "../components/btnVoltar";

export default function listagemDeTurmas(){
    return (
        <View className="flex">
            <Header tipo="semPerfil"/>
            <Text>Listagem de Turmas</Text>
            
            <BtnVoltar/>
        </View>
    )
}