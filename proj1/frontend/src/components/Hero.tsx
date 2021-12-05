import { Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

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
    <Heading fontSize={[50, 75, 85]}>{title}</Heading>
    <Text>from {address.substring(0, 10)}...</Text>
  </VStack>
);

Hero.defaultProps = {
  title: "with-chakra-ui-typescript",
  address: "no one",
};
