import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <StyledView className="flex-1 bg-white dark:bg-slate-950" key={colorScheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </StyledView>
  );
}