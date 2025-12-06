// App.js
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthProvider from './context/AuthProvider';
import AuthLoadingScreen from './Screens/Auth/AuthLoadingScreen';

import SplashScreen from './Screens/Auth/SplashScreen';
import LoginScreen from './Screens/Auth/LoginScreen';
import SignupScreen from './Screens/Auth/SignupScreen';
import ForgotPassword from './Screens/Auth/ForgotScreen';
import OTPScreen from './Screens/Auth/OtpScreen';

import MainScreen from './Screens/Main/MainScreen';
import SettingsScreen from './Screens/Settings/Settings';
import AboutScreen from './Screens/Settings/About/About';
import SecurityScreen from './Screens/Settings/Security/Security';
import DataControlScreen from './Screens/Settings/DataControl/DataControl';
import GeneralScreen from './Screens/Settings/General/General';
import UpgradeScreen from './Screens/Settings/Upgrade/Upgrade';
import PersonalizationScreen from './Screens/Settings/Personalization/Personalization';
import SuccessScreen from './Screens/Auth/Successfull';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AuthLoadingScreen"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          {/* SESSION LOADER */}
          <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />

          {/* OPTIONAL SPLASH */}
          <Stack.Screen name="SplashScreen" component={SplashScreen} />

          {/* AUTH SCREENS */}
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="ForgotScreen" component={ForgotPassword} />
          <Stack.Screen name="OtpScreen" component={OTPScreen} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />


          {/* MAIN APP */}
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />

          {/* SETTINGS SCREENS */}
          <Stack.Screen name="AboutScreen" component={AboutScreen} />
          <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
          <Stack.Screen name="DataControlScreen" component={DataControlScreen} />
          <Stack.Screen name="GeneralScreen" component={GeneralScreen} />
          <Stack.Screen name="UpgradeScreen" component={UpgradeScreen} />
          <Stack.Screen name="PersonalizationScreen" component={PersonalizationScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
