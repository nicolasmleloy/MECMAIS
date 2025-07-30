import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

type Props = {
  Tipo_compon : "Confirmar" | "ConfirmarComImagem"  | "Deletar";
  mensagem: string;
  visible: boolean;
  function: () => void;
  onClose: () => void;
};



export default function ConfirmacaoPopup({ visible,Tipo_compon,mensagem, function: onConfirm, onClose }: Props) {
  switch(Tipo_compon) {
    case "ConfirmarComImagem":
      return (
        <Modal
          transparent
          animationType="fade"
          visible ={visible}
          onRequestClose={onClose}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50 p-2">
            <View className="bg-white px-6 py-5 rounded-lg items-center">
              <Text className="text-[20px] mb-2 text-center">{mensagem}</Text>
                <Text className="text-[60px]">✅</Text>
              <TouchableOpacity className="mt-3 w-[25%] items-center " onPress={onClose}>
                <Text className="text-black-500 ">Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
       
    );
    case "Confirmar":
      return (
        <Modal
          transparent
          animationType="fade"
          visible ={visible}
          onRequestClose={onClose}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50 p-2">
            <View className="bg-white px-6 py-5 rounded-lg gap-2 items-center">
              <Text className="text-[20px] mb-2 text-center">{mensagem}</Text>
              <TouchableOpacity className="mt-3 w-[25%] items-center " onPress={onClose}>
                <Text className="text-black-500 ">Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
       
    );
    
    case "Deletar":
    return(
        <Modal
        transparent
        animationType="fade"
        visible ={visible}
        onRequestClose={onClose}
    >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50 p-2">
        <View className="bg-white px-6 py-5 rounded-lg items-center">
            <Text className="text-[20px] mb-2 text-center">{mensagem}</Text>
            <View className="flex-row  justify-center gap-5 w-full">
                <TouchableOpacity className="mt-3 w-[25%] items-center" onPress={() => {
                    onConfirm(); 
                    onClose();    
                  }} >
                    <Text className="text-black-500">Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity className="mt-3 w-[25%] items-center " onPress={onClose}>
                <Text className="text-black-500">Não</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    </Modal>

    );
    
    default:
        break;
};
};


