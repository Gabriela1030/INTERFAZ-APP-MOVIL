import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>
      <Image source={require('./IMG/logologo2.jpeg')} style={styles.logo} />
    </View>
  );
};

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loginForm}>
        <Image source={require('./IMG/logologo2.jpeg')} style={styles.logo} />
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su nombre de usuario"
            keyboardType="default"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su contraseña"
            secureTextEntry
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <View style={styles.registerLink}>
          <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
          <Text style={styles.registerLinkText}>Regístrate</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 90,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: '#00b894',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginForm: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  forgotPassword: {
    color: '#555',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00b894',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    color: '#555',
  },
  registerLinkText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
