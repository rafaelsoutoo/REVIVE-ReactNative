import { Box, Heading, HStack, Image, ScrollView, View, VStack, } from "native-base";
import { AntDesign } from '@expo/vector-icons';

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";


import { TouchableOpacity } from 'react-native'


import BackgroundImg from '@assets/imagem.png';


export function SignUp() {

    const navigation = useNavigation();

    function handleGoBack() {
      navigation.goBack();
    }
  

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack bg="#201B2C" flex={1}>
                <VStack alignItems="center" mt={50} >
                    <HStack alignItems="center" justifyContent="space-between" width="100%" mb={6} paddingLeft={4}>
                        <TouchableOpacity onPress={handleGoBack}>
                            <AntDesign name="left" size={35} color="#00FF89" />
                        </TouchableOpacity>

                        <Heading color="#00FF89" fontSize={30} flex={1} textAlign="center">REVIVE</Heading>
                        <View style={{ width: 50 }} />
                    </HStack>
                    <Box h={450} w={320} bg="#2F2841" rounded={32} alignItems="center" >
                        <Heading mt={5} color="#00FF89" mb={6}>Cadastrar</Heading>

                        <Input
                            placeholder="Nome"
                            p={2}
                            fontSize={14}
                        />
                        <Input
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            p={2}
                            fontSize={14}
                        />
                        <Input
                            placeholder="Senha"
                            secureTextEntry
                            p={2}
                            fontSize={14}
                        />
                        <Input
                            placeholder=" Confirme a Senha"
                            secureTextEntry
                            p={2}
                            fontSize={14}
                        />
                        <Button
                            title="Cadastrar"
                            mt={5}
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