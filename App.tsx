import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, ScrollView  } from 'react-native';
import { calcularEjercicio, ResultadoEjercicio } from './src/utils/calcularEjercicios';

export default function App() {
  const [horas, setHoras] = useState<string[]>(Array(7).fill(''));
  const [meta, setMeta] = useState<string>('2');
  const [resultado, setResultado] = useState<ResultadoEjercicio | null>(null);

  const handleCambioHora = (index: number, valor: string) => {
    const nuevasHoras = [...horas];
    nuevasHoras[index] = valor;
    setHoras(nuevasHoras);
  };

  const handleCalcular = () => {
    const horasNumericas = horas.map(h => parseFloat(h) || 0);
    const metaNumerica = parseFloat(meta) || 0;
    const resultadoFinal = calcularEjercicio(horasNumericas, metaNumerica);
    setResultado(resultadoFinal);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ingresa las horas de ejercicio de cada día:</Text>
      {horas.map((hora, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Día ${index + 1}`}
          keyboardType="numeric"
          value={hora}
          onChangeText={(valor) => handleCambioHora(index, valor)}
        />
      ))}

      <Text style={styles.label}>Meta diaria (horas):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Meta"
        value={meta}
        onChangeText={setMeta}
      />

      <Button title="Calcular Ejercicio" onPress={handleCalcular} />

      {resultado && (
        <View style={styles.resultContainer}>
          <Text style={styles.text}>Días totales: {resultado.diasTotales}</Text>
          <Text style={styles.text}>Días entrenados: {resultado.diasEntrenados}</Text>
          <Text style={styles.text}>Promedio: {resultado.promedio} horas</Text>
          <Text style={styles.text}>¿Cumpliste la meta?: {resultado.exito}</Text>
          <Text style={styles.text}>Calificación: {resultado.calificacion}</Text>
          <Text style={styles.text}>{resultado.mensaje}</Text>
        </View>
      )}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});