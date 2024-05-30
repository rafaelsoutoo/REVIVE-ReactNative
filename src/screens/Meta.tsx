import React, { useCallback, useState } from 'react';
import { Center, ScrollView, useToast, Text, View, Button } from "native-base";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { Slide } from '@components/MetaSwiper';
import { useRegister } from '@components/RegisterContext';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function Meta() {
    const { register } = useRegister();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigation = useNavigation<AppNavigatorRoutesProps>();


    async function fetchHistory() {
        try {
            setIsLoading(true);
        } catch (error) {
            const title = 'Não foi possível carregar os detalhes do exercício';

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
            fetchHistory();
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
                            paginationStyle={{ bottom: 740 }} // Ajuste conforme necessário
                            dotColor="gray"
                            activeDotColor="#00FF89"
                        >
                            {register.map((item, index) => (
                                <Slide key={index} data={{ name: item }} />
                            ))}
                        </Swiper>
                    )
                )}
            </Center>
        </View>
    );
}
