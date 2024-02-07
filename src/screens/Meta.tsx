import { Center, ScrollView, Box, VStack, Image } from "native-base";

import { HeadingMeta } from '@components/HeadingMeta';
import NicotinaGreenPng from '@assets/nicotinaGreen.png';



export function Meta() {
    return (
        <ScrollView backgroundColor="#201B2C" contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} py={12}>
            <Center>
                <Box bg="#201B2C" h="full" w={340} rounded={20} borderColor="#00FF89" borderWidth={1}>
                    <HeadingMeta
                        title="Nicotina"
                        source={NicotinaGreenPng}
                    />
                    <VStack bg="#2F2841" w="100%" h={650} rounded={20} mt={5}>
                        
                    </VStack>
                </Box>
            </Center>
        </ScrollView>
    );
}