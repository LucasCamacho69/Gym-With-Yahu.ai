import { TouchableOpacity } from 'react-native';
import { LucideSun, LucideMoon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity 
      onPress={toggleColorScheme}
      className="p-3 rounded-full bg-slate-100 dark:bg-slate-800"
    >
      {isDark ? (
        <LucideSun color="#fbbf24" size={20} /> // Sol amarelo no dark
      ) : (
        <LucideMoon color="#0f172a" size={20} /> // Lua escura no light
      )}
    </TouchableOpacity>
  );
}