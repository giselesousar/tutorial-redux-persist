import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { RootStackParamList } from './utils/types';
import LoginView from './views/Login';
import ProfileView from './views/Profile';

const Stack = createStackNavigator<RootStackParamList>();

const Routes = () => (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginView} />
        <Stack.Screen name="profile" component={ProfileView} />
      </Stack.Navigator>
    </NavigationContainer>
)
export default Routes;