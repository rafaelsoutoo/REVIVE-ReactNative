import { Box, VStack, Image, Center, Text, HStack, Heading, ScrollView, useToast, FlatList, Button, View } from "native-base";
import MentalPng from '@assets/Mental.png';
import IconHomePng from '@assets/Group.png'
import { useAuth } from "@hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import { RegisterDTO } from "@dtos/RegisterDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SlideHomeMoney, SlideHomeTime } from "@components/SlideHome";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Loading } from "@components/Loading";


interface RegisterWithTimeDTO extends RegisterDTO {
    timeInSeconds: number;
    date: string;
}

export function Home() {
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [vices, setVice] = useState<RegisterWithTimeDTO[]>([]);

    const toast = useToast();

    async function fetchVicesSwiper() {
        try {
            setIsLoading(true);
            const userId = user.id;
            const response = await api.get(`/get/vice/${userId}`);
            const vices = response.data;

            const vicesWithTime = await Promise.all(
                vices.map(async (vice: RegisterDTO) => {
                    const timeResponse = await api.get(`/time/${vice.id}`);
                    return {
                        ...vice,
                        createAt: timeResponse.data.createAt,
                        timeInSeconds: timeResponse.data.timeInSeconds,
                    };
                })
            );

            setVice(vicesWithTime);
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
            setVice((prevRegister) =>
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

    return (
        <ScrollView bg="#201B2C" flex={1} py={10} showsVerticalScrollIndicator={false}>
            <Center p={6}>
                <Box bg="#2F2841" w="100%" rounded={20} alignItems='center' p={6} minH="300">
                    <VStack alignItems="center">
                        <Heading color="#00FF89" mt={2} fontSize={20}>
                            <Text color="#00FF89" fontSize={24}>
                                {user.name}
                            </Text>
                            , seu histórico resumido:
                        </Heading>
                        <Image
                            source={IconHomePng}
                            alt='LogoIcon'
                            mt={5}
                            mb={5}
                        />
                        {isLoading ? (
                            <View mt={10}>
                                <Loading/>
                            </View>
                            
                        ) : (
                            <>
                                {vices.length === 0 ? (
                                    <Box alignItems="center">
                                            <Text mt={5} fontWeight='bold' color="white">Ainda Não Possui nada Registrado!</Text>
                                        <Button rounded={14} mt={5} background="#2F2841" borderWidth={1} borderColor="#00FF89" _pressed={{ background: 'gray.800' }} onPress={() => navigation.navigate('register')}>
                                            <Text fontWeight='bold' color="#00FF89">Vamos lá?</Text>
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box bg="#00FF89" rounded="10" py={3} px={5} w="100%">
                                        <>
                                            <Heading fontSize={16}>
                                                Comprometid@ a me livrar de:
                                            </Heading>
                                            <Text ml={4} mt={2}>
                                                {vices.map((vice, index) => (
                                                    <Text key={index}>- {vice.name}{'\n'}</Text>
                                                ))}
                                            </Text>
                                        </>
                                    </Box>
                                )}
                            </>
                        )}
                        <HStack mt={5} >
                            <FlatList
                                data={vices}
                                horizontal
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <SlideHomeTime
                                        data={item}
                                        time={formatElapsedTime(item.timeInSeconds)}
                                    />
                                )}
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                            />
                            <FlatList
                                data={vices}
                                horizontal
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <SlideHomeMoney
                                        data={item}
                                        time={formatElapsedTime(item.timeInSeconds)}
                                    />
                                )}
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                            />
                        </HStack>
                    </VStack>
                </Box>
                <Image
                    source={MentalPng}
                    alt="Imagem inicial"
                    mb={5}
                />
            </Center>
        </ScrollView>
    );
}