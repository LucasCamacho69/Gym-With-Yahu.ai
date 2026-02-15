import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Modal,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
// USAR O ATALHO @/ PARA CORRIGIR OS IMPORTS
import Colors from "@/constants/Colors";
import {
	Workout,
	WorkoutExercise,
	workoutService,
} from "@/src/services/workout-service";
import { usePreferencesStore } from "@/src/store/preferences-store";
import { ArrowLeft, Clock, Play, Repeat, X } from "lucide-react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function WorkoutDetailScreen() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const [workout, setWorkout] = useState<Workout | null>(null);
	const [loading, setLoading] = useState(true);

	// Tipar explicitamente o estado
	const [selectedExercise, setSelectedExercise] =
		useState<WorkoutExercise | null>(null);
	const [videoPlaying, setVideoPlaying] = useState(false);

	const { isDarkMode } = usePreferencesStore();
	const themeColors = isDarkMode ? Colors.dark : Colors.light;

	useEffect(() => {
		if (id) {
			workoutService
				.getById(id as string)
				.then(setWorkout)
				.catch(console.error)
				.finally(() => setLoading(false));
		}
	}, [id]);

	const getVideoId = (url: string) => {
		if (!url) return null;
		const regExp =
			/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : null;
	};

	const handleOpenVideo = (exercise: WorkoutExercise) => {
		setSelectedExercise(exercise);
		setVideoPlaying(true);
	};

	const handleCloseVideo = () => {
		setVideoPlaying(false);
		setSelectedExercise(null);
	};

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center bg-gray-50 dark:bg-zinc-950">
				<ActivityIndicator size="large" color={themeColors.tint} />
			</View>
		);
	}

	return (
		<View className="flex-1 bg-gray-50 dark:bg-zinc-950">
			<Stack.Screen options={{ headerShown: false }} />

			<View className="pt-12 pb-4 px-4 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 flex-row items-center">
				<TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
					<ArrowLeft size={24} color={themeColors.text} />
				</TouchableOpacity>
				<Text className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex-1">
					{workout?.name || "Detalhes do Treino"}
				</Text>
			</View>

			<ScrollView className="p-4">
				<Text className="text-sm text-zinc-500 mb-4 uppercase font-bold tracking-wider">
					Lista de Exercícios
				</Text>

				{/* Tipagem explicita no map */}
				{workout?.exercises?.map((item: WorkoutExercise, index: number) => (
					<TouchableOpacity
						key={item.id}
						onPress={() => handleOpenVideo(item)}
						className="bg-white dark:bg-zinc-900 p-4 rounded-xl mb-3 border border-gray-100 dark:border-zinc-800 flex-row items-center"
					>
						<View className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 items-center justify-center mr-4">
							<Text className="text-blue-600 dark:text-blue-400 font-bold">
								{index + 1}
							</Text>
						</View>

						<View className="flex-1">
							<Text className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-1">
								{item.exercise.name}
							</Text>

							<View className="flex-row items-center space-x-4">
								{item.sets && (
									<View className="flex-row items-center mr-3">
										<Repeat size={14} color="#71717a" />
										<Text className="text-zinc-500 text-xs ml-1">
											{item.sets} x {item.reps}
										</Text>
									</View>
								)}
								<View className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
									<Text className="text-zinc-500 text-[10px] uppercase">
										{item.exercise.muscleGroup}
									</Text>
								</View>
							</View>
						</View>

						{item.exercise.videoUrl && (
							<View className="bg-red-50 dark:bg-red-900/20 p-2 rounded-full">
								<Play size={20} color="#ef4444" fill="#ef4444" />
							</View>
						)}
					</TouchableOpacity>
				))}

				<View className="h-20" />
			</ScrollView>

			<Modal
				animationType="slide"
				transparent={true}
				visible={!!selectedExercise}
				onRequestClose={handleCloseVideo}
			>
				<View className="flex-1 justify-end bg-black/80">
					<View className="bg-white dark:bg-zinc-900 rounded-t-3xl h-[85%] w-full overflow-hidden">
						<View className="flex-row justify-between items-center p-4 border-b border-gray-100 dark:border-zinc-800">
							<Text
								className="text-lg font-bold text-zinc-800 dark:text-zinc-100 flex-1 mr-4"
								numberOfLines={1}
							>
								{selectedExercise?.exercise.name}
							</Text>
							<TouchableOpacity
								onPress={handleCloseVideo}
								className="bg-gray-100 dark:bg-zinc-800 p-2 rounded-full"
							>
								<X size={20} color={themeColors.text} />
							</TouchableOpacity>
						</View>

						<View className="w-full bg-black aspect-video justify-center">
							{selectedExercise?.exercise.videoUrl ? (
								<YoutubePlayer
									height={220}
									play={videoPlaying}
									videoId={
										getVideoId(selectedExercise.exercise.videoUrl) || undefined
									}
									onChangeState={(state: any) => {
										if (state === "ended") setVideoPlaying(false);
									}}
								/>
							) : (
								<Text className="text-white text-center">
									Vídeo não disponível
								</Text>
							)}
						</View>

						<ScrollView className="p-6">
							<View className="flex-row justify-between mb-6">
								<View className="items-center bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-xl w-[48%]">
									<Repeat size={24} color={themeColors.tint} className="mb-2" />
									<Text className="text-zinc-500 text-xs">
										Séries / Repetições
									</Text>
									<Text className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
										{selectedExercise?.sets} x {selectedExercise?.reps}
									</Text>
								</View>

								<View className="items-center bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-xl w-[48%]">
									<Clock size={24} color={themeColors.tint} className="mb-2" />
									<Text className="text-zinc-500 text-xs">Descanso</Text>
									<Text className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
										{selectedExercise?.restTime || 60}s
									</Text>
								</View>
							</View>

							<Text className="text-zinc-800 dark:text-zinc-100 font-bold text-lg mb-2">
								Instruções
							</Text>
							<Text className="text-zinc-600 dark:text-zinc-400 leading-6">
								{selectedExercise?.exercise.description ||
									"Execute o movimento de forma controlada. Assista ao vídeo para ver a técnica correta."}
							</Text>
						</ScrollView>
					</View>
				</View>
			</Modal>
		</View>
	);
}
