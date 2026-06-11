import { StyleSheet} from 'react-native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react'; 
import { auth } from './src/firebase/config';
import HomeMenu from './src/components/HomeMenu/HomeMenu';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userLogged, setUserLogged] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLogged(true); 
      } else {
        setUserLogged(false); 
      }
    });
  }, []);

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        {userLogged === false ? (
          <>
            <Stack.Screen name='Login' component={Login} options={{ headerShown:false }}/>
            <Stack.Screen name='Register' component={Register} options={{ headerShown:false }}/>
          </>
        ) : (
             <Stack.Screen name='HomeMenu' component={HomeMenu} options={{ headerShown:false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});