import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma"; // Importa o prisma

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
	try {
		await request.jwtVerify();

		const userPayload = request.user as any;
		const userId = userPayload.sub || userPayload.id;

		if (!userId) {
			return reply.status(401).send({ message: "Token inválido (sem ID)." });
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return reply.status(401).send({ message: "Usuário não encontrado." });
		}
	} catch (err) {
		return reply.status(401).send({ message: "Unauthorized" });
	}
}
