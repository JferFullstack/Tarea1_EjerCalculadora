export interface ExerciseResult {
  totalDays: number;
  trainedDays: number;
  average: string;
  success: string;
  rating: number;
  message: string;
}

export function calculateExercise(hours: number[], goal: number): ExerciseResult {
  let trainedDays = 0;
  let totalHours = 0;

  for (let i = 0; i < hours.length; i++) {
    if (hours[i] > 0) trainedDays++;
    totalHours += hours[i];
  }

  const average = totalHours / hours.length;
  const success = average >= goal;

  let rating = 1;
  let message = 'You need to improve your exercise hours.';

  if (average >= goal) {
    rating = 3;
    message = 'Excellent! You have exceeded your goal.';
  } else if (average >= goal * 0.75) {
    rating = 2;
    message = 'Not bad, but it could be better.';
  }

  return {
    totalDays: hours.length,
    trainedDays: trainedDays,
    average: average.toFixed(2),
    success: success ? 'Yes' : 'No',
    rating,
    message,
  };
}
