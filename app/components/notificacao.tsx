import React from "react";
import { Text, View, Image } from "react-native";

type Props = {
    Titulo: string;
    Mensagem: string;
}

export default function Notificacao({Titulo, Mensagem}: Props) {
    if(Titulo === "Alerta!"){
        return (
            <View className="flex-row mx-10 mt-5 mb-2 justify-between p-5 rounded-[20px] bg-[#E4ECFD] shadow">
                <View className="flex justify-center">
                    <Image source={require("../../assets/images/attention-icon.png")}></Image>
                </View>
                    <View className="flex-col ">
                        <Text className="text-2xl font-semibold">{Titulo}</Text>
                        <Text className="text-xl flex-shrink w-[200px]">{Mensagem}</Text>
                    </View>
                    
                </View>
        );
    }else if(Titulo === "Aviso!"){
        return (
            <View className="flex-row mx-10 mt-5 mb-2 justify-between p-5 rounded-[20px] bg-[#E4ECFD] shadow">
                <View className="flex justify-center">
                    <Image source={require("../../assets/images/advice-icon.png")}></Image>
                </View>
                    <View className="flex-col ">              
                        <Text className="text-2xl font-semibold">{Titulo}</Text>
                        <Text className="text-xl flex-shrink w-[200px]">{Mensagem}</Text>
                    </View>
                    
                </View>
        );
    }
}