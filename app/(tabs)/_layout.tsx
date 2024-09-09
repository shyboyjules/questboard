import { Tabs } from 'expo-router';
import React from 'react';

import { Image, StyleSheet, Platform } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quest"
        options={{
          title: 'Quest',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/scroll.png') // Active state image
                  : require('@/assets/images/scroll.png') // Inactive state image (could be a different one if needed)
              }
              style={{
                width: 24, // Set your desired width
                height: 24, // Set your desired height
                tintColor: color, // Use the color provided to match the theme
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
