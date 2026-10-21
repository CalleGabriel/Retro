import { View, StyleSheet } from 'react-native';
import React from 'react';
import CustomText from './CustomText';

interface DisplayProps {
  mainValue: string;
  subValue?: string;
}

const Display = ({ mainValue, subValue }: DisplayProps) => {
  return (
    <View style={styles.container}>
      {subValue ? (
        <CustomText variant="small" style={styles.subResult}>
          {subValue}
        </CustomText>
      ) : null}
      
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
    backgroundColor: '#1E1428',
    borderRadius: 8,
    marginVertical: 10,
  },
  subResult: {
    color: '#C7B155',
    marginBottom: 5,
  },
  mainResult: {
    textAlign: 'right',
  },
});

export default Display;