import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { calculateExercise, ExerciseResult } from './src/utils/calculateExercise';

export default function App() {
  const [daysInput, setDaysInput] = useState<string>('7');
  const [daysCount, setDaysCount] = useState<number | null>(null);
  const [hours, setHours] = useState<string[]>([]);
  const [goal, setGoal] = useState<string>('1.5');
  const [result, setResult] = useState<ExerciseResult | null>(null);

  // Al confirmar la cantidad de días, inicializamos el array de horas
  const handleConfirmDays = () => {
    const n = parseInt(daysInput, 10);
    if (isNaN(n) || n < 1 || n > 7) {
      return alert('Por favor ingresa un número entre 1 y 7.');
    }
    setDaysCount(n);
    setHours(Array(n).fill(''));
    setResult(null);
  };

  const handleHourChange = (index: number, value: string) => {
    if (daysCount === null) return;
    const newHours = [...hours];
    newHours[index] = value;
    setHours(newHours);
  };

  const handleCalculate = () => {
    const numericHours = hours.map(h => parseFloat(h) || 0);
    const numericGoal = parseFloat(goal) || 0;
    const finalResult = calculateExercise(numericHours, numericGoal);
    setResult(finalResult);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Paso 1: Preguntar cuántos días */}
      {daysCount === null ? (
        <View style={styles.stepContainer}>
          <Text style={styles.title}>¿Cuántos días entrenarás? (1–7)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 5"
            keyboardType="numeric"
            value={daysInput}
            onChangeText={setDaysInput}
          />
          <TouchableOpacity style={styles.button} onPress={handleConfirmDays}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Paso 2: Ingresar horas y objetivo */}
          <Text style={styles.title}>Horas de ejercicio para cada uno de los {daysCount} días:</Text>
          {hours.map((hour, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Día ${index + 1}`}
              keyboardType="numeric"
              value={hour}
              onChangeText={value => handleHourChange(index, value)}
            />
          ))}

          <Text style={styles.label}>Objetivo diario (horas):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ej. 2"
            value={goal}
            onChangeText={setGoal}
          />

          <TouchableOpacity style={styles.button} onPress={handleCalculate}>
            <Text style={styles.buttonText}>Calcular Ejercicio</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Paso 3: Mostrar resultado */}
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.text}>Total de días: {result.periodLength}</Text>
          <Text style={styles.text}>Días entrenados: {result.trainingDays}</Text>
          <Text style={styles.text}>Meta diaria: {result.target} horas</Text>
          <Text style={styles.text}>¿Cumpliste la meta? {result.success ? 'Sí' : 'No'}</Text>
          <Text style={styles.text}>Promedio: {result.average} horas</Text>
          <Text style={styles.text}>Valoración: {result.rating}</Text>
          <Text style={styles.text}>{result.ratingDescription}</Text>
        </View>
      )}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#292726',
    padding: 25,
    paddingTop: 60,
    alignItems: 'center',
  },
  stepContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
    marginTop: 25,
  },
  input: {
    width: '60%',
    borderWidth: 2,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  resultContainer: {
    marginTop: 40,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
});
