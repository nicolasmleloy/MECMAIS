import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function BtnVoltar(){
    return (
        <View className="flex-row w-full fixed bottom-0 left-0 z-99 p-2">
            <TouchableOpacity className="" onPress={() => router.push("..")}>
                <Ionicons name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>
        </View>
    )
}