import { Center, ScrollView, Box, VStack, Image, Heading, Text } from "native-base";

import { HeadingMeta } from '@components/HeadingMeta';
import NicotinaGreenPng from '@assets/nicotinaGreen.png';

import Group2x from '@assets/Group2x.png'

import { Button } from "@components/Button";

export function Meta() {
    return (
        <ScrollView backgroundColor="#201B2C" contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} py={10}>
            <Center p={7} mb={10}>
                <Box bg="#201B2C" w="100%" minH={500}rounded={20} borderColor="#00FF89" borderWidth={1}>
                    <HeadingMeta
                        title="Nicotina"
                        source={NicotinaGreenPng}
                    />
                    <VStack bg="#2F2841" w="100%"  rounded={20} mt={5}>
                        <Center>
                            <Image
                                source={Group2x}
                                alt="imagem principal"
                                mt={12}
                                mb={10}
                            />

                            <Heading color="#00FF89" mb={3}>Tempo de abstinência</Heading>
                            <Heading color="white">256d 12h 22m 1s</Heading>

                            <Heading color="#00FF89" mb={3} mt={12}>Valor economizado</Heading>
                            <Heading color="white">R$ 1.321,85</Heading>

                            <Button
                              title="Recaída"
                              mt={16}
                              mb={10}
                            />
                        </Center>
                    </VStack>
                </Box>
            </Center>
        </ScrollView>
    );
}