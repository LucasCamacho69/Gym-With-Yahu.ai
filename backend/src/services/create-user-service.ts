import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string; 
}

export class CreateUserService {
  async execute({ name, email, password }: CreateUserRequest) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    });

    return user;
  }
}