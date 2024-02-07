import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { Home } from '@screens/Home';
import { Register } from '@screens/Register';
import { Meta } from '@screens/Meta';


type AppRoutes = {
    home: undefined;
    meta: undefined;
    register: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {

    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: "#2F2841",
                paddingBottom: 10,
                paddingTop: 10,
                borderTopColor: "#2F2841",
                height: 60,
                
            },
            

        }}>

            
            <Screen
                name='home'
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Entypo name="home" color={focused ? "#00FF89" : "black"} size={35} />
                    )
                }}
            />

            <Screen
                name='register'
                component={Register}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="book-open-outline"color={focused ? "#00FF89" : "black"} size={35} />
                    )
                }}
            />

            <Screen
                name='meta'
                component={Meta}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <AntDesign name="pushpin" color={focused ? "#00FF89" : "black"} size={35} />
                    )
                }}
            />

           
        </Navigator>
    );
}