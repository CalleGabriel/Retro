import { StyleSheet, View } from 'react-native';
import { colors } from '../constants/theme';
import CustomText from './CustomText';

interface DisplayProps {
  mainValue: string;
  subValue?: string;
}

const Display = ({ mainValue, subValue }: DisplayProps) => {
  return (
    <View style={styles.container}>
      <CustomText variant="small" numberOfLines={1} style={styles.subResult}>
        {subValue || ' '}
      </CustomText>

      <CustomText
        variant="big"
        numberOfLines={1}
        adjustsFontSizeToFit
        style={styles.mainResult}
      >
        {mainValue}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: colors.displayBg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.displayBorder,
    marginBottom: 10,
  },
  subResult: {
    color: colors.subText,
    marginBottom: 5,
  },
  mainResult: {
    textAlign: 'right',
  },
});

export default Display;