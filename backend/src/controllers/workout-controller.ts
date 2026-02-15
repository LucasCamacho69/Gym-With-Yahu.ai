import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { GenerateWorkoutService } from '../services/generate-workout-service';

export class WorkoutController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const chatBodySchema = z.object({
      message: z.string(),
    });

    const { message } = chatBodySchema.parse(request.body);
    const userId = request.user.sub; 

    const generateWorkoutService = new GenerateWorkoutService();
    
    try {
      const workout = await generateWorkoutService.execute(userId, message);
      return reply.status(201).send(workout);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Erro ao gerar treino com IA" });
    }
  }
}