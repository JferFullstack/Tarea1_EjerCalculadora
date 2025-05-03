export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercise(hours: number[], target: number): ExerciseResult {
  const periodLength = hours.length;
  const trainingDays = hours.filter(h => h > 0).length;
  const totalHours = hours.reduce((sum, h) => sum + h, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  // Evaluar porcentaje de cumplimiento
  const percentageOfGoal = average / target;

  let rating: number;
  let ratingDescription: string;

  if (percentageOfGoal >= 1) {
    rating = 3;
    ratingDescription = 'Excelente! Sobrepasaste tu meta.';
  } else if (percentageOfGoal >= 0.75) {
    rating = 2;
    ratingDescription = 'No está mal, pero podrías mejorar.';
  } else {
    rating = 1;
    ratingDescription = 'Necesitas mejorar tus horas de ejercicio';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}
