import "@fastify/jwt";

declare module "@fastify/jwt" {
	interface FastifyJWT {
		user: {
			sign: any;
			sub: string;
			name: string;
		};
	}
}
