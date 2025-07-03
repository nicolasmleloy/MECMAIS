import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";
import { Text,TextInput,TouchableOpacity, View } from "react-native";
import Header from "../components/header";
import { router } from "expo-router";


export default function Login() {
  const {tp} = useLocalSearchParams();

  return (
    <View className="flex-1">
        <Header tipo="comPerfil"/>
        <View className="flex-1 justify-center items-center">
            <Text 
            style = {{fontSize: 30,
                marginBottom: 24,
                fontWeight: "bold",
                color: "#000",
                textAlign: "center",}}
            >Login {tp}</Text>

            <TextInput
                placeholder="Email"
                style= {{ width: "75%",
                backgroundColor: "#fff",
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 11,
                fontSize: 15,
                marginBottom: 10,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,}  }           
            
            />

            <TextInput
                placeholder="Senha"
                secureTextEntry
                style= {{ width: "75%",
                backgroundColor: "#fff",
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 11,
                fontSize: 15,
                marginBottom: 19,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,}  }       
                
            />

            <TouchableOpacity 
            style = {{
                width: "75%",
                fontSize: 20,
                backgroundColor: "#0a57d6",
                paddingVertical: 14,
                borderRadius: 8,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
              }}
              onPress={() => router.push("/professor/telaInicialProfessor")}
            >
                <Text className="text-white text-xl font-semibold">Entrar</Text>
            </TouchableOpacity>
        </View>

        <View className="items-center justify-center pl-1 pt-1 mt-40 mb-4">
            <Link href="/politicaPrivacidade/politicaPrivacidade?t=/">
                <Text className="text-gray-600 text-center text-base font-medium">
                Política de Privacidade {"\n"}         e Segurança
                </Text>
            </Link>
        </View>

        
    </View>
  );
}