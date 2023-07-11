/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Colors from '../assets/colors/Colors';
import Feather from 'react-native-vector-icons/Feather';

import Profile from '../pages/profile/Profile';
import WatchStack from './WatchStack';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarInactiveTintColor: colors.tabGray,
        // tabBarActiveTintColor: colors.tabBlue,
      }}>
      <Tab.Screen
        name="WatchStack"
        component={WatchStack}
        options={({route}) => ({
          tabBarStyle: [
            {
              display: getTabBarVisibility(route),
            },
            styles.bottomTab,
          ],
          tabBarIcon: ({color, size}) => (
            <Feather name="youtube" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={({route}) => ({
          tabBarStyle: [
            {
              display: getTabBarVisibility(route),
            },
            styles.bottomTab,
          ],
          tabBarIcon: ({color, size}) => (
            <Feather name="user" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'WatchStack';

  if (routeName === 'Feed') {
    return 'none';
  }
  return 'flex';
};

const styles = StyleSheet.create({
  bottomTab: {
    height: 70,
    backgroundColor: Colors.white,
  },
});

export default TabNavigation;
