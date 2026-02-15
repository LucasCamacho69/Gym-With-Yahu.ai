import React, { useState, useRef } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { LucideSend, LucideBot, LucideDumbbell, LucideTimer } from 'lucide-react-native';
import { useAuthStore } from '../../src/store/auth-store';
import { api } from '../../src/services/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  workoutData?: any; 
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Olá! Sou seu Personal IA. Qual o foco do treino de hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { token } = useAuthStore();

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post('/workouts', { message: input });
      const workout = response.data;

      const botMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: `Treino "${workout.name}" gerado com sucesso! Aqui está o seu plano:`,
        workoutData: workout 
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: 'err', role: 'assistant', content: 'Ops, tive um problema ao gerar seu treino. Verifique sua conexão.' 
      }]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-white dark:bg-slate-950"
      keyboardVerticalOffset={100}
    >
      {/* Header */}
      <View className="pt-16 pb-4 px-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
        <View className="flex-row items-center">
          <View className="bg-slate-900 dark:bg-slate-100 p-2 rounded-full">
            <LucideBot color={Platform.OS === 'ios' ? 'white' : '#0f172a'} size={24} />
          </View>
          <View className="ml-3">
            <Text className="text-slate-900 dark:text-white font-bold text-lg">Personal IA</Text>
            <Text className="text-green-500 text-xs">Online agora</Text>
          </View>
        </View>
      </View>

      {/* Mensagens */}
      <ScrollView 
        ref={scrollViewRef}
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages.map((msg) => (
          <View key={msg.id} className={`mb-6 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <View 
              className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-slate-900 dark:bg-slate-100' 
                  : 'bg-slate-100 dark:bg-slate-900'
              }`}
            >
              <Text className={msg.role === 'user' ? 'text-white dark:text-slate-900' : 'text-slate-900 dark:text-white'}>
                {msg.content}
              </Text>

              {/* CARD DE TREINO INTEGRADO */}
              {msg.workoutData && (
                <View className="mt-4 bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <View className="flex-row items-center mb-3 pb-2 border-b border-slate-100 dark:border-slate-700">
                    <LucideDumbbell size={18} color={msg.role === 'user' ? '#0f172a' : '#94a3b8'} />
                    <Text className="ml-2 font-bold text-slate-900 dark:text-white">
                      {msg.workoutData.name}
                    </Text>
                  </View>

                  {msg.workoutData.exercises.map((item: any, index: number) => (
                    <View key={index} className="mb-3">
                      <Text className="text-slate-900 dark:text-slate-100 font-semibold text-sm">
                        {item.exercise.name}
                      </Text>
                      <View className="flex-row items-center mt-1">
                        <Text className="text-slate-500 text-xs mr-3">
                          {item.sets} séries × {item.reps} reps
                        </Text>
                        <View className="flex-row items-center">
                          <LucideTimer size={12} color="#94a3b8" />
                          <Text className="text-slate-500 text-xs ml-1">{item.restTime}s descanso</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}
        {loading && <Text className="text-slate-400 text-xs italic ml-2">Yahu está montando seu treino...</Text>}
      </ScrollView>

      {/* Input de Mensagem */}
      <View className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
        <View className="flex-row items-center bg-slate-50 dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
          <TextInput
            className="flex-1 px-3 py-2 text-slate-900 dark:text-white"
            placeholder="Ex: Treino de peito focado em força"
            placeholderTextColor="#94a3b8"
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity 
            onPress={handleSend}
            disabled={loading}
            className={`p-3 rounded-xl ${loading ? 'bg-slate-300' : 'bg-slate-900 dark:bg-slate-100'}`}
          >
            <LucideSend size={20} color={Platform.OS === 'ios' && !loading ? 'white' : '#0f172a'} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}