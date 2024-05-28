import { HStack, Heading, Image, VStack, Icon, IImageProps } from "native-base";
import { TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons'



type Props = IImageProps & {
    name: string;
}

export function RegisterCard({ name, ...rest }: Props) {
    return (
        <TouchableOpacity >
            <HStack bg="#00FF89" alignItems="center" p={2} pr={4} rounded="15"  width="280" h={50} >
                <Image
                    alt="Imagem Logo"
                    mr={4}

                    {...rest}
                />

                <VStack flex={1}>
                    <Heading fontSize="lg" color="black" numberOfLines={1}>
                        {name}
                    </Heading>

                </VStack>

                <Icon
                    as={Entypo}
                    name="chevron-thin-right"
                    color="black"

                />
            </HStack>

        </TouchableOpacity>
    );
}