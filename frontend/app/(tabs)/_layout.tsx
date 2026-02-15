import React from 'react';
import { Tabs } from 'expo-router';
import { Home, MessageSquare, User, Dumbbell } from 'lucide-react-native';
import { usePreferencesStore } from '@/src/store/preferences-store';
import Colors from '@/constants/Colors'; // <--- CORRIGIDO AQUI (Sem chaves)
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
      tabBarLabelStyle: {
        fontSize: 10,
        fontWeight: '600',
        marginTop: 2
      }
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: t.hudTitle,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> 
        }} 
      />

      <Tabs.Screen 
        name="workouts" 
        options={{ 
          title: 'Meus Treinos', 
          tabBarLabel: 'Treinos',
          tabBarIcon: ({ color, size }) => <Dumbbell color={color} size={size} /> 
        }} 
      />

      <Tabs.Screen 
        name="chat" 
        options={{ 
          title: 'IA Coach', 
          tabBarLabel: 'Chat IA',
          tabBarIcon: ({ color, size }) => <MessageSquare color={color} size={size} /> 
        }} 
      />

      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: t.profileTitle, 
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} /> 
        }} 
      />
    </Tabs>
  );
}