import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CreateUserService } from '../services/create-user-service';

export class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const createUserSchema = z.object({
      name: z.string().min(3),
      email: z.string().email(),
    });

    const { name, email } = createUserSchema.parse(request.body);

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email });

    return reply.status(201).send(user);
  }
}