import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import coin from "../assets/img/coin_3d.png";
import diamond from "../assets/img/diamond_3d.png";
import pig from "../assets/img/piggy_bank_3d.png";

const imageMap: StaticImageData[] = [coin, pig, diamond];

const Wave = ({ message, address }: { message: string; address: string }) => (
  <HStack
    justifyContent="space-between"
    alignItems="top"
    bgGradient="linear(to-l, #7928CA, #FF0080)"
    bgClip="text"
    width={"100%"}
    border="1px solid #E2E8F0"
    borderRadius="5px"
    p={1}
  >
    {/* <Heading fontSize={[50, 75, 85]}>{message}</Heading>
    <Text>from {address.substring(0, 10)}...</Text> */}
    <Text textAlign="left" >{message}</Text>
    <Text>{address.substring(0, 10)}...</Text>
  </HStack>
);

Wave.defaultProps = {
  title: "with-chakra-ui-typescript",
  address: "no one",
};

export default Wave;
