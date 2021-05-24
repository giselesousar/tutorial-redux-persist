import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './screens/RootStackParamList';
import LoginView from './views/Login';
import ProfileView from './views/Profile';

const Stack = createStackNavigator<RootStackParamList>();

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Profile" component={ProfileView} />
    </Stack.Navigator>
  </NavigationContainer>
)
export default Routes;