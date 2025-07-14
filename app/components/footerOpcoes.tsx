import { TouchableOpacity, View, Image } from "react-native";
import React from 'react';
import { router } from "expo-router";

type FooterProps = {
    pagina: "dashboard" | "cardapio" | "notificacoes";
};

export default function FooterOpcoes({pagina}: FooterProps){
    switch (pagina) {
        case "dashboard":
            return(
                <View className="flex-row justify-around w-full fixed bottom-0 left-0 z-99 p-4">
                    <TouchableOpacity className="flex justify-center items-center bg-gray-800 rounded-xl p-2">
                        <Image source={require('../../assets/images/icone-ok.png')} width={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex justify-center items-center bg-[#0E57C6] rounded-xl p-2">
                        <Image source={require('../../assets/images/icone-cardapio.png')} width={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/cozinha/notificacoes")} className="flex justify-center items-center bg-[#0E57C6] rounded-xl p-2">
                        <Image source={require('../../assets/images/icone-sino.png')} width={20}/>
                    </TouchableOpacity>
                </View>
            )
            break;
            case "cardapio":
                return(
                    <View className="flex-row justify-around w-full fixed bottom-0 left-0 z-99 p-4">
                        <TouchableOpacity className="flex justify-center items-center bg-[#0E57C6] rounded-xl p-2">
                            <Image source={require('../../assets/images/icone-ok.png')} width={20}/>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex justify-center items-center bg-gray-800 rounded-xl p-2">
                            <Image source={require('../../assets/images/icone-cardapio.png')} width={20}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("/cozinha/notificacoes")} className="flex justify-center items-center bg-[#0E57C6] rounded-xl p-2">
                            <Image source={require('../../assets/images/icone-sino.png')} width={20}/>
                        </TouchableOpacity>
                    </View>
                )
                break;
                case "notificacoes": 
                    return(
                        <View className="flex-row justify-around w-full fixed bottom-0 left-0 z-99 p-4">
                            <TouchableOpacity className="flex justify-center items-center bg-[#0E57C6] rounded-xl p-2">
                                <Image source={require('../../assets/images/icone-ok.png')} width={20}/>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex justify-center items-center bg-[#0E57C6] rounded-xl p-2">
                                <Image source={require('../../assets/images/icone-cardapio.png')} width={20}/>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex justify-center items-center bg-gray-800 rounded-xl p-2">
                                <Image source={require('../../assets/images/icone-sino.png')} width={20}/>
                            </TouchableOpacity>
                        </View>
                    )
                break;
        default:
            break;
    }
}