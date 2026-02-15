import { api } from "./api";

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  videoUrl: string;
  description?: string;
}

export interface WorkoutExercise {
  id: string;
  sets: number | null;
  reps: string | null;
  restTime: number | null;
  exercise: Exercise;
}

export interface Workout {
  id: string;
  name: string;
  createdAt: string;
  exercises?: WorkoutExercise[];
  _count?: {
    exercises: number;
  };
}

export const workoutService = {
  generate: async (message: string) => {
    const { data } = await api.post<Workout>("/workouts/generate", { message });
    return data;
  },
  getAll: async () => {
    const { data } = await api.get<Workout[]>("/workouts");
    return data;
  },
  getById: async (id: string) => {
    const { data } = await api.get<Workout>(`/workouts/${id}`);
    return data;
  },
};