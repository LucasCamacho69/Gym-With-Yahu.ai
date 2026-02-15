import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando limpeza do banco...');
  await prisma.workoutExercise.deleteMany();
  await prisma.exercise.deleteMany();

  console.log('Criando exercícios do Leandro Twin...');

  const exercises = [
    // --- PEITORAL (Mapeado para "Peito") ---
    { name: 'Supino Reto Barra', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/EZMYCLKuGow' },
    { name: 'Supino Reto Halteres', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/EZMYCLKuGow' },
    { name: 'Supino Reto Smith', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/EZMYCLKuGow' },
    { name: 'Supino Inclinado Barra', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/WP1VLAt8hbM' },
    { name: 'Supino Inclinado Halteres', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/WP1VLAt8hbM' },
    { name: 'Supino Inclinado Smith', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/WP1VLAt8hbM' },
    { name: 'Supino Declinado Barra', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/J2g6qPBJfqo' },
    { name: 'Supino Declinado Halteres', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/J2g6qPBJfqo' },
    { name: 'Crucifixo Reto Halteres', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/uDMmccuPVPQ' },
    { name: 'Crucifixo Reto Cross', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/uDMmccuPVPO' },
    { name: 'Crucifixo Inclinado Halteres', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/uy9Xk3SVrms' },
    { name: 'Crucifixo Inclinado Cross', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/uy9Xk3SVrms' },
    { name: 'Crucifixo Declinado Halteres', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/zdkX5Gcdq8' },
    { name: 'Crucifixo Declinado Cross', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/zdkX5Gcdq8' },
    { name: 'Cross-Over Polia Alta', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/jqTlJt3IXzO' },
    { name: 'Cross-Over Polia Média', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/jqTlJt3JXzO' },
    { name: 'Flexão De Braço', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/dHgoYiCraCw' },
    { name: 'Peck Deck (Voador)', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/FzCnfD0gOXo' },
    { name: 'Pull-Over', muscleGroup: 'Peito', videoUrl: 'https://youtu.be/-KaMXMMIVrU' },

    // --- DORSAIS (Mapeado para "Costas") ---
    { name: 'Barra Fixa Pegada Pronada', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/thg6cGXSIvY' },
    { name: 'Barra Fixa Pegada Supinada', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/thg6cGXSIVY' },
    { name: 'Barra Fixa Com Triângulo', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/thg6cGXSlvY' },
    { name: 'Levantamento Terra', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/50AkPBZWACO' },
    { name: 'Puxada Vertical Pegada Pronada', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/pIMrHhluK8' },
    { name: 'Puxada Vertical Pegada Supinada', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/pJMrHhluK8' },
    { name: 'Puxada Vertical Com Triângulo', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/pIMrHhluK8' },
    { name: 'Remada Curvada Barra Pronada', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/TfxlMertfsw' },
    { name: 'Remada Curvada Barra Supinada', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/TfxlMertfsw' },
    { name: 'Remada Curvada Cavalinho', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/TfxlMertfsw' },
    { name: 'Remada Curvada Halteres Pronada', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/Vk6c7CjtM14' },
    { name: 'Remada Curvada Halteres Supinada', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/Vk6c7CitM14' },
    { name: 'Remada Curvada Halteres Neutra', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/Vk6c7CjtM14' },
    { name: 'Remada Máquina Pronada', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/OvvlEdEHzHc' },
    { name: 'Remada Máquina Supinada', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/OvvIEdEHzHc' },
    { name: 'Remada Máquina Neutra', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/QyvlEdEHzHc' },
    { name: 'Remada Cross Pronada', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/HpWWrevaBNO' },
    { name: 'Remada Cross Supinada', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/HpWWrevaBNO' },
    { name: 'Remada Cross Neutra', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/HpWWreyaBNO' },
    { name: 'Remada Unilateral Halter (Serrote)', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/m4h4jT9patY' },
    { name: 'Pull-Down Barra', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/v6-QIOY0nW0' },
    { name: 'Pull-Down Corda', muscleGroup: 'Costas', videoUrl: 'https://youtu.be/v6-QIOY0nW0' },

    // --- DELTÓIDES (Mapeado para "Ombros") ---
    { name: 'Elevação Lateral Halteres', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/IwWvZ0rINXs' },
    { name: 'Elevação Lateral Sentado', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/IwWvZ0rINXs' },
    { name: 'Elevação Lateral Unilateral Banco', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/IwWvZ0r1NXs' },
    { name: 'Elevação Lateral Cross', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/sKPIdvVvHul' },
    { name: 'Elevação Frontal Barra', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/ZQhDiONDZA' },
    { name: 'Elevação Frontal Anilha', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/ZQhDiONpZA' },
    { name: 'Elevação Frontal Halteres', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/NxSuojHZa8k' },
    { name: 'Elevação Frontal Cruzada', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/NxSuojHZa8k' },
    { name: 'Elevação Frontal Cross', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/S7B5LwWrLAO' },
    { name: 'Crucifixo Inverso Halteres', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/5HDkxzxe400' },
    { name: 'Crucifixo Inverso Cross', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/5HDkxzxe400' },
    { name: 'Desenvolvimento Militar', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/EuOAfhXBEvs' },
    { name: 'Desenvolvimento Halteres', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/EuQAfhXBEvs' },
    { name: 'Desenvolvimento Máquina', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/EuQAfhXBEvs' },
    { name: 'Manguito Rotador Externo', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/AevNFIX7IV4' },
    { name: 'Manguito Rotador Interno', muscleGroup: 'Ombros', videoUrl: 'https://youtu.be/vN9BwyZGA' },

    // --- TRAPÉZIO ---
    { name: 'Encolhimento Barra', muscleGroup: 'Trapézio', videoUrl: 'https://youtu.be/RhGjwlUe16E' },
    { name: 'Encolhimento Halteres', muscleGroup: 'Trapézio', videoUrl: 'https://youtu.be/RhGjwlUe16E' },
    { name: 'Encolhimento Smith', muscleGroup: 'Trapézio', videoUrl: 'https://youtu.be/RhGjwlUe16E' },
    { name: 'Remada Alta Barra', muscleGroup: 'Trapézio', videoUrl: 'https://youtu.be/tm0lywBhIYM' },
    { name: 'Remada Alta Cross', muscleGroup: 'Trapézio', videoUrl: 'https://youtu.be/tm0lywBhIYM' },

    // --- TRÍCEPS ---
    { name: 'Mergulho (Paralelas)', muscleGroup: 'Tríceps', videoUrl: 'https://youtu.be/TCVj8cliLNo' },
    { name: 'Supino Fechado', muscleGroup: 'Tríceps', videoUrl: 'https://youtu.be/ZiemT4r4DcU' },
    { name: 'Rosca Testa Barra', muscleGroup: 'Tríceps', videoUrl: 'https://youtu.be/zznCYBVZOVA' },
    { name: 'Rosca Testa Halteres', muscleGroup: 'Tríceps', videoUrl: 'https://youtu.be/SbAykzCE-xk' },
    { name: 'Tríceps Pulley Barra', muscleGroup: 'Tríceps', videoUrl: 'https://youtu.be/dTqDKC0D6P4' },
    { name: 'Tríceps Pulley Corda', muscleGroup: 'Tríceps', videoUrl: 'https://youtu.be/dTqDKC0D6P4' },
    { name: 'Tríceps Pulley Unilateral', muscleGroup: 'Tríceps', videoUrl: 'https://youtu.be/nTTTjbAOTSU' },
    { name: 'Rosca Francesa', muscleGroup: 'Tríceps', videoUrl: 'https://youtu.be/YJ4kGE3eemY' },
    { name: 'Tríceps Coice Halter', muscleGroup: 'Tríceps', videoUrl: 'https://youtu.be/PyKv23F-FVM' },
    { name: 'Tríceps Coice Cross', muscleGroup: 'Tríceps', videoUrl: 'https://youtu.be/PyKv23F-fVM' },

    // --- BÍCEPS ---
    { name: 'Rosca Direta Barra', muscleGroup: 'Bíceps', videoUrl: 'https://youtu.be/Q8TqfD8E7BU' },
    { name: 'Rosca Direta Halteres', muscleGroup: 'Bíceps', videoUrl: 'https://youtu.be/Q8TqfD8E7BU' },
    { name: 'Rosca Direta Cross', muscleGroup: 'Bíceps', videoUrl: 'https://youtu.be/Q8TqfD8E7BU' },
    { name: 'Rosca Martelo Halteres', muscleGroup: 'Bíceps', videoUrl: 'https://youtu.be/0qkQy8V2FC0' },
    { name: 'Rosca Martelo Corda', muscleGroup: 'Bíceps', videoUrl: 'https://youtu.be/0qkOv8V2FC0' },
    { name: 'Rosca Alternada Halteres', muscleGroup: 'Bíceps', videoUrl: 'https://youtu.be/S1HAcTVOVYE' },
    { name: 'Rosca Scott Máquina', muscleGroup: 'Bíceps', videoUrl: 'https://youtu.be/zpTK6eihdSA' },
    { name: 'Rosca Scott Barra', muscleGroup: 'Bíceps', videoUrl: 'https://youtu.be/zpTK6eihdSA' },
    { name: 'Rosca Concentrada', muscleGroup: 'Bíceps', videoUrl: 'https://youtu.be/EEpvOQAAtRo' },

    // --- ANTEBRAÇO ---
    { name: 'Flexão de Punho', muscleGroup: 'Antebraço', videoUrl: 'https://youtu.be/3PDPiCoWF-Y' },
    { name: 'Extensão de Punho', muscleGroup: 'Antebraço', videoUrl: 'https://youtu.be/Kx8rg0MJXc' },
    { name: 'Rosca Inversa Barra', muscleGroup: 'Antebraço', videoUrl: 'https://youtu.be/jbSr9CzIPmA' },
    { name: 'Rosca Inversa Cross', muscleGroup: 'Antebraço', videoUrl: 'https://youtu.be/jbSr9CzJPmA' },

    // --- COXAS (Mapeado para "Pernas") ---
    { name: 'Agachamento Livre', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/zgk71dUUtOY' },
    { name: 'Agachamento Smith', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/zgk71dUUtOY' },
    { name: 'Agachamento Hack', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/zgk71dUUtOY' },
    { name: 'Agachamento Frontal', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/syfDrU220FU' },
    { name: 'Agachamento Sumo', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/06Cmxez6D0k' },
    { name: 'Agachamento Búlgaro', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/IGf9fR4Y7Iw' },
    { name: 'Passada (Avanço)', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/sQ5RjbpPirY' },
    { name: 'Afundo', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/Umzor-g-to' },
    { name: 'Leg Press 45', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/nY8UsiAqwds' },
    { name: 'Stiff', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/u1E3u2gJYE' },
    { name: 'Cadeira Extensora', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/el3oHbB5DM' },
    { name: 'Mesa Flexora', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/2-ULaRrQa7c' },
    { name: 'Cadeira Flexora', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/Zss6E3VU6X0' },
    { name: 'Cadeira Adutora', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/Wf602gn9zU' },
    { name: 'Cadeira Abdutora', muscleGroup: 'Pernas', videoUrl: 'https://youtu.be/e2gmqTG10gQ' },

    // --- GLÚTEOS ---
    { name: 'Glúteos Máquina', muscleGroup: 'Glúteos', videoUrl: 'https://youtu.be/JhodV0011vw' },
    { name: 'Glúteos 4 Apoios', muscleGroup: 'Glúteos', videoUrl: 'https://youtu.be/e4RuZ1NVYqA' },
    { name: 'Elevação Pélvica', muscleGroup: 'Glúteos', videoUrl: 'https://youtu.be/ptK0azwOXwM' },
    { name: 'Glúteo Coice Cross', muscleGroup: 'Glúteos', videoUrl: 'https://youtu.be/JdHbXlggr6Q' },

    // --- PANTURRILHAS ---
    { name: 'Gêmeos Em Pé Máquina', muscleGroup: 'Panturrilha', videoUrl: 'https://youtu.be/824pMjvGXgc' },
    { name: 'Gêmeos Sentado Máquina', muscleGroup: 'Panturrilha', videoUrl: 'https://youtu.be/jMWsp-W9gY' },
    { name: 'Gêmeos Leg Press', muscleGroup: 'Panturrilha', videoUrl: 'https://youtu.be/wCXvfH-BLg' },

    // --- ABDÔMEN ---
    { name: 'Abdominal Supra', muscleGroup: 'Abdômen', videoUrl: 'https://youtu.be/7YxVRiATugo' },
    { name: 'Abdominal Infra', muscleGroup: 'Abdômen', videoUrl: 'https://youtu.be/ixJcUH8AIL8' },
    { name: 'Abdominal Oblíquo', muscleGroup: 'Abdômen', videoUrl: 'https://youtu.be/Smr8ipkN5A0' },
    { name: 'Prancha Abdominal', muscleGroup: 'Abdômen', videoUrl: 'https://youtu.be/qNRqGqESAWU' },
    { name: 'Vácuo Abdominal', muscleGroup: 'Abdômen', videoUrl: 'https://youtu.be/qvdiga5sQvQ' },
  ];

  for (const exercise of exercises) {
    await prisma.exercise.create({
      data: {
        ...exercise,
        description: 'Execução técnica por Leandro Twin. CREF: 128544-G/SP',
      },
    });
  }

  console.log(`Seed finalizado! ${exercises.length} exercícios criados.`);
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