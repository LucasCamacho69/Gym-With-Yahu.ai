import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useAuthStore } from '@/src/store/auth-store';
import { usePreferencesStore } from '@/src/store/preferences-store';
import { workoutService, Workout } from '@/src/services/workout-service';
import Colors from '@/constants/Colors';
import { Dumbbell, Calendar, TrendingUp, CheckCircle2 } from 'lucide-react-native';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { isDarkMode } = usePreferencesStore();
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
  
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Gera os últimos 7 dias (ex: ["2026-02-15", "2026-02-14", ...])
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split('T')[0]); 
    }
    return days;
  };

  const fetchActivity = async () => {
    try {
      const data = await workoutService.getAll();
      setWorkouts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  // Verifica se existe algum treino nesta data (compara strings YYYY-MM-DD)
  const hasWorkoutOnDate = (dateStr: string) => {
    return workouts.some(w => w.createdAt.startsWith(dateStr));
  };

  const weekDays = getLast7Days();

  return (
    <ScrollView 
      className="flex-1 bg-gray-50 dark:bg-zinc-950"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchActivity(); }} />}
    >
      {/* Header */}
      <View className="pt-16 pb-6 px-6 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
        <Text className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Bem-vindo de volta,</Text>
        <Text className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
          {user?.name || "Atleta"}
        </Text>
      </View>

      {/* Calendário de Constância */}
      <View className="m-6 p-5 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
             <Calendar size={20} color={themeColors.tint} style={{marginRight: 8}}/>
             <Text className="font-bold text-lg text-zinc-800 dark:text-zinc-100">Sua Constância</Text>
          </View>
          <Text className="text-xs text-zinc-400 uppercase">Últimos 7 dias</Text>
        </View>

        <View className="flex-row justify-between mt-2">
          {weekDays.map((day) => {
            const isActive = hasWorkoutOnDate(day);
            // Pega a letra do dia da semana (D, S, T, Q...)
            const dayLabel = new Date(day).toLocaleDateString('pt-BR', { weekday: 'narrow' }).toUpperCase();
            
            return (
              <View key={day} className="items-center">
                 <View 
                   className={`w-10 h-10 rounded-full items-center justify-center mb-2 border ${
                     isActive 
                      ? 'bg-emerald-500 border-emerald-500 shadow-sm' 
                      : 'bg-transparent border-gray-200 dark:border-zinc-700'
                   }`}
                 >
                   {isActive && <CheckCircle2 size={16} color="white" />}
                 </View>
                 <Text className={`text-xs ${isActive ? 'font-bold text-emerald-600' : 'text-zinc-400'}`}>
                   {dayLabel}
                 </Text>
              </View>
            );
          })}
        </View>

        <View className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800">
           <Text className="text-center text-zinc-500 text-sm">
             Você treinou <Text className="font-bold text-emerald-600">{workouts.length}</Text> vezes no total.
           </Text>
        </View>
      </View>

      {/* Cards de Resumo */}
      <View className="flex-row px-6 space-x-4 mb-10">
        <View className="flex-1 bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800">
           <TrendingUp size={24} color="#6366f1" style={{marginBottom: 8}} />
           <Text className="text-zinc-500 dark:text-zinc-400 text-xs">Objetivo Atual</Text>
           <Text className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Hipertrofia</Text>
        </View>
        
        <View className="flex-1 bg-orange-50 dark:bg-orange-900/10 p-4 rounded-2xl border border-orange-100 dark:border-orange-800">
           <Dumbbell size={24} color="#f97316" style={{marginBottom: 8}} />
           <Text className="text-zinc-500 dark:text-zinc-400 text-xs">Total Exercícios</Text>
           <Text className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
             {workouts.reduce((acc, curr) => acc + (curr._count?.exercises || 0), 0)}
           </Text>
        </View>
      </View>
    </ScrollView>
  );
}