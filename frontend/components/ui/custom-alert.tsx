import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { usePreferencesStore } from '@/src/store/preferences-store';
import Colors from '@/constants/Colors';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string; // Se não passar, mostra apenas um botão de "OK"
}

export function CustomAlert({ 
  visible, 
  title, 
  message, 
  onClose, 
  onConfirm,
  confirmText = "OK",
  cancelText 
}: CustomAlertProps) {
  const { isDarkMode } = usePreferencesStore();
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View className="w-full bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-zinc-800">
          <Text className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            {title}
          </Text>
          <Text className="text-zinc-600 dark:text-zinc-400 mb-6 leading-6">
            {message}
          </Text>

          <View className="flex-row justify-end space-x-3">
            {cancelText && (
              <TouchableOpacity 
                onPress={onClose}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800"
              >
                <Text className="text-zinc-600 dark:text-zinc-300 font-medium">
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              onPress={() => {
                if (onConfirm) onConfirm();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-indigo-600"
            >
              <Text className="text-white font-bold">
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}