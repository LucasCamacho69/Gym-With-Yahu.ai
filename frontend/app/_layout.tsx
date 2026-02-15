import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { usePreferencesStore } from '../src/store/preferences-store';
import { View } from 'react-native';
import Colors from '../constants/Colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { isDarkMode } = usePreferencesStore();
  // Aqui garantimos que o React Navigation recebe o tema correto
  const theme = isDarkMode ? DarkTheme : DefaultTheme;
  const backgroundColor = isDarkMode ? Colors.dark.background : Colors.light.background;

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={theme}>
      <View style={{ flex: 1, backgroundColor }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="(tabs)" />
          {/* A tela de detalhes fica aqui, fora das tabs */}
          <Stack.Screen name="workout/[id]" options={{ presentation: 'modal' }} />
        </Stack>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      </View>
    </ThemeProvider>
  );
}