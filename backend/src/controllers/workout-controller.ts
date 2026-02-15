import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { GenerateWorkoutService } from "../services/generate-workout-service";
import { prisma } from "../lib/prisma"; 

export class WorkoutController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const chatBodySchema = z.object({
      message: z.string(),
    });

    const { message } = chatBodySchema.parse(request.body);
    const userPayload = request.user as any;
    const userId = userPayload?.sub || userPayload?.sign?.sub;

    if (!userId) {
      return reply.status(401).send({
        message: "Usuário não autenticado.",
      });
    }

    const generateWorkoutService = new GenerateWorkoutService();

    try {
      const workout = await generateWorkoutService.execute(userId, message);
      return reply.status(201).send(workout);
    } catch (error: any) {
      return reply.status(400).send({ message: error.message });
    }
  }

  async history(request: FastifyRequest, reply: FastifyReply) {
    const userPayload = request.user as any;
    const userId = userPayload?.sub || userPayload?.sign?.sub;

    const workouts = await prisma.workout.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { exercises: true }
        }
      }
    });

    return reply.status(200).send(workouts);
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const workout = await prisma.workout.findUnique({
      where: { id },
      include: {
        exercises: {
          include: {
            exercise: true, 
          },
        },
      },
    });

    if (!workout) {
      return reply.status(404).send({ message: "Treino não encontrado." });
    }

    return reply.status(200).send(workout);
  }
}