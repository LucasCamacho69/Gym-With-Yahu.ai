import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthenticateService } from "../services/authenticate-service";

export class AuthController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const authBodySchema = z.object({
			email: z.string().email(),
			password: z.string(),
		});

		const { email, password } = authBodySchema.parse(request.body);

		try {
			const authenticateService = new AuthenticateService();
			const user = await authenticateService.execute({ email, password });

			const token = await reply.jwtSign({
				sign: {
					sub: user.id,
					expiresIn: "7d",
				},
			});

			return reply.status(200).send({ user, token });
		} catch (err) {
			return reply.status(401).send({ message: "Invalid credentials" });
		}
	}
}
