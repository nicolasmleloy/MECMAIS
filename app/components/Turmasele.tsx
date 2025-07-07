import { Picker } from "@react-native-picker/picker";
import { View, Text } from "react-native";

export default function SelecaoTurma({ turmaSelecionada, setTurmaSelecionada }: any) {
  return (
    <View className="mt-5 px-5">
      <Text className="text-lg font-medium mb-2 text-center">Selecione a turma</Text>

      <View className="border border-black-400 ">
        <Picker
          selectedValue={turmaSelecionada}
          onValueChange={(itemValue) => setTurmaSelecionada(itemValue)}
          className="h-12 w-full"
          dropdownIconColor="#000"
        >
          <Picker.Item label="Ex.: 2024.1.144" value="" />
          <Picker.Item label="2024.1.144" value="2024.1.144" />
          <Picker.Item label="2024.1.145" value="2024.1.145" />
          <Picker.Item label="2024.1.146" value="2024.1.146" />
          <Picker.Item label="2024.1.147" value="2024.1.147" />
          <Picker.Item label="2024.1.148" value="2024.1.148" />
        </Picker>
      </View>
    </View>
  );
}
