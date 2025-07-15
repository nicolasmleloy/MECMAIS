import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ConfirmacaoPopup({ visible, onClose }: Props) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white px-6 py-5 rounded-lg items-center">
          <Text className="text-lg mb-2">Dados enviados para contagem</Text>
            <Text className="w-50%">✅</Text>
          <TouchableOpacity className="mt-3" onPress={onClose}>
            <Text className="text-blue-500 underline">Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}


