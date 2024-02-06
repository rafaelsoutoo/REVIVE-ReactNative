import { Box, VStack, Image, Center } from "native-base";




import MentalPng from '@assets/Mental.png';


export function Home() {
    return (
        <VStack bg="#201B2C" flex={1} >

            
            <Box bg="#2F2841" h={500} w={200} p={10}>

            </Box>
            <Center>
                <Image
                    source={MentalPng}
                    alt="Imagem inicial"
                />
            </Center>
        </VStack>
    );
}