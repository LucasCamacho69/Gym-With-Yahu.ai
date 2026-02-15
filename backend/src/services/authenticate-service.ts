import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';

interface AuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateService {
  async execute({ email, password }: AuthenticateRequest) {

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Returns user if ok
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
}