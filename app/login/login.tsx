import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";
import { Text,TextInput,TouchableOpacity, View } from "react-native";
import Header from "../components/header";
import { router } from "expo-router";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const {tp} = useLocalSearchParams();

  return (
    <View className="flex-1">
        <Header tipo="comPerfil"/>
        <View className="flex-1 justify-center items-center">
            <Text 
            className="text-[30px] mb-6 font-bold text-black text-center"
            >Login {tp}</Text>

            <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="Email"
                className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-2 shadow-sm"        
            />

            <TextInput
                value={senha}
                onChangeText={setSenha}
                placeholder="Senha"
                secureTextEntry
                className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"      
            />

            <TouchableOpacity 
            className="w-[75%] bg-[#0a57d6] py-3.5 rounded-lg items-center shadow-md"
              onPress={() => {
                if((email === "admin" && senha === "admin") && tp === "admin"){
                  router.push("/admin/opcoesAdm");
                }else {
                  if (tp === "professor") {
                    router.push("../professor/telaInicialProfessor");
                  } else if (tp === "cozinha") {
                    router.push("../cozinha/dashboardCozinha");
                  } else if (tp === "aluno") {
                    router.push("../aluno/dashboardAluno");
                  }
                }
              }}
            >
                <Text className="text-white text-xl font-semibold">Entrar</Text>
            </TouchableOpacity>
        </View>

        <View className="items-center justify-center pl-1 pt-1 mt-40 mb-4">
            <Link href={`/politicaPrivacidade/politicaPrivacidade?tp=${tp}`}>
                <Text className= "text-gray-600 text-center text-base font-medium">
                Política de Privacidade {"\n"}         e Segurança
                </Text>
            </Link>
        </View>

        
    </View>
  );
}