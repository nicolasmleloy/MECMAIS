import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Header from "../components/header";
import FooterOpcoes from "../components/footerOpcoes";

export default function DashboardAlunoPais() {
  const { tp } = useLocalSearchParams();
  console.log(tp);

  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleDateString("pt-BR");

  return (
    <View className="flex">
      <Header tipo="semPerfil"/>
            <View className="flex-1 justify-center items-center">
                <Text className="text-[30px]  mt-5 mb-6 font-bold text-black text-center">Olá Aluno(a):</Text>
            
                <View className="flex-row m-1 justify-between p-5 rounded-[20px] bg-[#E4ECFD] shadow">
                    <View className="w-[100px] justify-center">
                        <Image source={require("../../assets/images/icone.png")} />
                    </View>
                   

                    <View className="flex-col text-center font-semibold w-[200px]">
                        <Text className="text-[30px]">Chamada:</Text>
                        <Text className="text-[20px]">Confirmada</Text>
                        <Text className="text-[20px]">Chamada {formattedDate}</Text>
                    </View>
                </View>
            </View>
            <View className="justify-end items-center px-9 pb-1 pt-[350px]">
              <Text className="h-full text-center text-[15px] text-black">A refeição só pode ser registrada depois que o aluno confirmar presença em sala de aula.</Text>
            </View>
      <FooterOpcoes perfil="aluno" pagina='dashboard'/>
    </View>
  );
}
