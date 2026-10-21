import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from './CustomText'

interface CalculatorButtonProps {
  label: string;
  onPress: () => void;
  isDouble?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

const CalculatorButton = ({ 
  label, 
  onPress, 
  isDouble = false, 
  backgroundColor = '#4A3563', 
  textColor = '#FFE169' 
}: CalculatorButtonProps) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        isDouble ? styles.double : null, 
        { backgroundColor }
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <CustomText style={{ color: textColor, fontWeight: 'bold' }}>
        {label}
      </CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 70,
    width: 70,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderBottomWidth: 4,
    borderColor: '#241731', // Sombra retro en la parte inferior del botón
  },
  double: {
    width: 150,
    alignItems: 'center',
  },
})

export default CalculatorButton