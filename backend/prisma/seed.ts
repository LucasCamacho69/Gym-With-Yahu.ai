import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {

  await prisma.workoutExercise.deleteMany();
  await prisma.exercise.deleteMany();

  // prisma/seed.ts - Adicione estes ao array 'exercises'
// prisma/seed.ts - Adicione estes ao array 'exercises'
const exercises = [
  // PEITO
  { name: 'Supino Reto Barra', muscleGroup: 'Peito', videoUrl: 'https://www.youtube.com/watch?v=sqOhadTM99U' },
  { name: 'Supino Inclinado com Halteres', muscleGroup: 'Peito', videoUrl: 'https://www.youtube.com/watch?v=8iP9S8NPr_U' },
  { name: 'Crucifixo Máquina (Peck Deck)', muscleGroup: 'Peito', videoUrl: 'https://www.youtube.com/watch?v=W78v_v_u7iI' },
  { name: 'Cross Over Polia Alta', muscleGroup: 'Peito', videoUrl: 'https://www.youtube.com/watch?v=H75_9E_r4Hk' },
  { name: 'Supino Declinado Barra', muscleGroup: 'Peito', videoUrl: 'https://www.youtube.com/watch?v=LfyQ_S_T7y0' },
  { name: 'Flexão de Braços', muscleGroup: 'Peito', videoUrl: 'https://www.youtube.com/watch?v=v9LABVJzv8Y' },
  { name: 'Pull Over com Halter', muscleGroup: 'Peito', videoUrl: 'https://www.youtube.com/watch?v=5V_97mX_27o' },

  // COSTAS
  { name: 'Puxada Pulley Frente', muscleGroup: 'Costas', videoUrl: 'https://www.youtube.com/watch?v=ER6fI-S8T-s' },
  { name: 'Remada Curvada com Barra', muscleGroup: 'Costas', videoUrl: 'https://www.youtube.com/watch?v=S3U_9p56S7E' },
  { name: 'Remada Baixa com Triângulo', muscleGroup: 'Costas', videoUrl: 'https://www.youtube.com/watch?v=IkoGfGOf-X8' },
  { name: 'Barra Fixa (Pull-up)', muscleGroup: 'Costas', videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
  { name: 'Remada Unilateral (Serrote)', muscleGroup: 'Costas', videoUrl: 'https://www.youtube.com/watch?v=skI6vOnoC94' },
  { name: 'Pulldown na Polia Alta', muscleGroup: 'Costas', videoUrl: 'https://www.youtube.com/watch?v=6m89-p6Vj2E' },
  { name: 'Levantamento Terra', muscleGroup: 'Costas', videoUrl: 'https://www.youtube.com/watch?v=X07P8v_qYfM' },

  // PERNAS (QUADRÍCEPS E POSTERIOR)
  { name: 'Agachamento Livre Barra', muscleGroup: 'Pernas', videoUrl: 'https://www.youtube.com/watch?v=R2dMsNkZidM' },
  { name: 'Leg Press 45', muscleGroup: 'Pernas', videoUrl: 'https://www.youtube.com/watch?v=yZpx_V9iy_o' },
  { name: 'Cadeira Extensora', muscleGroup: 'Pernas', videoUrl: 'https://www.youtube.com/watch?v=7uV_V07p7-E' },
  { name: 'Mesa Flexora', muscleGroup: 'Pernas', videoUrl: 'https://www.youtube.com/watch?v=fXfS6vOn_2Q' },
  { name: 'Cadeira Flexora', muscleGroup: 'Pernas', videoUrl: 'https://www.youtube.com/watch?v=GAn_1S_Uo7g' },
  { name: 'Stiff com Barra', muscleGroup: 'Pernas', videoUrl: 'https://www.youtube.com/watch?v=h6id769X6tI' },
  { name: 'Afundo com Halteres', muscleGroup: 'Pernas', videoUrl: 'https://www.youtube.com/watch?v=6pYV5D9T7_w' },
  { name: 'Cadeira Abdutora', muscleGroup: 'Pernas', videoUrl: 'https://www.youtube.com/watch?v=pAnIas8W_b4' },
  { name: 'Cadeira Adutora', muscleGroup: 'Pernas', videoUrl: 'https://www.youtube.com/watch?v=hO-e_NqN8vQ' },

  // OMBROS
  { name: 'Desenvolvimento com Halteres', muscleGroup: 'Ombros', videoUrl: 'https://www.youtube.com/watch?v=M2rwvNhSct0' },
  { name: 'Elevação Lateral Halteres', muscleGroup: 'Ombros', videoUrl: 'https://www.youtube.com/watch?v=2v-re6mS_vA' },
  { name: 'Elevação Frontal com Barra', muscleGroup: 'Ombros', videoUrl: 'https://www.youtube.com/watch?v=Ounm3G_YmSw' },
  { name: 'Crucifixo Inverso Halteres', muscleGroup: 'Ombros', videoUrl: 'https://www.youtube.com/watch?v=wXWp_O6Iid0' },
  { name: 'Remada Alta na Polia', muscleGroup: 'Ombros', videoUrl: 'https://www.youtube.com/watch?v=yW_I_8L4M5k' },
  { name: 'Encolhimento com Halteres', muscleGroup: 'Ombros', videoUrl: 'https://www.youtube.com/watch?v=rXInXo0G8hU' },

  // BRAÇOS (BÍCEPS E TRÍCEPS)
  { name: 'Rosca Direta Barra W', muscleGroup: 'Bíceps', videoUrl: 'https://www.youtube.com/watch?v=X-iV6uO9ZPM' },
  { name: 'Rosca Alternada com Halteres', muscleGroup: 'Bíceps', videoUrl: 'https://www.youtube.com/watch?v=mGbe9H-v1zY' },
  { name: 'Rosca Martelo Halteres', muscleGroup: 'Bíceps', videoUrl: 'https://www.youtube.com/watch?v=7_W_Y6O6e08' },
  { name: 'Rosca Scott Máquina', muscleGroup: 'Bíceps', videoUrl: 'https://www.youtube.com/watch?v=OAnX4lW0N7Y' },
  { name: 'Tríceps Pulley Barra Reta', muscleGroup: 'Tríceps', videoUrl: 'https://www.youtube.com/watch?v=6FzKu_Yf8rQ' },
  { name: 'Tríceps Corda', muscleGroup: 'Tríceps', videoUrl: 'https://www.youtube.com/watch?v=vB5v8n6Vl4w' },
  { name: 'Tríceps Testa com Barra W', muscleGroup: 'Tríceps', videoUrl: 'https://www.youtube.com/watch?v=3m_O_0_8oXQ' },
  { name: 'Tríceps Coice na Polia', muscleGroup: 'Tríceps', videoUrl: 'https://www.youtube.com/watch?v=q6e0q0u7z8Y' },
  { name: 'Mergulho em Paralelas', muscleGroup: 'Tríceps', videoUrl: 'https://www.youtube.com/watch?v=2z8JmcrW-As' },

  // GLÚTEOS E PANTURRILHA
  { name: 'Elevação Pélvica Barra', muscleGroup: 'Glúteos', videoUrl: 'https://www.youtube.com/watch?v=9L7N_4G8_p0' },
  { name: 'Glúteo Cabo (Coice)', muscleGroup: 'Glúteos', videoUrl: 'https://www.youtube.com/watch?v=8V_7_YI9eXw' },
  { name: 'Panturrilha em Pé Máquina', muscleGroup: 'Panturrilha', videoUrl: 'https://www.youtube.com/watch?v=N66O6_T0o2E' },
  { name: 'Panturrilha Sentado (Gêmeos)', muscleGroup: 'Panturrilha', videoUrl: 'https://www.youtube.com/watch?v=r0_v6v_v8YI' },

  // ABDÔMEN
  { name: 'Abdominal Supra (Solo)', muscleGroup: 'Abdômen', videoUrl: 'https://www.youtube.com/watch?v=Xyd_v_6_v8A' },
  { name: 'Abdominal Infra (Elevação Pernas)', muscleGroup: 'Abdômen', videoUrl: 'https://www.youtube.com/watch?v=7N_X_v8Y_pE' },
  { name: 'Prancha Isométrica', muscleGroup: 'Abdômen', videoUrl: 'https://www.youtube.com/watch?v=pYit9vY5v8A' },
  { name: 'Abdominal Oblíquo no Solo', muscleGroup: 'Abdômen', videoUrl: 'https://www.youtube.com/watch?v=yW_I_8L4M5k' },
];

  console.log('Seeding...');

  for (const exercise of exercises) {
    await prisma.exercise.create({
      data: exercise,
    });
  }

  console.log('Seed finished');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });