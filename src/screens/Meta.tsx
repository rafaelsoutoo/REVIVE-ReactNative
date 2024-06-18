import React, { useCallback, useState, useContext, useEffect } from 'react';
import { Center, useToast, Text, View, Button, FlatList } from "native-base";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { SlideMeta } from '@components/SlideMeta';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { AuthContext } from '@contexts/AuthContext'; 
import { api } from '@services/api'; 
import { AppError } from '@utils/AppError';
import { RegisterDTO } from '@dtos/RegisterDTO';
import { Loading } from '@components/Loading';

export function Meta() {
    const { user } = useContext(AuthContext);
    const [register, setRegister] = useState<RegisterDTO[]>([]); 
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    const renderItem = ({ item }: { item: RegisterDTO }) => (
        <SlideMeta 
            data={item}
            time={formatElapsedTime(item.timeInSeconds)}
            onResetTime={() => handleResetTime(item.id)} 
        />
    );

    async function fetchVicesSwiper() {
        try {
            setIsLoading(true);
            const userId = user.id;
            const response = await api.get(`/get/vice/${userId}`);
            const vices = response.data;

            const vicesWithTime = await Promise.all(
                vices.map(async (vice: RegisterDTO) => {
                    const timeResponse = await api.patch(`/time/vice/${vice.id}`, {reset: false});
                    return {
                        ...vice,
                        date: timeResponse.data.date,
                        timeInSeconds: timeResponse.data.timeInSeconds,
                    };
                })
            );

            setRegister(vicesWithTime);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.log('não possuí registros');
            } else {
                const isAppError = error instanceof AppError;
                const title = isAppError ? error.message : 'Não foi possível carregar os seus registros';
                toast.show({
                    title,
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchVicesSwiper();
        }, [])
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRegister((prevRegister) =>
                prevRegister.map((vice) => {
                    const now = new Date().getTime();
                    const date = new Date(vice.date).getTime();
                    const time = (now - date) / 1000;
                    return {
                        ...vice,
                        timeInSeconds: time,
                    };
                })
            );
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatElapsedTime = (seconds: number) => {
        const days = Math.floor(seconds / (24 * 3600));
        const hours = Math.floor((seconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${days}d ${hours}h ${minutes}m ${secs}s`;
    };

    async function handleResetTime(viceId: string) {
        try {
            const response = await api.patch(`/time/vice/${viceId}`, { reset: true });
            const { date, timeInSeconds } = response.data;

            setRegister((prevRegister) =>
                prevRegister.map((vice) =>
                    vice.id === viceId ? { ...vice, date, timeInSeconds } : vice
                )
            );

            toast.show({
                title: `Que pena, dessa vez você consegue! 😢`,
                placement: 'top',
                bgColor: 'gray.400'
            });
        } catch (error: any) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível resetar o tempo';
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });
        }
    }

    return (
        <View flex={1} backgroundColor="#201B2C">
            <Center flex={1} px={4}>
                {isLoading ? (
                    <Loading/>
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
                        <FlatList
                        data={register}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                    />
                    )
                )}
            </Center>
        </View>
    );
}
