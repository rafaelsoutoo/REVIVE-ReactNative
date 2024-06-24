import { Center, Heading as Titulo, HStack, IImageProps, Image } from "native-base";


type Props = IImageProps & {
    title: string;
}

export function HeadingMeta({ title }: Props) {
    return (
        <Center justifyContent="center" alignItems="center">
            <HStack>
                <Titulo color="#00FF89" fontSize={26} mt={5} mx={5} numberOfLines={2}>
                    {title}
                </Titulo>
              
            </HStack>
        </Center>
    );
}