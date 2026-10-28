import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/theme';
import CustomText from './CustomText';

interface CalculatorButtonProps {
  label: string;
  onPress: () => void;
  isDouble?: boolean;
  backgroundColor?: string;
  textColor?: string;
  shadowColor?: string;
}

const CalculatorButton = ({
  label,
  onPress,
  isDouble = false,
  backgroundColor = colors.number,
  textColor = colors.text,
  shadowColor = colors.shadow,
}: CalculatorButtonProps) => {
  return (
    <View style={[styles.cell, isDouble && styles.double]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor, borderColor: shadowColor }]}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
      >
        <CustomText variant="small" style={{ color: textColor, fontWeight: 'bold' }}>
          {label}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    padding: 5,
  },
  double: {
    flex: 2,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 5, // relieve retro
  },
});

export default CalculatorButton;