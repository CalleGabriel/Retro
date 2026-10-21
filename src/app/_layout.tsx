import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Evita que la pantalla de inicio se oculte automáticamente antes de cargar las fuentes[cite: 1]
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // 'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Stack 
        screenOptions={{ 
          headerShown: false, // Oculta la barra superior por defecto para que luzca como una calculadora limpia
          contentStyle: { backgroundColor: '#2D1E3E' } // Fondo morado retro para todas las pantallas de la pila
        }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D1E3E',
  },
});