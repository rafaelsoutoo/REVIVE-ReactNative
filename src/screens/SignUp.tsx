import { Box, Heading, HStack, Image, ScrollView, useToast, View, VStack, } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { TouchableOpacity } from 'react-native'

import BackgroundImg from '@assets/imagem.png';
import { useState } from "react";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe o Email.').email('Email Inválido.'),
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password'), ''], 'A confirmação da senha não confere')
});

export function SignUp() {
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();
    function handleGoBack() {
        navigation.goBack();
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirm: ''
        }
    });

    const toast = useToast();

    const { signIn } = useAuth();

    async function handleSignUp({ name, email, password }: FormDataProps) {
        try {
            setIsLoading(true);

            await api.post('/users', { name, email, password });
            await signIn(email, password);
        } catch (error: any) {
            setIsLoading(false);

            if (error.response && error.response.status === 409) {
                toast.show({
                    title: 'E-mail já existe.',
                    placement: 'top',
                    bg: 'red.500'
                });
            } else {
                const isAppError = error instanceof AppError;
                const title = isAppError ? error.message : 'Não foi possível criar a conta. Por Favor, tente mais tarde.';

                toast.show({
                    title,
                    placement: 'top',
                    bg: 'red.500'
                });
            }
        }
    }

    const handleReset = () => {
        reset({
            // name: '',
            // email: '',
            password: '',
            password_confirm: ''
        });
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack bg="#201B2C" flex={1}>
                <VStack alignItems="center" mt={50} px={8}>
                    <HStack alignItems="center" justifyContent="space-between" width="100%" mb={6} paddingLeft={2}>
                        <TouchableOpacity onPress={handleGoBack}>
                            <AntDesign name="left" size={35} color="#00FF89" />
                        </TouchableOpacity>

                        <Heading color="#00FF89" fontSize={30} flex={1} textAlign="center">REVIVE</Heading>
                        <View style={{ width: 50 }} />
                    </HStack>
                    <Box maxH={450} w={'full'} bg="#2F2841" rounded={32} alignItems="center" >
                        <Heading mt={5} color="#00FF89" mb={6}>Cadastrar</Heading>

                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Nome"
                                    p={2}
                                    fontSize={14}
                                    rounded={10}
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.name?.message}
                                    mx={5}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    p={2}
                                    fontSize={14}
                                    rounded={10}
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.email?.message}
                                    mx={5}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Senha"
                                    secureTextEntry
                                    p={2}
                                    fontSize={14}
                                    rounded={10}
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.password?.message}
                                    mx={5}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password_confirm"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder=" Confirme a Senha"
                                    secureTextEntry
                                    p={2}
                                    fontSize={14}
                                    rounded={10}
                                    onChangeText={onChange}
                                    value={value}
                                    onSubmitEditing={handleSubmit(handleSignUp)}
                                    returnKeyType='send'
                                    errorMessage={errors.password_confirm?.message}
                                    mx={5}
                                />
                            )}
                        />

                        <Button
                            title="Cadastrar"
                            mt={5}
                            mb={5}
                            isLoading={isLoading}
                            onPress={() => {
                                handleSubmit(handleSignUp)();
                                handleReset();
                            }}
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
