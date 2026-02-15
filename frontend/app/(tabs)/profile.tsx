import React from 'react';
import { View, Text, TouchableOpacity, Switch, Alert, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/src/store/auth-store';
import { usePreferencesStore } from '@/src/store/preferences-store';
import { translations } from '@/src/utils/i18n';
import { User, Moon, Globe, LogOut, ChevronRight, Settings, Shield } from 'lucide-react-native';
import Colors from "../../constants/Colors";


export default function ProfileScreen() {
  const router = useRouter();
  const { signOut, user } = useAuthStore();
  const { isDarkMode, toggleTheme, language, setLanguage } = usePreferencesStore();
  
  const t = translations[language];
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  const handleLogout = () => {
    Alert.alert(
      t.logout,
      language === 'pt' ? "Tem a certeza que deseja sair?" : "Are you sure you want to logout?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: t.logout, 
          style: "destructive", 
          onPress: () => {
            signOut();
            router.replace('/login');
          } 
        }
      ]
    );
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-zinc-950">
      
      {/* Header com Avatar */}
      <View className="items-center justify-center pt-20 pb-8 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
        <View className="w-24 h-24 bg-gray-200 dark:bg-zinc-800 rounded-full items-center justify-center mb-4 overflow-hidden border-2 border-blue-500">
          {/* Placeholder de Avatar - Pode ser substituído por imagem real depois */}
          <User size={40} color={themeColors.text} />
        </View>
        <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {user?.name || t.athlete}
        </Text>
        <Text className="text-zinc-500 dark:text-zinc-400 mt-1">
          {user?.email || "email@exemplo.com"}
        </Text>
      </View>

      <View className="p-6">
        
        {/* Secção de Configurações Gerais */}
        <Text className="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-wider">
          {t.settings}
        </Text>

        <View className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 mb-8">
          
          {/* Mudar Tema */}
          <View className="flex-row items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-800">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 items-center justify-center mr-3">
                <Moon size={18} color="#6366f1" />
              </View>
              <Text className="text-lg text-zinc-800 dark:text-zinc-200 font-medium">
                {t.darkMode}
              </Text>
            </View>
            <Switch 
              value={isDarkMode} 
              onValueChange={toggleTheme}
              trackColor={{ false: "#e4e4e7", true: "#6366f1" }}
              thumbColor={"#fff"}
            />
          </View>

          {/* Mudar Idioma */}
          <TouchableOpacity 
            onPress={toggleLanguage}
            className="flex-row items-center justify-between p-4"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 items-center justify-center mr-3">
                <Globe size={18} color="#10b981" />
              </View>
              <Text className="text-lg text-zinc-800 dark:text-zinc-200 font-medium">
                {t.language}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-zinc-400 mr-2 uppercase text-xs font-bold">
                {language}
              </Text>
              <ChevronRight size={20} color={themeColors.icon} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Secção de Conta */}
        <Text className="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-wider">
          {t.account}
        </Text>

        <View className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800">
          
          {/* Botão de Logout */}
          <TouchableOpacity 
            onPress={handleLogout}
            className="flex-row items-center p-4 active:bg-red-50 dark:active:bg-red-900/10"
          >
             <View className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 items-center justify-center mr-3">
                <LogOut size={18} color="#ef4444" />
              </View>
            <Text className="text-lg text-red-500 font-medium">
              {t.logout}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="items-center mt-10">
          <Text className="text-zinc-400 text-xs">GymWithYahu AI v1.0.0</Text>
        </View>

      </View>
    </ScrollView>
  );
}