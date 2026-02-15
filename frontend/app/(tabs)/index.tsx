import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../src/store/auth-store';
import { useRouter, Href } from 'expo-router';

export default function HomeHUD() {
  const { user, signOut } = useAuthStore();
  const router = useRouter();

  function handleLogout() {
    signOut(); // Isso limpa o Zustand e o AsyncStorage
    router.replace("/login" as Href); // Te manda de volta pro login
  }

  return (
    <View className="flex-1 bg-white dark:bg-slate-950 items-center justify-center p-6">
      <Text className="text-slate-900 dark:text-white text-xl mb-4">
        Logado como: {user?.name}
      </Text>

      <TouchableOpacity 
        onPress={handleLogout}
        className="bg-red-500 p-4 rounded-xl w-full"
      >
        <Text className="text-white text-center font-bold">Deslogar e Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}