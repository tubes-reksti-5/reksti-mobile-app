import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, Redirect } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { Pressable } from 'react-native';
import { useSession } from '@/components/ctx';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const LogoutButton = () => {
  const { signOut } = useSession();
  const colorScheme = useColorScheme();

  const handleLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={handleLogout}>
      <FontAwesome
        name="sign-out"
        size={25}
        color={Colors[colorScheme ?? 'light'].text}
        style={{ marginRight: 15 }}
      />
    </Pressable>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { userEmail, isLoading } = useSession();

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!userEmail) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Room',
          tabBarIcon: ({ color }) => <TabBarIcon name="cube" color={color} />,
          headerRight: () => <LogoutButton />,
        }}
      />
      <Tabs.Screen
        name="reservation"
        options={{
          title: 'Reservation',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          headerRight: () => <LogoutButton />,
        }}
      />
    </Tabs>
  );
}