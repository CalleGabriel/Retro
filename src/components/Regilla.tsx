import { StyleSheet, View } from 'react-native';
import { colors } from '../constants/theme';
import CalculatorButton from './CalculatorButton';

type Variant = 'number' | 'action' | 'func' | 'operator' | 'equals';

interface Key {
  label: string;
  variant: Variant;
  isDouble?: boolean;
}

const ROWS: Key[][] = [
  [
    { label: 'C', variant: 'action' },
    { label: '⌫', variant: 'action' },
    { label: '%', variant: 'func' },
    { label: '÷', variant: 'operator' },
  ],
  [
    { label: '√', variant: 'func' },
    { label: 'x²', variant: 'func' },
    { label: '1/x', variant: 'func' },
    { label: '×', variant: 'operator' },
  ],
  [
    { label: '7', variant: 'number' },
    { label: '8', variant: 'number' },
    { label: '9', variant: 'number' },
    { label: '-', variant: 'operator' },
  ],
  [
    { label: '4', variant: 'number' },
    { label: '5', variant: 'number' },
    { label: '6', variant: 'number' },
    { label: '+', variant: 'operator' },
  ],
  [
    { label: '1', variant: 'number' },
    { label: '2', variant: 'number' },
    { label: '3', variant: 'number' },
    { label: '+/-', variant: 'action' },
  ],
  [
    { label: '0', variant: 'number', isDouble: true },
    { label: '.', variant: 'number' },
    { label: '=', variant: 'equals' },
  ],
];

const VARIANT_STYLES: Record<Variant, { bg: string; text: string; shadow: string }> = {
  number: { bg: colors.number, text: colors.text, shadow: colors.shadow },
  action: { bg: colors.action, text: colors.text, shadow: colors.shadow },
  func: { bg: colors.func, text: colors.text, shadow: colors.shadow },
  operator: { bg: colors.operator, text: colors.text, shadow: colors.shadow },
  equals: { bg: colors.equals, text: colors.equalsText, shadow: colors.equalsShadow },
};

interface RegillaProps {
  onPress: (key: string) => void;
}

const Regilla = ({ onPress }: RegillaProps) => {
  return (
    <View style={styles.container}>
      {ROWS.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map((item) => {
            const style = VARIANT_STYLES[item.variant];
            return (
              <CalculatorButton
                key={item.label}
                label={item.label}
                isDouble={item.isDouble}
                backgroundColor={style.bg}
                textColor={style.text}
                shadowColor={style.shadow}
                onPress={() => onPress(item.label)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Regilla;