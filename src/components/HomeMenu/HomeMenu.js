import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import Home from '../../screens/Home/Home';
import Profile from '../../screens/Profile/Profile';
import NewPost from '../../screens/NewPost/NewPost';
import Comments from '../../screens/Comments/Comments'; 
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Comments" 
        component={Comments} 
        options={{ title: 'Comentarios' }} 
      />
    </Stack.Navigator>
  );
}

function HomeMenu (){
  return(
    <Tab.Navigator screenOptions={{ headerShown:false }}>
      <Tab.Screen 
        name='HomeTab' 
        component={HomeStack} 
        options={{
          tabBarIcon:()=> <FontAwesome name="home" size={24} color="black"/>,
          title: 'Home'
        }}
      />

      <Tab.Screen 
        name='NewPost' 
        component={NewPost} 
        options={{tabBarIcon:()=> <FontAwesome name="plus" size={24} color="black"/>}}
      />

      <Tab.Screen 
        name='Profile' 
        component={Profile} 
        options={{tabBarIcon:()=> <FontAwesome name="user" size={24} color="black"/>}}
      />
   
    </Tab.Navigator>
  )
}

export default HomeMenu;