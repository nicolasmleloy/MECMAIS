import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Header({ tipo }: { tipo: "comPerfil" | "semPerfil"}) {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
        setDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    
    const formattedDate = dateTime.toLocaleDateString('pt-BR');
    const formattedTime = dateTime.toLocaleTimeString('pt-BR');

    if(tipo == "comPerfil"){
        return(
            <View className="flex">
                <View className="bg-blue-800 h-40 items-center relative justify-center">
                    <TouchableOpacity onPress={() => router.push("/")}>
                    <Image
                        source={require("../../assets/images/logo.png")}
                        style={{ width: 150, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
            
                    <View className="absolute right-3 bottom-2 items-end">
                        <Text className="text-white text-xs">{formattedDate}</Text>
                        <Text className="text-white text-xs">{formattedTime}</Text>
                    </View>
            
                    <Image
                    source={require("../../assets/images/icone.png")}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        backgroundColor: 'white',
                        position: 'absolute',
                        alignSelf: 'center',
                        bottom: -30,
                        borderWidth: 2,
                        borderColor: 'white',
                    }}
                    />
                </View>
            </View>
        );
    }else{
        return (
            <View className="flex-1 bg-white">
                <View className="bg-blue-800 h-26 items-center relative">
                    <TouchableOpacity onPress={() => router.push("/")}>
                    <Image
                        source={require("../../assets/images/logo.png")}
                        style={{ width: 150, height: 150 }}
                    />
                    </TouchableOpacity>
                
                    <View className="absolute right-3 bottom-2 items-end">
                    <Text className="text-white text-xs">{formattedDate}</Text>
                    <Text className="text-white text-xs">{formattedTime}</Text>
                    </View>
                </View>
            </View>
        );
    }
}