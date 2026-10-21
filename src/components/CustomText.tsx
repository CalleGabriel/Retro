import { Text, TextProps, StyleSheet } from 'react-native';
import React from 'react';

interface CustomTextProps extends TextProps {
  variant?: 'big' | 'small';
}

const CustomText = ({ variant = 'big', style, children, ...rest }: CustomTextProps) => {
  return (
    <Text 
      style={[
        styles.base, 
        variant === 'big' ? styles.big : styles.small, 
        style
      ]} 
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: '#FFE169',
  },
  big: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  small: {
    fontSize: 24,
  },
});

export default CustomText;