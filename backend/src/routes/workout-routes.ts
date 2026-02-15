import { FastifyInstance } from "fastify";
import { WorkoutController } from "../controllers/workout-controller";
import { verifyJWT } from "../middleware/verify-jwt";

const workoutController = new WorkoutController();

export async function workoutRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/workouts/generate", workoutController.create);
	app.get("/workouts", workoutController.history); // Listar todos os workouts
	app.get("/workouts/:id", workoutController.show);
}
