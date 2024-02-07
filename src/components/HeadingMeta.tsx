import { Center, Heading as Titulo, HStack, IImageProps, Image } from "native-base";


type Props = IImageProps & {
    title: string;
}

export function HeadingMeta({ title, ...rest }: Props) {
    return (
        <Center justifyContent="center" alignItems="center">
            <HStack>
                <Titulo color="#00FF89" mt={5}>
                    {title}
                </Titulo>
                <Image
                    alt="Imagem Logo"
                    ml={2}
                    mt={6}
                    {...rest}
                />
            </HStack>
        </Center>
    );
}