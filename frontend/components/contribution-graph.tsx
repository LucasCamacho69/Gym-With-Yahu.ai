import { View, Text } from 'react-native';

interface ContributionGraphProps {
  logs: { completedAt: string | Date }[];
}

export function ContributionGraph({ logs }: ContributionGraphProps) {

  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  
  return (
    <View className="bg-slate-50 p-4 rounded-xl border border-slate-200">
      <Text className="text-slate-900 font-semibold mb-4">Sua Consistência</Text>
      
      <View className="flex-row justify-between">
        {days.map((day, index) => {

          const hasWorkout = logs.length > index; 
          
          return (
            <View key={index} className="items-center">
              <View 
                className={`w-8 h-8 rounded-sm mb-1 ${
                  hasWorkout ? 'bg-emerald-500' : 'bg-slate-200'
                }`} 
              />
              <Text className="text-xs text-slate-500">{day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}