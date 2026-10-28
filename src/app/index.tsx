import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Display from '../components/Display';
import Regilla from '../components/Regilla';
import { colors } from '../constants/theme';
import { useCalculator } from '../hooks/useCalculator';

export default function CalculatorScreen() {
  const { display, expression, handlePress } = useCalculator();

  return (
    <SafeAreaView style={styles.container}>
      <Display mainValue={display} subValue={expression} />
      <Regilla onPress={handlePress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 12,
  },
});