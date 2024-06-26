import { HStack, Heading, VStack, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons'
import { RegisterDTO } from "@dtos/RegisterDTO";

type Props = {
    data: RegisterDTO
}

export function RegisterCard({ data }: Props) {
    return (
        <TouchableOpacity >
            <HStack bg="#00FF89" alignItems="center" p={2} pr={4} rounded="15" width="280" h={50} >
                <VStack flex={1}>
                    <Heading fontSize="lg" color="black" numberOfLines={1} ml={2}>
                        {data.name}
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
