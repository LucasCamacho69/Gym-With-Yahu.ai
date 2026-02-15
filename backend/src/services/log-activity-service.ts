import { prisma } from "../lib/prisma";

export class LogActivityService {
	async execute(userId: string, workoutId: string) {
		const log = await prisma.activityLog.create({
			data: {
				userId,
				workoutId,
			},
		});
		return log;
	}

	//heat-map
	async getUserStats(userId: string) {
		const logs = await prisma.activityLog.findMany({
			where: { userId },
			select: { completedAt: true },
		});
		return logs;
	}
}
