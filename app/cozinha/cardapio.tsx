import React from "react";
import { Text, View, Image } from "react-native";
import FooterOpcoes from "../components/footerOpcoes";
import Header from "../components/header";

export default function CardapioCozinha() {
    return (
        <View className="flex">
            <Header tipo="semPerfil"/>
            <Text>Cardapio cozinha</Text>
            <FooterOpcoes perfil="cozinha" pagina='cardapio'/>
        </View>
    )
}