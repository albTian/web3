import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import coin from "../assets/img/coin_3d.png";
import diamond from "../assets/img/diamond_3d.png";
import pig from "../assets/img/piggy_bank_3d.png";

const imageMap: StaticImageData[] = [coin, pig, diamond];

export const Hero = ({
  title,
  address,
}: {
  title: string;
  address: string;
}) => (
  <VStack
    justifyContent="center"
    alignItems="center"
    bgGradient="linear(to-l, #7928CA, #FF0080)"
    bgClip="text"
  >
    <HStack>
      {imageMap.map((img) => (
        <Image src={img} key={img.toString()} alt={img.toString()}/>
      ))}
    </HStack>
    <Heading fontSize={[50, 75, 85]}>{title}</Heading>
    <Text>from {address.substring(0, 10)}...</Text>
  </VStack>
);

Hero.defaultProps = {
  title: "with-chakra-ui-typescript",
  address: "no one",
};
