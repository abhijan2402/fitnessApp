import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import Hom from '../../assets/icons/Hom.svg'
import Cam from '../../assets/icons/Cam.svg'
import NavSearch from '../../assets/icons/NavSearch.svg'
import Pro from '../../assets/icons/Pro.svg'
import Tas from '../../assets/icons/Tas.svg'
//screens for tab
import Home from '../BottomScreen/Home';
import Task from '../BottomScreen/Task';
import Camera from '../BottomScreen/Camera';
import Profile from '../BottomScreen/Profile';
import Search from '../BottomScreen/Search';
import ProfileStack from './Stacks/ProfileStack';
import { SCREENS } from '../constants/Screens';
import DashboardStack from './Stacks/DashboardStack';
import ProgressStack from './Stacks/ProgressStask';
import MealStack from './Stacks/MealStack';
const windwoheight = Dimensions.get('window').height
const Tab = createBottomTabNavigator();
const BottomTab = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                borderColor: "white",

                tabBarStyle: {

                    backgroundColor: "white",
                    height: 80,
                    // paddingVertical: 10,
                    ...styles.shadow,
                },

            }}
        >
            <Tab.Screen name={SCREENS.DASHBOARDTAB} component={DashboardStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: 'center', marginTop: 10, marginBottom: 20, color: focused ? 'pink' : 'blue' }}>
                                <Hom height={24} width={24} xml={(focused ? '#7FCBD3' : 'grey')} />

                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen name={SCREENS.MEALTAB} component={MealStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
                                <Tas height={24} width={24} />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen name={SCREENS.PROGRESSTAB} component={ProgressStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: 'center', marginTop: 10, marginBottom: 20, }}>
                                <Cam height={24} width={24} />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen name={SCREENS.PROFILETAB} component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
                                <Pro height={24} width={24} />
                            </View>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    shadow: {
        shadowOffset: {
            width: 0,
            height: -10
        },
        shadowColor: "black",
        elevation: 40
    }
})
export default BottomTab;
