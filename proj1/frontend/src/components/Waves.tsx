import {
  HStack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";

// TODO: Create a wave interface
const Wave = ({
  message,
  address,
  timestamp,
  isLarge,
}: {
  message: string;
  address: string;
  timestamp: Date;
  isLarge: boolean;
}) => (
  <HStack
    justifyContent="space-between"
    alignItems="top"
    bgGradient="linear(to-l, #7928CA, #FF0080)"
    bgClip="text"
    width={"100%"}
    borderRadius="5px"
  >
    <Text textAlign={isLarge ? "left" : "center"} w={isLarge ? "50%" : "100%"}>
      {message}
    </Text>
    {isLarge && (
      <>
        <Text textAlign="left">{timestamp.toDateString()}</Text>
        <Text isTruncated w={"15%"}>
          {address}
        </Text>
      </>
    )}
  </HStack>
);

const Waves = ({ waves }: { waves: any[] }) => {
  const color = useColorModeValue("#7928CA", "#FF0080");
  const isLarge = useBreakpointValue({ base: false, sm: true });

  return (
    <VStack fontSize={"sm"} textAlign={"left"}>
      <HStack
        justifyContent="space-between"
        w={"100%"}
        borderBottom={`1px solid ${color}`}
        color={color}
      >
        <Text
          w={isLarge ? "40%" : "100%"}
          textAlign={isLarge ? "left" : "center"}
        >
          {`message${isLarge ? "" : "s"}`}
        </Text>
        {isLarge && (
          <>
            <Text>timestamp</Text>
            <Text>address</Text>
          </>
        )}
      </HStack>
      {waves.map((wave: any) => (
        <Wave
          message={wave.message}
          address={wave.address}
          key={wave.timestamp}
          timestamp={new Date(wave.timestamp)}
          isLarge={isLarge || false}
        />
      ))}
    </VStack>
  );
};

export default Waves;
