import { View, StyleSheet } from 'react-native';
import React from 'react';
import Display from '../components/Display';
import CalculatorButton from '../components/CalculatorButton';

export default function CalculatorScreen() {
  return (
    <View style={styles.container}>
      {/* Zona del Display */}
      <Display mainValue="33" subValue="120 + 30" />

      {/* Filas de botones */}
      <View style={styles.row}>
        <CalculatorButton label="C" backgroundColor="#634984" onPress={() => {}} />
        <CalculatorButton label="+/-" backgroundColor="#634984" onPress={() => {}} />
        <CalculatorButton label="%" backgroundColor="#634984" onPress={() => {}} />
        <CalculatorButton label="÷" backgroundColor="#7B5CA8" onPress={() => {}} />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="7" onPress={() => {}} />
        <CalculatorButton label="8" onPress={() => {}} />
        <CalculatorButton label="9" onPress={() => {}} />
        <CalculatorButton label="×" backgroundColor="#7B5CA8" onPress={() => {}} />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="4" onPress={() => {}} />
        <CalculatorButton label="5" onPress={() => {}} />
        <CalculatorButton label="6" onPress={() => {}} />
        <CalculatorButton label="-" backgroundColor="#7B5CA8" onPress={() => {}} />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="1" onPress={() => {}} />
        <CalculatorButton label="2" onPress={() => {}} />
        <CalculatorButton label="3" onPress={() => {}} />
        <CalculatorButton label="+" backgroundColor="#7B5CA8" onPress={() => {}} />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="⌫" backgroundColor="#634984" onPress={() => {}} />
        <CalculatorButton label="0" isDouble={true} onPress={() => {}} />
        <CalculatorButton label="=" backgroundColor="#7B5CA8" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D1E3E', // Fondo general morado de la app
    justifyContent: 'flex-end',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});