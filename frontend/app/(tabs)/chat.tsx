import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Send, Bot, Dumbbell, User } from 'lucide-react-native';
import { api } from '@/src/services/api';
import { usePreferencesStore } from '@/src/store/preferences-store';
import Colors from '@/constants/Colors';

// Componente para a animação "Pensando..."
const TypingIndicator = () => {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '');
    }, 400);
    return () => clearInterval(interval);
  }, []);
  return (
    <View className="flex-row items-center ml-2 mb-4">
      <View className="bg-indigo-600 w-6 h-6 rounded-full items-center justify-center mr-2">
        <Bot size={14} color="white" />
      </View>
      <Text className="text-zinc-500 text-sm italic">
        Yahu está a pensar{dots}
      </Text>
    </View>
  );
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  workoutData?: any; 
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Olá! Sou o Yahu. Qual o foco do treino de hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const { isDarkMode } = usePreferencesStore();
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  const MAX_CHARS = 120;

  async function handleSend() {
    // Validações: Texto vazio, Carregando ou Excedeu limite
    if (!input.trim() || loading || input.length > MAX_CHARS) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    const messageToSend = input;
    setInput(''); // Limpa o input imediatamente
    setLoading(true);

    try {
      // Rota correta conforme seu backend
      const response = await api.post('/workouts/generate', { message: messageToSend });
      const workout = response.data;

      const botMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: `Treino "${workout.name}" criado com sucesso! Toque abaixo para ver os detalhes.`,
        workoutData: workout 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: 'err', 
        role: 'assistant', 
        content: 'Ops, tive um problema de conexão ao gerar o treino. Verifique se o servidor está rodando.' 
      }]);
    } finally {
      setLoading(false);
      // Scroll para o final
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-gray-50 dark:bg-zinc-950"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header Fixo */}
      <View className="p-4 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pt-12 shadow-sm z-10">
        <View className="flex-row items-center">
          <View className="bg-indigo-600 p-2 rounded-full mr-3">
            <Bot color="white" size={24} />
          </View>
          <View>
            <Text className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Yahu IA</Text>
            <Text className="text-emerald-500 text-xs font-medium">Online</Text>
          </View>
        </View>
      </View>

      {/* Lista de Mensagens */}
      <ScrollView 
        ref={scrollViewRef}
        className="flex-1 px-4 py-4"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages.map((msg) => (
          <View key={msg.id} className={`mb-4 flex-row ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            
            {msg.role === 'assistant' && (
               <View className="bg-indigo-600 w-8 h-8 rounded-full items-center justify-center mr-2 self-start mt-2">
                 <Bot size={16} color="white" />
               </View>
            )}
            
            <View className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-zinc-800 dark:bg-zinc-700 rounded-tr-none' 
                  : 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-tl-none'
              }`}>
              <Text className={msg.role === 'user' ? 'text-white' : 'text-zinc-800 dark:text-zinc-200'}>
                {msg.content}
              </Text>

              {/* Card de Treino Gerado */}
              {msg.workoutData && (
                <View className="mt-3 bg-gray-50 dark:bg-zinc-950 rounded-xl p-3 border border-gray-100 dark:border-zinc-800">
                  <View className="flex-row items-center mb-2 pb-2 border-b border-gray-200 dark:border-zinc-800">
                    <Dumbbell size={16} color={themeColors.tint} />
                    <Text className="ml-2 font-bold text-zinc-900 dark:text-zinc-50 flex-1" numberOfLines={1}>
                      {msg.workoutData.name}
                    </Text>
                  </View>
                  {/* Mostra apenas os 3 primeiros exercícios como preview */}
                  {msg.workoutData.exercises?.slice(0, 3).map((item: any, idx: number) => (
                    <Text key={idx} className="text-zinc-500 text-xs mb-1">• {item.exercise.name}</Text>
                  ))}
                  <Text className="text-indigo-500 text-[10px] mt-2 font-bold">
                    Ver treino completo na aba Treinos
                  </Text>
                </View>
              )}
            </View>

             {msg.role === 'user' && (
               <View className="bg-gray-200 dark:bg-zinc-800 w-8 h-8 rounded-full items-center justify-center ml-2 self-start mt-2">
                 <User size={16} color={themeColors.text} />
               </View>
            )}
          </View>
        ))}
        
        {loading && <TypingIndicator />}
      </ScrollView>

      {/* Área de Input */}
      <View className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
        <View className={`p-1 rounded-2xl border flex-row items-center pr-2 ${
           input.length >= MAX_CHARS ? 'border-red-300 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950'
        }`}>
          <TextInput
            className="flex-1 px-4 py-3 text-zinc-900 dark:text-zinc-100 max-h-24"
            placeholder="Ex: Treino de peito intenso..."
            placeholderTextColor="#a1a1aa"
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={MAX_CHARS}
          />
          <TouchableOpacity 
            onPress={handleSend}
            disabled={loading || input.length === 0}
            className={`p-3 rounded-xl ${input.length > 0 && !loading ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-zinc-800'}`}
          >
            <Send size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Contador de Caracteres */}
        <Text className={`text-right text-[10px] mt-1 ${input.length === MAX_CHARS ? 'text-red-500 font-bold' : 'text-zinc-400'}`}>
          {input.length}/{MAX_CHARS}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}