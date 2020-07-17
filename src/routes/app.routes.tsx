import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../pages/Profile'
import Dashboard from '../pages/Dashboard'
import CreateMaterial from '../pages/CreateMaterial'
import MaterialDetail from '../pages/MaterialDetail'

const App = createStackNavigator()

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="CreateMaterial" component={CreateMaterial} />
    <App.Screen name="MaterialDetail" component={MaterialDetail} />
  </App.Navigator>
)

export default AppRoutes
