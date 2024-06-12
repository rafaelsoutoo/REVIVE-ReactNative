import React from 'react';
import { Center,  useToast,  View, } from "native-base";
import {  useNavigation } from '@react-navigation/native';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function Meta() {
    const toast = useToast();
    const navigation = useNavigation<AppNavigatorRoutesProps>();



    return (
        <View flex={1} backgroundColor="#201B2C">
            <Center flex={1} px={4}>
    
            </Center>
        </View>
    );
}
