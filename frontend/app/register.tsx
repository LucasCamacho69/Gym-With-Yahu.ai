import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { api } from '../src/services/api';
import { LucideArrowLeft, LucideDumbbell } from 'lucide-react-native';
import { ThemeToggle } from '../components/theme-toggle';
import { useColorScheme } from 'nativewind';

export default function Register() {
  const { colorScheme } = useColorScheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleRegister() {
    try {
      await api.post('/users', { name, email, password });
      Alert.alert("Sucesso", "Conta criada!", [{ text: "Ir para Login", onPress: () => router.back() }]);
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar.");
    }
  }

  return (
    <View key={colorScheme} className="flex-1 bg-white dark:bg-slate-950 justify-center px-8">
      {/* Botão Voltar */}
      <TouchableOpacity onPress={() => router.back()} className="absolute top-16 left-8 p-2">
        <LucideArrowLeft className="text-slate-900 dark:text-white" size={28} />
      </TouchableOpacity>

      {/* Botão Tema */}
      <View className="absolute top-16 right-8">
        <ThemeToggle />
      </View>

      {/* ÍCONE IGUAL AO LOGIN */}
      <View className="items-center mb-10">
        <View className="bg-slate-900 dark:bg-slate-800 p-4 rounded-3xl">
          <LucideDumbbell color="white" size={40} />
        </View>
        <Text className="text-3xl font-bold mt-4 text-slate-900 dark:text-white">
          Criar Conta
        </Text>
      </View>
      
      <View className="space-y-4">
        <TextInput 
          className="border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-slate-900 dark:text-white bg-white dark:bg-slate-900" 
          placeholder="Nome completo" 
          placeholderTextColor="#94a3b8"
          onChangeText={setName} 
        />
        <TextInput 
          className="border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-slate-900 dark:text-white bg-white dark:bg-slate-900" 
          placeholder="E-mail" 
          placeholderTextColor="#94a3b8"
          autoCapitalize="none" 
          onChangeText={setEmail} 
        />
        <TextInput 
          className="border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-slate-900 dark:text-white bg-white dark:bg-slate-900 mb-4" 
          placeholder="Senha" 
          placeholderTextColor="#94a3b8"
          secureTextEntry 
          onChangeText={setPassword} 
        />

        <TouchableOpacity className="bg-slate-900 dark:bg-slate-100 p-5 rounded-2xl" onPress={handleRegister}>
          <Text className="text-white dark:text-slate-900 text-center font-bold text-lg">Finalizar Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}