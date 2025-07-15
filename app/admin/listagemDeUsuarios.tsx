import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../components/header";
import BtnVoltar from "../components/btnVoltar";

export default function listagemDeUsuarios(){
    return (
        <View className="flex">
            <Header tipo="semPerfil"/>
            <Text>Listagem de usuários</Text>
            <BtnVoltar/>
        </View>
    )
}