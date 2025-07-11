import React from "react";
import { Text, View, Image } from "react-native";
import Header from "../components/header";

export default function Notificacoes() {
    return (
        <View className="flex">
            <Header tipo="semPerfil"/>
                <View className="flex items-center mt-5">
                    <Text className="text-4xl font-semibold">Nutrição</Text>
                </View>

            <View className="flex-row m-10 justify-between p-5 rounded-[20px] bg-[#E4ECFD] shadow">
            <View className="flex justify-center">
                <Image source={require("../../assets/images/advice-icon.png")}></Image>
            </View>
                <View className="flex-col ">
                    
                    <Text className="text-2xl font-semibold">Atenção!</Text>
                    <Text className="text-xl flex-shrink w-[200px]">O cardápio da semana já está disponível</Text>
                </View>
                
            </View>
            <View className="flex-row m-10 justify-between p-5 rounded-[20px] bg-[#E4ECFD] shadow">
            <View className="flex justify-center">
                <Image source={require("../../assets/images/advice-icon.png")}></Image>
            </View>
                <View className="flex-col ">
                    
                    <Text className="text-2xl font-semibold">Aviso!</Text>
                    <Text className="text-xl flex-shrink w-[200px]">A turma 2024.1.144 não realizou a chamada</Text>
                </View>
                
            </View>
            <View className="flex-row m-10 justify-between p-5 rounded-[20px] bg-[#E4ECFD] shadow">
            <View className="flex justify-center">
                <Image source={require("../../assets/images/advice-icon.png")}></Image>
            </View>
                <View className="flex-col ">
                    
                    <Text className="text-2xl font-semibold">Atenção!</Text>
                    <Text className="text-xl flex-shrink w-[200px]">O cardápio da semana já está disponível</Text>
                </View>
                
            </View>

        </View>

    )
}