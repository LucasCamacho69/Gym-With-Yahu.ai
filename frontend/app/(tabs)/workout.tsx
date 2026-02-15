import { useRouter } from "expo-router";
import { Calendar, ChevronRight, Dumbbell } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Colors from "../../constants/Colors";
import { Workout, workoutService } from "../../src/services/workout-service";
import { usePreferencesStore } from "../../src/store/preferences-store";

export default function WorkoutsScreen() {
	const router = useRouter();
	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const { isDarkMode } = usePreferencesStore();

	const themeColors = isDarkMode ? Colors.dark : Colors.light;

	const fetchWorkouts = async () => {
		try {
			const data = await workoutService.getAll();
			setWorkouts(data);
		} catch (error) {
			console.error("Erro ao buscar treinos:", error);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	useEffect(() => {
		fetchWorkouts();
	}, []);

	const onRefresh = () => {
		setRefreshing(true);
		fetchWorkouts();
	};

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center bg-gray-50 dark:bg-zinc-950">
				<ActivityIndicator size="large" color={themeColors.tint} />
			</View>
		);
	}

	return (
		<View className="flex-1 bg-gray-50 dark:bg-zinc-950 p-4">
			<Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 mt-10">
				Meus Treinos
			</Text>

			{workouts.length === 0 ? (
				<View className="flex-1 justify-center items-center opacity-50">
					<Dumbbell size={64} color={themeColors.text} />
					<Text className="text-zinc-500 mt-4 text-center">
						Ainda não tens treinos.{"\n"}Pede um novo à IA no chat!
					</Text>
				</View>
			) : (
				<FlatList
					data={workouts}
					keyExtractor={(item) => item.id}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					contentContainerStyle={{ paddingBottom: 100 }}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => router.push(`/workout/${item.id}` as any)}
							className="bg-white dark:bg-zinc-900 p-5 rounded-2xl mb-4 shadow-sm border border-gray-100 dark:border-zinc-800 flex-row items-center justify-between"
						>
							<View className="flex-1">
								<View className="flex-row items-center mb-2">
									<Dumbbell
										size={16}
										color={themeColors.tint}
										style={{ marginRight: 8 }}
									/>
									<Text className="font-semibold text-lg text-zinc-800 dark:text-zinc-100">
										{item.name}
									</Text>
								</View>

								<View className="flex-row items-center">
									<Calendar
										size={14}
										color="#71717a"
										style={{ marginRight: 6 }}
									/>
									<Text className="text-zinc-500 text-sm">
										{new Date(item.createdAt).toLocaleDateString("pt-BR")}
									</Text>

									{item._count && (
										<Text className="text-zinc-400 text-xs ml-4">
											• {item._count.exercises} exercícios
										</Text>
									)}
								</View>
							</View>

							<ChevronRight size={20} color={themeColors.icon} />
						</TouchableOpacity>
					)}
				/>
			)}
		</View>
	);
}
