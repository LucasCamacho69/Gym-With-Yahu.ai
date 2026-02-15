import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { Loader } from 'lucide-react-native';
import { usePreferencesStore } from '@/src/store/preferences-store';
import Colors from '@/constants/Colors';

interface LoadingProps {
  message?: string;
}

export function Loading({ message }: LoadingProps) {
  const { isDarkMode } = usePreferencesStore();
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
  
  // Valor animado para a rotação
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Configuração do Loop Infinito
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000, // 1 segundo por volta
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Interpolação: 0 -> 0deg, 1 -> 360deg
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-zinc-950">
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Loader size={48} color={themeColors.tint} />
      </Animated.View>
      
      {message && (
        <Text className="mt-4 text-zinc-500 font-medium animate-pulse">
          {message}
        </Text>
      )}
    </View>
  );
}