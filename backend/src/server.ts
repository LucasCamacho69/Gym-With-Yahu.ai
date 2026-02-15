import "dotenv/config";
import Fastify from "fastify";
import { userRoutes } from "./routes/user-route";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";

const app = Fastify({
	logger: true,
});

app.register(fastifyJwt, {
	secret: process.env.JWT_SECRET || "123",
});

app.register(userRoutes);

app.register(cors, {
	origin: true, // Em produção, mude para o domínio do seu app
});

app.setErrorHandler((error, _, reply) => {
	if (error instanceof Error) {
		return reply.status(400).send({ message: error.message });
	}
	return reply.status(500).send({ message: "Internal server error" });
});

const start = async () => {
	try {
		await app.listen({
			port: Number(process.env.PORT) || 3333,
			host: "0.0.0.0",
		});
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
