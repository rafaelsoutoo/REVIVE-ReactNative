import { Box, VStack, Image, Center, Text, HStack, Heading, ScrollView } from "native-base";
import MentalPng from '@assets/Mental.png';

import IconHomePng from '@assets/Group.png'

export function Home() {
    return (
        <ScrollView bg="#201B2C" flex={1} py={10} showsVerticalScrollIndicator={false}>
            <Center p={6} >
                <Box bg="#2F2841" h="auto" w="100%" rounded={20} alignItems='center' p={6}>
                    <VStack alignItems="center">
                        <Heading color="#00FF89" mt={2} fontSize={20}>
                            Seu Histórico resumido ficará aqui
                        </Heading>
                        <Image
                            source={IconHomePng}
                            alt='LogoIocn'
                            mt={5}
                            mb={5}
                        />
                        <Box bg="#00FF89" rounded="10" py={3} px={5} w="100%">
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