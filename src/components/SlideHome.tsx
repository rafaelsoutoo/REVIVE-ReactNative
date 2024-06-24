import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Center, Box, Heading, Text } from "native-base";
import { RegisterDTO } from '@dtos/RegisterDTO';

type timeProps = {
    data: RegisterDTO
    time: string,
}
type amountProps = {
    data: RegisterDTO
    amount: number[]
}

const styles = StyleSheet.create({
    slide: {
        marginHorizontal: 10,
        width: 130,
    },
});

export function SlideHomeTime({ data, time }: timeProps) {
    return (
        <View style={styles.slide}>
            <Center>
                <Box bg="#00FF89" rounded="10" py={7} width='100%'>
                    <Text color="black" textAlign="center" fontWeight="bold" numberOfLines={1}>
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

export function SlideHomeMoney({ data, amount }: amountProps) {
    if (!amount || amount.length === 0) {
        return null; 
    }
    const formattedAmount = amount.map((value) => value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }));

    return (
        <View style={styles.slide}>
            <Center>
                <Box bg="#00FF89" rounded="10" py={7} width='100%'>
                    <Text color="black" textAlign="center" fontWeight="bold" numberOfLines={1}>
                        {data.name}
                    </Text>
                    <Text textAlign="center">
                        Total economizado:
                    </Text>
                    <Heading fontSize={14} textAlign="center">
                        {formattedAmount.join(' / ')}
                    </Heading>
                </Box>
            </Center>
        </View>
    );
}