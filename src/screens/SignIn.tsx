import { Box, Heading, Image, ScrollView, VStack, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import BackgroundImg from '@assets/imagem.png';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';

import { useAuth } from "@hooks/useAuth";

type FormData = {
    email: string;
    password: string;
}

export function SignIn() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const toast = useToast();

    const { signIn } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    function handleNewAccount() {
        navigation.navigate('signUp');
    }

    async function handleSignIn({ email, password }: FormData) {
        try {
            setIsLoading(true);
            await signIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.';
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });
            setIsLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack bg="#201B2C" flex={1}>
                <VStack alignItems="center" mt={50} px={8} mb={15}>
                    <Heading color="#00FF89" justifyContent="center" fontSize={30} mb={6}>REVIVE</Heading>
                    <Box maxH={450} w="full" bg="#2F2841" rounded={32} alignItems="center">
                        <Heading mt={5} color="#00FF89" mb={12}>Login</Heading>
                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: 'Informe o e-mail',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address'
                                }
                            }}
                            render={({ field: { onChange } }) => (
                                <Input
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    mx={5}
                                    onChangeText={onChange}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            rules={{
                                required: 'Informe a senha',
                                minLength: {
                                    value: 6,
                                    message: 'A senha deve ter pelo menos 6 caracteres',
                                },
                            }}
                            render={({ field: { onChange } }) => (
                                <Input
                                    placeholder="Senha"
                                    secureTextEntry
                                    mx={5}
                                    onChangeText={onChange}
                                    errorMessage={errors.password?.message}
                                />
                            )}
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
                            onPress={handleSubmit(handleSignIn)}
                            isLoading={isLoading}
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
