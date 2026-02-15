import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, Href } from 'expo-router';
import { useState } from 'react';
import { useAuthStore } from '../src/store/auth-store';
import { api } from '../src/services/api';
import { LucideDumbbell } from 'lucide-react-native';
import { ThemeToggle } from '../components/theme-toggle';
import { useColorScheme } from 'nativewind'; // Importe isso

export default function Login() {
  const { colorScheme } = useColorScheme(); // Hook para monitorar o tema
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  async function handleLogin() {
    try {
      const response = await api.post('/sessions', { email, password });
      setAuth(response.data.user, response.data.token);
      router.replace("/(tabs)" as Href);
    } catch (error) {
      Alert.alert("Erro", "E-mail ou senha inválidos");
    }
  }

  return (
    // Adicionamos a 'key' baseada no colorScheme para forçar o re-render do fundo
    <View 
      key={colorScheme} 
      className="flex-1 bg-white dark:bg-slate-950 justify-center px-8"
    >
      <View className="absolute top-16 right-8">
        <ThemeToggle />
      </View>

      <View className="items-center mb-10">
        <View className="bg-slate-900 dark:bg-slate-800 p-4 rounded-3xl">
          <LucideDumbbell color="white" size={40} />
        </View>
        <Text className="text-2xl font-bold mt-4 text-slate-900 dark:text-white">
          Gym With Yahu
        </Text>
      </View>

      <View className="space-y-4">
        <TextInput 
          className="border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-slate-900 dark:text-white bg-white dark:bg-slate-900"
          placeholder="Seu e-mail"
          placeholderTextColor="#94a3b8"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <TextInput 
          className="border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-slate-900 dark:text-white bg-white dark:bg-slate-900"
          placeholder="Sua senha"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          onChangeText={setPassword}
        />

        <TouchableOpacity 
          className="bg-slate-900 dark:bg-slate-100 p-5 rounded-2xl mt-4 active:opacity-80" 
          onPress={handleLogin}
        >
          <Text className="text-white dark:text-slate-900 text-center font-bold text-lg">Entrar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/register" as Href)} className="mt-8">
        <Text className="text-center text-slate-500">
          Ainda não tem conta? <Text className="font-bold text-slate-900 dark:text-white">Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}