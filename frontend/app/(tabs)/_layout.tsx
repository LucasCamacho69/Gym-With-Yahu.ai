import React from 'react';
import { Tabs } from 'expo-router';
import { Home, MessageSquare, User, Dumbbell } from 'lucide-react-native';
import { usePreferencesStore } from '@/src/store/preferences-store';
import Colors from '@/constants/Colors';
import { translations } from '@/src/utils/i18n';

export default function TabLayout() {
  const { isDarkMode, language } = usePreferencesStore();
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
  const t = translations[language];

  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: themeColors.tint,
      tabBarInactiveTintColor: isDarkMode ? '#71717a' : '#94a3b8',
      headerShown: false,
      tabBarStyle: { 
        height: 65, 
        paddingBottom: 10, 
        paddingTop: 10,
        backgroundColor: themeColors.background,
        borderTopColor: isDarkMode ? '#27272a' : '#f1f5f9',
        borderTopWidth: 1,
      },
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={24} /> 
        }} 
      />
      {/* CORREÇÃO: Aba Workouts Adicionada */}
      <Tabs.Screen 
        name="workout" // Certifique-se que o arquivo é app/(tabs)/workout.tsx
        options={{ 
          title: 'Treinos',
          tabBarIcon: ({ color }) => <Dumbbell color={color} size={24} /> 
        }} 
      />
      <Tabs.Screen 
        name="chat" 
        options={{ 
          title: 'IA Chat', 
          tabBarIcon: ({ color }) => <MessageSquare color={color} size={24} /> 
        }} 
      />
      {/* CORREÇÃO: Aba Profile Adicionada */}
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Perfil',
          tabBarIcon: ({ color }) => <User color={color} size={24} /> 
        }} 
      />
    </Tabs>
  );
}