import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../lib/prisma";

export class GenerateWorkoutService {
  async execute(userId: string, userMessage: string) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 1. Pegamos os exercícios que temos no banco
    const availableExercises = await prisma.exercise.findMany({
      select: { name: true, muscleGroup: true }
    });

    const exercisesList = availableExercises.map(e => `${e.name} (${e.muscleGroup})`).join(", ");

    // 2. Criamos o Prompt
    const prompt = `
      Você é um personal trainer de IA. 
      O usuário quer um treino baseado no seguinte pedido: "${userMessage}".
      
      Lista de exercícios disponíveis no meu banco de dados: [${exercisesList}].
      
      INSTRUÇÕES IMPORTANTES:
      - Use APENAS os exercícios da lista acima.
      - Retorne APENAS um objeto JSON puro, sem comentários ou blocos de código markdown.
      - Formato do JSON esperado:
      {
        "workoutName": "Nome do Treino",
        "exercises": [
          { "name": "Nome do Exercício", "sets": 3, "reps": "12", "rest": 60 }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    const workoutData = JSON.parse(responseText);

    const workout = await prisma.workout.create({
      data: {
        userId,
        name: workoutData.workoutName,
        isAiGenerated: true,
        exercises: {
          create: workoutData.exercises.map((ex: any) => ({
            exercise: { connect: { name: ex.name } },
            sets: ex.sets,
            reps: ex.reps.toString(),
            restTime: ex.rest
          }))
        }
      },
      include: { exercises: { include: { exercise: true } } }
    });

    return workout;
  }
}