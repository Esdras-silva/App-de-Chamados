import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'

import { Home } from '../screens/Home';
import { Details } from '../screens/Details';
import { Register } from '../screens/Register';

import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import { isLoading } from 'expo-font';

const { Navigator, Screen } = createNativeStackNavigator();

export function Routestwo() {
  const RootStack = createNativeStackNavigator();
return (
  <RootStack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
  <RootStack.Screen name='home' component={SignIn}/>
  <RootStack.Screen name='signup' component={SignUp}/>
   </RootStack.Navigator>
  

);
}

export function AppRoutes() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [log, setLog] = useState(false);

  useEffect(()=>{
    const subscriber = auth()
    .onAuthStateChanged(response =>{
      setUser(response);
      setLog(true);
      setLoading(false);
    });

    return subscriber;
    
  },[]);



  
  
  return (
    <Navigator initialRouteName={'home'} screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="new" component={Register} />
      <Screen name="details" component={Details} />
      
    </Navigator>
  )
}