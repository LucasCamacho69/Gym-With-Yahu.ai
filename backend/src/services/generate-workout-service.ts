import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../lib/prisma";

export class GenerateWorkoutService {
	async execute(userId: string, userMessage: string) {
		const apiKey = process.env.GEMINI_API_KEY;
		if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

		const genAI = new GoogleGenerativeAI(apiKey);

		const model = genAI.getGenerativeModel({
			model: "gemini-2.5-flash",
		});

		const availableExercises = await prisma.exercise.findMany({
			select: { name: true, muscleGroup: true },
		});

		// MUDANÇA 1: Formatamos a lista de forma mais clara para a IA
		const exercisesList =
			availableExercises.length > 0
				? availableExercises
						.map((e) => `- EXERCÍCIO: "${e.name}" | GRUPO: ${e.muscleGroup}`)
						.join("\n")
				: "- EXERCÍCIO: Flexão de Braço | GRUPO: Peito";

		const prompt = `
      Você é o Yahu, um Personal Trainer de IA focado em hipertrofia.
      O usuário quer: "${userMessage}".
      
      LISTA DE EXERCÍCIOS DISPONÍVEIS (USE APENAS ESTES):
      ${exercisesList}
      
      INSTRUÇÕES CRÍTICAS:
      1. No campo "name" do JSON, use o NOME EXATO que está entre aspas na lista acima. 
      2. Não adicione o grupo muscular ou qualquer texto extra ao nome.
      3. Se o usuário pedir algo que não está na lista, use o exercício mais próximo da lista.

      Retorne APENAS um objeto JSON puro:
      {
        "workoutName": "Nome Criativo do Treino",
        "exercises": [
          { "name": "Nome Exato", "sets": 3, "reps": "10-12", "rest": 60 }
        ]
      }
    `;

		try {
			const result = await model.generateContent(prompt);
			const response = await result.response;
			const responseText = response.text();

			// MUDANÇA 2: Limpeza mais robusta do Markdown
			const cleanResponse = responseText.replace(/```json|```/g, "").trim();
			const workoutData = JSON.parse(cleanResponse);

			const workout = await prisma.workout.create({
				data: {
					userId,
					name: workoutData.workoutName,
					isAiGenerated: true,
					exercises: {
						create: workoutData.exercises.map((ex: any) => ({
							exercise: {
								connect: { name: ex.name.trim() }, // trim() para evitar espaços bobos
							},
							sets: Number(ex.sets),
							reps: String(ex.reps),
							restTime: Number(ex.rest),
						})),
					},
				},
				include: { exercises: { include: { exercise: true } } },
			});

			return workout;
		} catch (error: any) {
			console.error("❌ ERRO NO SERVICE:", error);
			throw new Error(`Falha na geração: ${error.message}`);
		}
	}
}
