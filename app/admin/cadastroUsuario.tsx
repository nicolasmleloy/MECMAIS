import React, { useEffect, useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import Header from "../components/header";
import { Picker } from "@react-native-picker/picker";
import ConfirmacaoPopup from "../components/confirChama";
import BtnVoltar from "../components/btnVoltar";
import { router, useLocalSearchParams } from "expo-router";

export default function CadastroUsuario() {
    interface Turma {
        nome_turma: string;
    }

    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [formNome, setNome] = useState("");
    const [formEmail, setEmail] = useState("");
    const [formSenha, setSenha] = useState("");
    const [formConfirmarSenha, setFormConfirmarSenha] = useState("");
    const [perfil, setPerfil] = useState("Professor(a)");
    const [formTurma, setTurma] = useState("");
    const [dadosTurmas, setDadosTurmas] = useState<Turma[]>([]);

    const params = useLocalSearchParams();
    const nomeBotao = params.modo === "editar" ? "Confirmar" : "Cadastrar";
    const titulo = params.modo === "editar" ? "Editar usuário" : "Cadastrar usuário";

    useEffect(() => {
        if(params.modo === "editar"){
            setNome(params.nome as string || "");
            setEmail(params.email as string || "");
            setSenha(params.senha as string || "");
            setFormConfirmarSenha(params.senha as string || "");
            setPerfil(params.tipo as string || "");
            setTurma(params.turma as string || "");
        }
    }, [])

    function validaCamposSenha(){
        if(formSenha === formConfirmarSenha){
            EnviarDados();
        }else{
            window.alert("Os campos de senhas devem ser iguais!");
        }
    }

    async function BuscarTurmas(){
        const respostaTurmas = await fetch("http://localhost/MECMAIS/router/turmaRouter.php?acao=buscarTurmas", {
            method: "GET"
        })

        const dadosTurmas = await respostaTurmas.json();
        setDadosTurmas(dadosTurmas[0]);
    }

    useEffect(() => {
        BuscarTurmas();
    }, [])

    async function EnviarDados(){
        const dadosEditar = {
            tipo_perfil: perfil,
            nome: formNome,
            email_antigo: params.email,
            email_novo: formEmail,
            senha: formSenha,
            turma: formTurma,
        };

        const dadosCadastro = {
            tipo_perfil: perfil,
            nome: formNome,
            email: formEmail,
            senha: formSenha,
            turma: formTurma,
        };

        if(params.modo == "editar"){
            const resposta = await fetch("http://localhost/MECMAIS/router/usuarioRouter.php?acao=update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosEditar)
            })

            const dadosResposta = await resposta.json()
            
            if(dadosResposta[0]){
                window.alert(`Dados de ${formNome} editados com sucesso!`)
            }else{
                window.alert(`Não foi possível editar!`)
            }

            router.push("/admin/listagemDeUsuarios");
            
        }else{
            const resposta = await fetch("http://localhost/MECMAIS/router/usuarioRouter.php?acao=create", { //verificar a url
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosCadastro)
            })
            const dadosResposta = await resposta.json();
            if(dadosResposta[0]){
                window.alert(`Adicionado com sucesso: ${formNome}`);
            }else{
                window.alert(`Erro: algo de errado aconteceu!`);
            }
        }


    }

    return (
        <View className="flex-1">
            <Header tipo="semPerfil"/>
            <Text className="flex justify-center mt-5 text-3xl">{titulo}</Text>
            <View className="flex-1 mt-5 items-center">
                <TextInput
                value={formNome}
                onChangeText={setNome}
                    placeholder="Nome"
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                />

                <TextInput
                value={formEmail}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder="Email"
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                />

                <TextInput
                    value={formSenha}
                    onChangeText={setSenha}
                    placeholder="Confirmar Senha"
                    secureTextEntry
                    className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                />

                <TextInput
                    value={formConfirmarSenha}
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
                        onValueChange={setTurma}
                        className="w-[75%] bg-white border border-gray-300 rounded-lg px-3 py-3.5 text-[15px] mb-5 shadow-sm"
                        dropdownIconColor="#000"
                        >
                        {dadosTurmas.map((item, index) => (
                            <View key={index}>
                                <Picker.Item label={item.nome_turma} value={item.nome_turma}/>
                            </View>
                        ))}
                    </Picker>
                )}

                <TouchableOpacity className="w-[75%] bg-[#0a57d6] py-3.5 rounded-lg items-center shadow-md" onPress={validaCamposSenha}>
                    <Text className="text-white text-xl font-semibold">{nomeBotao}</Text>
                </TouchableOpacity>
            </View>

            <ConfirmacaoPopup visible={mostrarPopup} onClose={() => setMostrarPopup(false)}/>
            <BtnVoltar/>
        </View>
    )
}