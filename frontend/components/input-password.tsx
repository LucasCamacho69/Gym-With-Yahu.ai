import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { LucideEye, LucideEyeOff } from 'lucide-react-native';

interface InputPasswordProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export function InputPassword({ placeholder, value, onChangeText }: InputPasswordProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View className="flex-row items-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl mb-4 px-4 h-14 w-full">
      <TextInput
        className="flex-1 text-slate-900 dark:text-white text-base h-full"
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        secureTextEntry={!isVisible} 
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)} className="p-2">
        {isVisible ? 
          <LucideEyeOff color="#64748b" size={20} /> : 
          <LucideEye color="#64748b" size={20} />
        }
      </TouchableOpacity>
    </View>
  );
}