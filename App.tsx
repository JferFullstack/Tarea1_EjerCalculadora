import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, TextInput, View, ScrollView  } from 'react-native';
import { calculateExercise, ExerciseResult } from './src/utils/calculateExercise';

export default function App() {
  const [hours, setHours] = useState<string[]>(Array(7).fill(''));
  const [goal, setGoal] = useState<string>('1.5');
  const [result, setResult] = useState<ExerciseResult | null>(null);

  const handleHourChange = (index: number, value: string) => {
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
      <Text style={styles.title}>Introduzca las horas de ejercicio para cada día:</Text>
      {hours.map((hour, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Day ${index + 1}`}
          keyboardType="numeric"
          value={hour}
          onChangeText={(value) => handleHourChange(index, value)}
        />
      ))}

      <Text style={styles.label}>Objetivo diario (horas):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Goal"
        value={goal}
        onChangeText={setGoal}
      />

      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Calcular Ejercicio</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.text}>Total de días: {result.totalDays}</Text>
          <Text style={styles.text}>Días entrenados: {result.trainedDays}</Text>
          <Text style={styles.text}>Promedio: {result.average} hours</Text>
          <Text style={styles.text}>¿Cumpliste la meta? {result.success}</Text>
          <Text style={styles.text}>Valoración: {result.rating}</Text>
          <Text style={styles.text}>{result.message}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',  
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',  
    marginTop: 25,
  },
  input: {
    width: '25%',
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