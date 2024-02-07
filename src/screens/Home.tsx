import { Box, VStack, Image, Center, Text, HStack, Heading } from "native-base";
import MentalPng from '@assets/Mental.png';

import IconHomePng from '@assets/Group.png'

export function Home() {
    return (
        <VStack bg="#201B2C" flex={1} >

            <Center >
                <Box bg="#2F2841" h={460} w={340} mt={16} rounded={20} alignItems='center' >
                    <VStack alignItems="center">
                        <Heading color="#00FF89" mt={6} fontSize={20}>
                            Seu Histórico resumido ficará aqui
                        </Heading>
                        <Image
                            source={IconHomePng}
                            alt='LogoIocn'
                            mt={5}
                            mb={5}
                        />
                        <Box bg="#00FF89" w={290} h={160} rounded="10" p={2}>
                            <Heading fontSize={16}>
                                Comprometid@ a me livrar de:
                            </Heading>
                            <Text ml={4} mt={2}>
                                - Nicotina {'\n'}
                                - Chocolate {'\n'}
                                - Álcool {'\n'}
                                - Pornografia {'\n'}
                            </Text>
                        </Box>

                        <HStack mt={5}>
                            <Box bg="#00FF89" w={140} h={120} rounded="10" mr={4}>
                                <Center>
                                    <Text p={1}>
                                        Tempo desde a
                                        útima recaída:
                                    </Text>
                                    <Heading p={2} fontSize={14}>
                                        7d 10h 10m 38s
                                    </Heading>
                                </Center>
                            </Box>
                            <Box bg="#00FF89" w={140} h={120} rounded="10" >
                                <Center>
                                    <Text p={2} mt={2}>
                                        Total economizado:
                                    </Text>
                                    <Heading p={4} fontSize={14} >
                                        R$ 405,77
                                    </Heading>
                                </Center>
                            </Box>

                        </HStack>
                    </VStack>
                </Box>
            </Center>
            <Center>
                <Image
                    source={MentalPng}
                    alt="Imagem inicial"
                />
            </Center>

        </VStack>
    );
}