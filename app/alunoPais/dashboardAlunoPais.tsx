import { Text, View} from "react-native";
import Header from "../components/header";

export default function dashboardAlunoPais() {
    
  return (
    <View className="flex">
      <Header tipo="semPerfil"/>
      <Text className="text-lg font-bold">Dashboad AlunoPais</Text>
    </View>
  );
}
