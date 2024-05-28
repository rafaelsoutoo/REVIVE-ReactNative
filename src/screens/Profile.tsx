import { Center, ScrollView, VStack, Heading, useToast, Skeleton, Text, HStack } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useState } from "react";
import { TouchableOpacity } from 'react-native'
import { Button } from "@components/Button";
import { UserPhoto } from '@components/UserPhoto';
import { Input } from "@components/Input";

import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "@hooks/useAuth";

const PHOTO_SIZE = 32;

export function Profile() {

    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const [userPhoto, setUserPhoto] = useState('https://via.placeholder.com/150')

    const toast = useToast();

    async function handleUserPhotoSelect() {
        setPhotoIsLoading(true);
        try {


            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
            });

            if (photoSelected.canceled) {
                return;
            }

            if (photoSelected.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(
                    photoSelected.assets[0].uri,
                    { size: true },
                );

                if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 3) {
                    return toast.show({
                        title: 'A imagem deve ter no máximo 3MB',
                        placement: 'top',
                        duration: 3000,
                        bgColor: 'red.500',
                    });
                }


                setUserPhoto(photoSelected.assets[0].uri);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setPhotoIsLoading(false)
        }
    }

    const { user } = useAuth();



    return (
        <ScrollView backgroundColor="#201B2C" contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} py={10}>
            <Center p={5} mb={20}>
                <VStack bg="#2F2841" rounded={20} h="full" w="100%" p={5}>
                    <Center mt={3}>
                        <HStack justifyContent="space-between">
                            <Heading color='#00FF89' mb={6} ml={8} fontSize={28} textAlign="center" flex={1}>
                                Perfil
                            </Heading>
                            <TouchableOpacity >
                                <Ionicons name="exit-outline" size={34} color="#ffffff79" />
                            </TouchableOpacity>
                        </HStack>
                        {
                            photoIsLoading ?
                                <Skeleton
                                    w={PHOTO_SIZE}
                                    h={PHOTO_SIZE}
                                    rounded="full"
                                    startColor="gray.500"
                                    endColor="gray.400"
                                />
                                :
                                <UserPhoto
                                    source={{ uri: userPhoto }}
                                    alt="Foto do usuário"
                                    size={PHOTO_SIZE}
                                />
                        }

                        <TouchableOpacity onPress={handleUserPhotoSelect}>
                            <Text color="gray.400" fontWeight="bold" fontSize="md" mt={3} mb={6}>
                                Alterar Foto
                            </Text>
                        </TouchableOpacity>


                        <Input
                            h={10}
                            w="100%"
                            rounded={10}
                            placeholder="Nome"
                            fontSize={15}
                            p={2}




                        />
                        <Input
                            h={10}
                            w="100%"
                            rounded={10}
                            placeholder="E-mail"
                            isDisabled
                            fontSize={15}
                            p={2}
                            />

                        <Heading color="gray.400" fontSize="md" mb={5} alignSelf="flex-start" mt={10} >
                            Alterar senha
                        </Heading>

                        <Input
                            h={10}
                            w="100%"
                            rounded={10}
                            placeholder="Senha antiga"
                            secureTextEntry
                            fontSize={15}
                            p={2}

                        />
                        <Input
                            h={10}
                            w="100%"
                            rounded={10}
                            placeholder="Nova Senha"
                            secureTextEntry
                            fontSize={15}
                            p={2} />
                        <Input
                            h={10}
                            w="100%"
                            rounded={10}
                            placeholder="Confirme a nova senha"
                            secureTextEntry
                            fontSize={15}
                            p={2}

                        />

                        <Button
                            title="Atualizar"
                            mt={4}
                            mb={2}
                        />
                    </Center>
                </VStack>

            </Center>
        </ScrollView>
    );
}