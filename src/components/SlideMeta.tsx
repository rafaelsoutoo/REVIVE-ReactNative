import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Center, Box, VStack, Image, Heading } from "native-base";
import { HeadingMeta } from '@components/HeadingMeta';
import Group2x from '@assets/Group2x.png';
import { Button } from "@components/Button";
import { RegisterDTO } from '@dtos/RegisterDTO';

type Props = {
    data: RegisterDTO
    time: string,
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },    
});

export function Slide({ data, time }: Props) {
    return (
        <View style={styles.slide}>
            <Box w="100%" rounded={20} borderColor="#00FF89" borderWidth={1}>
                <VStack bg="#2F2841" rounded={20} p={4}>
                    <Center>
                        <HeadingMeta title={data.name}/>
                        <Image source={Group2x} alt="imagem principal" mt={12} mb={10} />
                        <Heading color="#00FF89" mb={3}>Tempo de abstinência</Heading>
                        <Heading color="white">{time}</Heading>
                        <Heading color="#00FF89" mb={3} mt={12}>Valor economizado</Heading>
                        <Heading color="white">R$ 1.321,85</Heading>
                        <Button title="Recaída" mt={16} mb={10} />
                    </Center>
                </VStack>
            </Box>
        </View>
    );
}
