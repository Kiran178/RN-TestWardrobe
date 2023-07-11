import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Watch from '../pages/watch/Watch';
const Stack = createNativeStackNavigator();

function WatchStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="WatchScreen" component={Watch} />
    </Stack.Navigator>
  );
}

export default WatchStack;
