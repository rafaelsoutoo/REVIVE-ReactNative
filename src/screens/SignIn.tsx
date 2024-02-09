import { Box, Heading, Image, ScrollView, Text, View, VStack, } from "native-base";
import { useNavigation } from "@react-navigation/native";


import { AuthNavigatorRoutesProps } from '@routes/auth.routes';


import BackgroundImg from '@assets/imagem.png';
import { Input } from "@components/Input";

import { Button } from "@components/Button";


export function SignIn() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleNewAccount() {
        navigation.navigate('signUp');
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack bg="#201B2C" flex={1}>
                <VStack alignItems="center" mt={50} px={8} mb={15}>
                    <Heading color="#00FF89" justifyContent="center" fontSize={30} mb={6}>REVIVE</Heading>
                    <Box maxH={450} w="full" bg="#2F2841" rounded={32} alignItems="center" >
                        <Heading mt={5} color="#00FF89" mb={12}>Login</Heading>
                        <Input
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"

                        />
                        <Input
                            placeholder="Senha"
                            secureTextEntry
                        />



                        <Button
                            title="Criar Conta"
                            bg="transparent"
                            borderColor="#00FF89"
                            borderWidth={1}
                            color="white"
                            variant="outline"
                            w={160}
                            h={50}
                            mt={5}
                            onPress={handleNewAccount}

                        />
                        <Button
                            title="Entrar"
                            variant="solid"
                            mt={5}
                            mb={5}
                        />

                    </Box>
                    <Image
                        source={BackgroundImg}
                        alt="Imagem inicial"
                    />
                </VStack>


            </VStack>
        </ScrollView>
    );
}
