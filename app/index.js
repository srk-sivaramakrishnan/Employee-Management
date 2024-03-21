import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from './dashboard';

const Stack = createStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default Index;