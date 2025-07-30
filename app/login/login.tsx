import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";
import { Text,TextInput,TouchableOpacity, View, Alert } from "react-native";
import Header from "../components/header";
import { router } from "expo-router";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  const { tp } = useLocalSearchParams();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("http://localhost/MECMAIS/router/loginRouter.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha, tipo: tp }),
      });

      const data = await response.json();
      console.log(data.user)

      if (data.success) {
      
        switch (tp) {
          case "admin":
            router.push("/admin/opcoesAdm");
            break;
          case "professor":
            router.push({
              pathname: "/professor/telaInicialProfessor",
              params: { id: data.user.id }, 
            });
            break;
          case "cozinha":
            router.push("/cozinha/dashboardCozinha");
            break;
          case "aluno":
            router.push("/aluno/dashboardAluno");
            break;
          default:
            Alert.alert("Erro", "Tipo de usuário desconhecido.");
        }
      } else {
        Alert.alert("Erro", data.message || "Login inválido.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro de conexão", "Não foi possível conectar ao servidor.");
    }
  };

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
            onPress={handleLogin}
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