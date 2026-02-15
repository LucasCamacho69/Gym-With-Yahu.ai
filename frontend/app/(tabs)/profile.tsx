import { CustomAlert } from "@/components/ui/custom-alert";
import Colors from "@/constants/Colors";
import { useAuthStore } from "@/src/store/auth-store";
import { usePreferencesStore } from "@/src/store/preferences-store";
import { translations } from "@/src/utils/i18n";
import { useRouter } from "expo-router";
import {
	ChevronRight,
	Globe,
	LogOut,
	Moon,
	User as UserIcon,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
	const router = useRouter();
	const { signOut, user } = useAuthStore();
	const { isDarkMode, toggleTheme, language, setLanguage } =
		usePreferencesStore();

	// Estado para controlar o Alerta Personalizado
	const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);

	const t = translations[language];
	const themeColors = isDarkMode ? Colors.dark : Colors.light;

	const toggleLanguage = () => {
		setLanguage(language === "pt" ? "en" : "pt");
	};

	const handleConfirmLogout = () => {
		signOut();
		router.replace("/login");
	};

	return (
		<ScrollView className="flex-1 bg-gray-50 dark:bg-zinc-950">
			{/* Header com Avatar e Dados do User */}
			<View className="items-center justify-center pt-20 pb-8 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
				<View className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full items-center justify-center mb-4 border-2 border-indigo-500">
					<UserIcon size={40} color="#6366f1" />
				</View>
				<Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
					{user?.name || t.athlete}
				</Text>
				<Text className="text-zinc-500 dark:text-zinc-400 mt-1">
					{user?.email || "usuario@gymyahu.ai"}
				</Text>
			</View>

			<View className="p-6">
				<Text className="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-wider">
					{t.settings}
				</Text>

				<View className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 mb-8">
					{/* Alternar Tema (Dark Mode) */}
					<View className="flex-row items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-800">
						<View className="flex-row items-center">
							<View className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 items-center justify-center mr-3">
								<Moon size={18} color="#6366f1" />
							</View>
							<Text className="text-lg text-zinc-800 dark:text-zinc-200 font-medium">
								{t.darkMode}
							</Text>
						</View>
						<Switch
							value={isDarkMode}
							onValueChange={toggleTheme}
							trackColor={{ false: "#e4e4e7", true: "#6366f1" }}
							thumbColor={"#fff"}
						/>
					</View>

					{/* Alternar Idioma */}
					<TouchableOpacity
						onPress={toggleLanguage}
						className="flex-row items-center justify-between p-4"
					>
						<View className="flex-row items-center">
							<View className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 items-center justify-center mr-3">
								<Globe size={18} color="#10b981" />
							</View>
							<Text className="text-lg text-zinc-800 dark:text-zinc-200 font-medium">
								{t.language}
							</Text>
						</View>
						<View className="flex-row items-center">
							<Text className="text-zinc-400 mr-2 uppercase text-xs font-bold">
								{language}
							</Text>
							<ChevronRight size={20} color={themeColors.text} />
						</View>
					</TouchableOpacity>
				</View>

				{/* Botão de Logout */}
				<Text className="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-wider">
					{t.account}
				</Text>

				<TouchableOpacity
					onPress={() => setLogoutAlertVisible(true)}
					className="bg-white dark:bg-zinc-900 flex-row items-center p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 active:bg-red-50 dark:active:bg-red-900/10"
				>
					<View className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 items-center justify-center mr-3">
						<LogOut size={18} color="#ef4444" />
					</View>
					<Text className="text-lg text-red-500 font-medium">{t.logout}</Text>
				</TouchableOpacity>

				{/* Versão */}
				<View className="items-center mt-10">
					<Text className="text-zinc-400 text-xs">GymWithYahu AI v1.0.0</Text>
				</View>
			</View>

			{/* Alerta Personalizado de Logout */}
			<CustomAlert
				visible={logoutAlertVisible}
				title={t.logout}
				message={
					language === "pt"
						? "Tem a certeza que deseja sair da sua conta?"
						: "Are you sure you want to log out?"
				}
				onClose={() => setLogoutAlertVisible(false)}
				onConfirm={handleConfirmLogout}
				confirmText={language === "pt" ? "Sair" : "Logout"}
				cancelText={language === "pt" ? "Cancelar" : "Cancel"}
			/>
		</ScrollView>
	);
}
