import { Tabs } from 'expo-router';
import { LucideHome, LucideMessageSquare } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#0f172a',
      headerShown: false,
      tabBarStyle: { height: 65, paddingBottom: 10, borderTopColor: '#f1f5f9' }
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home', 
          tabBarIcon: ({ color }) => <LucideHome color={color} size={24} /> 
        }} 
      />
      <Tabs.Screen 
        name="chat" 
        options={{ 
          title: 'IA Chat', 
          tabBarIcon: ({ color }) => <LucideMessageSquare color={color} size={24} /> 
        }} 
      />
    </Tabs>
  );
}