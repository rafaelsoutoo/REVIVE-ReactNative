import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Center, Box, Heading, Text } from "native-base";
import { RegisterDTO } from '@dtos/RegisterDTO';

type Props = {
    data: RegisterDTO
    time: string,
}

const styles = StyleSheet.create({
    slide: {
        marginHorizontal: 10,
        width: 130, // Defina a largura dos slides para se ajustarem à tela
    },
});

export function SlideHomeTime({ data, time }: Props) {
    return (
        <View style={styles.slide}>
            <Center>
                <Box bg="#00FF89" rounded="10" py={7} width='100%'>
                    <Text color="black" textAlign="center" fontWeight="bold">
                        {data.name}
                    </Text>
                    <Text textAlign="center">
                        Útima recaída:
                    </Text>
                    <Heading fontSize={14} textAlign="center">
                        {time}
                    </Heading>
                </Box>
            </Center>
        </View>
    );
}

export function SlideHomeMoney({ data, time }: Props) {
    return (
        <View style={styles.slide}>
            <Center>
                <Box bg="#00FF89" rounded="10" py={7} width='100%'>
                    <Text color="black" textAlign="center" fontWeight="bold">
                        {data.name}
                    </Text>
                    <Text textAlign="center">
                        Total economizado:
                    </Text>
                    <Heading fontSize={14} textAlign="center">
                        R$150,00
                    </Heading>
                </Box>
            </Center>
        </View>
    );
}