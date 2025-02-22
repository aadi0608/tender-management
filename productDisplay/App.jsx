// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import AdminPanelScreen from './src/screens/AdminPanelScreen';
import UserViewScreen from './src/screens/UserViewScreen';
import TenderDetailScreen from './src/screens/TenderDetailScreen';
import BidsManagementScreen from './src/screens/BidsManagementScreen';
import { TenderProvider } from './src/context/TenderContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <TenderProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#3498db' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Tender Login' }} />
          <Stack.Screen name="AdminPanel" component={AdminPanelScreen} options={{ title: 'Admin Panel' }} />
          <Stack.Screen name="UserView" component={UserViewScreen} options={{ title: 'Available Tenders' }} />
          <Stack.Screen name="TenderDetail" component={TenderDetailScreen} options={{ title: 'Tender Detail' }} />
          <Stack.Screen name="BidsManagement" component={BidsManagementScreen} options={{ title: 'Bids Management' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </TenderProvider>
  );
};

export default App;
