import React, { useEffect, useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import Header from "../components/header";
import { Picker } from "@react-native-picker/picker";
import ConfirmacaoPopup from "../components/confirChama";
import BtnVoltar from "../components/btnVoltar";
import { useLocalSearchParams } from "expo-router";

export default function CadastroUsuario() {
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [perfil, setPerfil] = useState("");
    const [formNome, setFormNome] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formSenha, setFormSenha] = useState("");
    const [formConfirmarSenha, setFormConfirmarSenha] = useState("");
    const [formTurma, setFormTurma] = useState("");

    const params = useLocalSearchParams();
    const nomeBotao = params.modo === "editar" ? "Confirmar" : "Cadastrar";
    const titulo = params.modo === "editar" ? "Editar usuário" : "Cadastrar usuário";

    useEffect(() => {
        if(params.modo === "editar"){
            setFormNome(params.nome as string)
            setFormEmail(params.email as string)
            setFormSenha(params.senha as string)
            setFormTurma(params.turma as string)
            setPerfil(params.tipo as string)
        }
    }, [params])

    function validaCampos(){
        const camposPreenchidos =
        formNome.trim() &&
        formEmail.trim() &&
        formSenha &&
        formConfirmarSenha &&
        perfil &&
        (perfil !== "Aluno(a)" || formTurma);
        console.log(camposPreenchidos);

        if(camposPreenchidos){
            setMostrarPopup(true);
        }else{
            Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
        }
    }

    return (
        <View className="flex-1">
            <Header tipo="semPerfil"/>
            <Text className="flex justify-center mt-5 text-3xl">{titulo}</Text>
            <View className="flex-1 mt-5 items-center">
                <TextInput
                value={formNome}
                onChangeText={setFormNome}
                    placeholder="Nome"
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                />

                <TextInput
                value={formEmail}
                    onChangeText={setFormEmail}
                    keyboardType="email-address"
                    placeholder="Email"
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                />
                
                <TextInput
                    value={formSenha}
                    onChangeText={setFormSenha}
                    placeholder="Senha"
                    secureTextEntry
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                />

                <TextInput
                    value={formSenha}
                    onChangeText={setFormConfirmarSenha}
                    placeholder="Confirmar Senha"
                    secureTextEntry
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                />

                <Picker
                    selectedValue={perfil}
                    onValueChange={setPerfil}
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                    dropdownIconColor="#000"
                    >
                    <Picker.Item label="Professor(a)" value="Professor(a)"/>
                    <Picker.Item label="Cozinheiro(a)" value="Cozinheiro(a)"/>
                    <Picker.Item label="Aluno(a)" value="Aluno(a)"/>
                </Picker>

                {perfil === "Aluno(a)" && (
                    <Picker
                        selectedValue={formTurma}
                        onValueChange={setFormTurma}
                        className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                        dropdownIconColor="#000"
                        >
                        <Picker.Item label="Ex.: 2024.1.144" value="Ex.: 2024.1.144"/>
                        <Picker.Item label="2024.1.144" value="2024.1.144" />
                        <Picker.Item label="2024.1.145" value="2024.1.145" />
                        <Picker.Item label="2024.1.146" value="2024.1.146" />
                        <Picker.Item label="2024.1.147" value="2024.1.147" />
                        <Picker.Item label="2024.1.148" value="2024.1.148" />
                    </Picker>
                )}

                <TouchableOpacity className="w-[75%] bg-[#0a57d6] py-3.5 rounded-lg items-center shadow-md" onPress={validaCampos}>
                    <Text className="text-white text-xl font-semibold">{nomeBotao}</Text>
                </TouchableOpacity>
            </View>

            <ConfirmacaoPopup visible={mostrarPopup} onClose={() => setMostrarPopup(false)}/>
            <BtnVoltar/>
        </View>
    )
}