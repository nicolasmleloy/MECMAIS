import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/header';
import { router, useLocalSearchParams } from 'expo-router';

export default function Politica() {
  const {tp} = useLocalSearchParams();
  console.log(tp);

  return (
    <View className="flex"> 
        <Header tipo='semPerfil'/>
      <View>
        <Text className="mt-3 text-xl font-bold text-center mb-4">
          Política de Privacidade{"\n"}
          e Segurança – MEC+
        </Text>
        <Text className="p-5 text-base text-justify text-gray-700 leading-relaxed ">
          O aplicativo MEC+ respeita a sua privacidade. Coletamos apenas os dados
          necessários para o uso do sistema, como nome, e-mail, perfil de acesso
          (aluno, professor, responsável ou cozinheiro) e registros de presença.{"\n"}
          Essas informações são usadas exclusivamente para o funcionamento do app,
          como gerar previsões de refeições, organizar a chamada e enviar
          notificações úteis.{"\n"}
          Seus dados são armazenados com segurança e não são compartilhados com
          terceiros, exceto quando exigido por lei.{"\n"}
          O uso do MEC+ por crianças é feito com autorização dos pais ou responsáveis.
          Ao continuar, você concorda com o uso responsável das suas informações conforme esta política.{"\n"}
          Em caso de dúvidas, entre em contato pelo e-mail:
          <Text className="font-bold"> contatomecplus@gmail.com.br</Text>
        </Text>
        </View>
     
        <TouchableOpacity onPress={() => {
        if (tp === 'professor') {
          router.push('../login/login?tp=professor');
        } else if (tp === 'cozinha') {
          router.push('../login/login?tp=cozinha');
        } else if (tp === "aluno/responsavel") {
          router.push("../login/login?tp=aluno/responsavel");
      }
      }} className='mt-14 ml-4'>
        <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
    </View>
  );
}