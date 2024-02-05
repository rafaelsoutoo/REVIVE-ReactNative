import { Box, Heading, Image, ScrollView, Text, View, VStack, } from "native-base";


import BackgroundImg from '@assets/imagem.png';
import { Input } from "@components/Input";
import { TouchableOpacity } from "react-native";

import { Button } from "@components/Button";


export function SignIn() {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack bg="#201B2C" flex={1}>
                <VStack alignItems="center" mt={50} >
                    <Heading color="#00FF89" justifyContent="center" fontSize={30} mb={6}>REVIVE</Heading>
                    <Box h={450} w={320} bg="#2F2841" rounded={32} alignItems="center" >
                        <Heading mt={5} color="#00FF89" mb={12}>Login</Heading>
                        <Input
                            placeholder="Usuário"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Input
                            placeholder="Senha"
                            secureTextEntry
                        />


                        <VStack mr={100}>
                            <TouchableOpacity>
                                <Text color="white" mb={1} fontSize={16}>Criar Conta</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text color="white" fontSize={16}>Esqueci minha senha</Text>
                            </TouchableOpacity>
                        </VStack>

                        <Button
                        title="Entrar"
                        />

                    </Box>
                </VStack>

                <View flex={1} justifyContent="flex-end" alignItems="center">
                    <Image
                        source={BackgroundImg}
                        alt="Imagem inicial"
                    />
                </View>
            </VStack>
        </ScrollView>
    );
}