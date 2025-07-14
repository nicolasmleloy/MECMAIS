import React from 'react';
import { Text, View } from "react-native";
import Header from "../components/header";
import FooterOpcoes from '../components/footerOpcoes';

export default function DashboardCozinha() {
  return (
    <View className="flex">
      <Header tipo="semPerfil"/>
      <View className="flex items-center mt-5">
        <Text className="text-4xl font-semibold">Nutrição</Text>
      </View>

      <View className="flex-row m-10 justify-between p-10 rounded-[20px] bg-[#E4ECFD] shadow">
        <View className="flex bg-gray-300 items-center justify-center gap-2 shadow p-2 rounded-[10px]">
          <Text className="text-xl">Estimativa</Text>
          <Text className="text-3xl font-semibold">132</Text>
        </View>
        <View className="flex bg-gray-300 items-center justify-center gap-2 shadow p-2 rounded-[10px]">
          <Text className="text-xl">Chamada</Text>
          <Text className="text-3xl font-semibold">128</Text>
        </View>
      </View>

      <View className="flex items-center ml-5 mr-5 gap-5">
        <Text className="text-xl">Ingredientes Estimados</Text>
        <View className="w-full flex-row justify-around">
          <Text className="text-base font-semibold">Arroz:</Text>
          <Text className="text-base font-semibold">90kg</Text>
        </View>
        <View className="w-full flex-row justify-around">
          <Text className="text-base font-semibold">Arroz:</Text>
          <Text className="text-base font-semibold">90kg</Text>
        </View>
        <View className="w-full flex-row justify-around">
          <Text className="text-base font-semibold">Arroz:</Text>
          <Text className="text-base font-semibold">90kg</Text>
        </View>
        <View className="w-full flex-row justify-around">
          <Text className="text-base font-semibold">Arroz:</Text>
          <Text className="text-base font-semibold">90kg</Text>
        </View>
      </View>

      <FooterOpcoes perfil="cozinha" pagina='dashboard'/>
    </View>
  );
}