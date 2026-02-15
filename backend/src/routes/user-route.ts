import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user-controller";
import { AuthController } from "../controllers/auth-controller";
import { verifyJWT } from "../middleware/verify-jwt";

const userController = new UserController();
const authController = new AuthController();

export async function userRoutes(app: FastifyInstance) {
	app.post("/users", userController.create);
	app.post("/sessions", authController.handle);

	app.get("/me", { onRequest: [verifyJWT] }, async (request) => {
		return { userId: request.user.sub };
	});
}
