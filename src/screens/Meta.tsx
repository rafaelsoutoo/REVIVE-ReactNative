import React, { useCallback, useState, useContext } from 'react';
import { Center, useToast, Text, View, Button } from "native-base";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { Slide } from '@components/MetaSwiper';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { AuthContext } from '@contexts/AuthContext'; 
import { api } from '@services/api'; 

export function Meta() {
    const { user } = useContext(AuthContext);
    const [register, setRegister] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    async function fetchVices() {
        try {
            setIsLoading(true);
            const userId = user?.id;
            const response = await api.get(`/get/vice/${userId}`);
            setRegister(response.data);
        } catch (error) {
            const title = 'Não foi possível carregar registros';

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchVices();
        }, [])
    );

    return (
        <View flex={1} backgroundColor="#201B2C">
            <Center flex={1} px={4}>
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    register.length === 0 ? (
                        <Center flex={1}>
                            <Text color="gray.100" textAlign="center">
                                Não há registros ainda. {'\n'}
                                Adicione registros na tela de cadastro.
                            </Text>
                            <Button rounded={14} mt={4} background="#00FF89" _pressed={{background:'green.600'}} onPress={() => navigation.navigate('register')}>
                                <Text fontWeight='bold'>
                                    Adicionar
                                </Text>
                            </Button>
                        </Center>
                    ) : (
                        <Swiper
                            paginationStyle={{ bottom: 740 }}
                            dotColor="gray"
                            activeDotColor="#00FF89"
                        >
                            {register.map((item, index) => (
                                <Slide key={index} data={item} />
                            ))}
                        </Swiper>
                    )
                )}
            </Center>
        </View>
    );
}
