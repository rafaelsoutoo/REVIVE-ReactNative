import { Box, VStack, Image, Center, Text, HStack, Heading, ScrollView, useToast } from "native-base";
import MentalPng from '@assets/Mental.png';

import IconHomePng from '@assets/Group.png'
import { useAuth } from "@hooks/useAuth";
import { useCallback, useState } from "react";
import { RegisterDTO } from "@dtos/RegisterDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useFocusEffect } from "@react-navigation/native";
import { Loading } from "@components/Loading";

export function Home() {

    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(true);
    const [vices, setVice] = useState<RegisterDTO[]>([]);

    const toast = useToast();


    async function fetchVice() {
        try {
            setIsLoading(true);
            const response = await api.get(`/get/vice/${user.id}`);

            setVice(response.data);

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os registros';

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
            fetchVice()
        }, [])
    )
    return (
        <ScrollView bg="#201B2C" flex={1} py={10} showsVerticalScrollIndicator={false}>
            <Center p={6} >
                <Box bg="#2F2841" h="auto" w="100%" rounded={20} alignItems='center' p={6}>
                    <VStack alignItems="center">
                        <Heading color="#00FF89" mt={2} fontSize={20}>
                            <Text color="#00FF89" fontSize={24}>
                                {user.name}
                            </Text>
                            , seu histórico resumido:
                        </Heading>
                        <Image
                            source={IconHomePng}
                            alt='LogoIocn'
                            mt={5}
                            mb={5}
                        />
                        {isLoading ? (
                            <Box bg="#00FF89" rounded="10" py={12} px={100} w="100%">
                                <Text color="black">Loading...</Text>

                            </Box>
                        ) : (
                            <Box bg="#00FF89" rounded="10" py={3} px={5} w="100%">
                                <Heading fontSize={16}>
                                    Comprometid@ a me livrar de:
                                </Heading>
                                <Text ml={4} mt={2}>
                                    {vices.length === 0 ? (
                                        "Nenhum vice registrado"
                                    ) : (
                                        vices.map((vice, index) => (
                                            <Text  key={index}>- {vice.name}{'\n'}</Text>
                                        ))
                                    )}
                                </Text>
                            </Box>
                        )}
                        <HStack mt={5} space={3} >
                            <Box bg="#00FF89" rounded="10" py={7} width='50%' >
                                <Text textAlign="center">
                                    Útima recaída:
                                </Text>
                                <Heading fontSize={14} textAlign="center">
                                    7d 10h 10m 38s
                                </Heading>
                            </Box>
                            <Box bg="#00FF89" rounded="10" py={7} width='50%' >
                                <Text textAlign="center">
                                    Total economizado:
                                </Text>
                                <Heading fontSize={14} textAlign="center">
                                    R$ 405,77
                                </Heading>
                            </Box>
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