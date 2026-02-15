import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { GenerateWorkoutService } from "../services/generate-workout-service";

export class WorkoutController {
	async create(request: FastifyRequest, reply: FastifyReply) {
		const chatBodySchema = z.object({
			message: z.string(),
		});

		const { message } = chatBodySchema.parse(request.body);
		console.log("CONTEUDO DO USER NO CONTROLLER:", request.user);

		const userPayload = request.user as any;
		const userId = userPayload?.sub || userPayload?.sign?.sub;

		if (!userId) {
			return reply.status(401).send({
				message:
					"Usuário não autenticado. Certifique-se de enviar um Token válido.",
			});
		}
		const generateWorkoutService = new GenerateWorkoutService();

		try {
			const workout = await generateWorkoutService.execute(userId, message);
			return reply.status(201).send(workout);
		} catch (error: any) {
			console.error("ERRO NO SERVICE:", error.message);
			return reply.status(400).send({ message: error.message });
		}
	}
}
