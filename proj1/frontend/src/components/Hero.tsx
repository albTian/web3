import {
  Heading,
  HStack,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  VStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import diamond from "../assets/img/diamond.png";
import unicorn from "../assets/img/unicorn.png";
import me from "../assets/img/me.png";
import theme from "../theme";

const title = "web3 playground";
const description =
  "A hello world type project for smart contracts, etherium and metamask integration. Send me a wave on the Rinkeby testnet for a chance at some ETH!";

const imageMap: HoverEmojiProps[] = [
  {
    emoji: diamond,
    title: "coming soon...",
    description: "the next project, yet to be built...",
    href: "/nft",
    external: false,
  },
  {
    emoji: me,
    title: "About me",
    description:
      "I'm Albert, a junior at UC Berkeley diving into web3. With my spare time I love to tinker on projects (like this one) and lift weights. Thanks for stopping by!",
    href: "https://atian.super.site/",
    external: true,
  },
  {
    emoji: unicorn,
    title: "Buildspace",
    description:
      "Huge shoutout to Buildspace and Farza for this project (and color scheme)! Check them out for some sick crypto development tutorials",
    href: "https://buildspace.so/",
    external: true,
  },
];

interface HoverEmojiProps {
  emoji: StaticImageData;
  title: string;
  description: string;
  href: string;
  external: boolean;
}

const HoverEmoji = ({
  emoji,
  title,
  description,
  href,
  external,
}: HoverEmojiProps) => {
  const sizing = ["75px", "100px", "120px"];
  const bgColor = useColorModeValue(theme.colors.purple, theme.colors.pink);
  const textColor = useColorModeValue("white", theme.colors.black);

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Link
          href={href}
          target={external ? "_blank" : ""}
          w={sizing}
          h={sizing}
        >
          <Image src={emoji} alt={title} />
        </Link>
      </PopoverTrigger>
      <PopoverContent border="0px" bg="transparent">
        <Link
          href={href}
          rounded={"md"}
          target={external ? "_blank" : ""}
          bg={bgColor}
          transition=".2s"
          _hover={{ bg: "#441DA9", transition: ".2s" }}
        >
          <Stack color={textColor} p={4} fontSize={"sm"} textAlign={"center"}>
            <Text fontWeight={800}>{title}</Text>
            <Text>{description}</Text>
          </Stack>
        </Link>
      </PopoverContent>
    </Popover>
  );
};

const Hero = () => (
  <VStack
    justifyContent="center"
    alignItems="center"
    bgGradient={theme.colors.gradient}
    bgClip="text"
  >
    <HStack justifyContent="space-between" w={"100%"}>
      {imageMap.map((hoverProps) => (
        <HoverEmoji
          emoji={hoverProps.emoji}
          title={hoverProps.title}
          description={hoverProps.description}
          href={hoverProps.href}
          key={hoverProps.title}
          external={hoverProps.external}
        />
      ))}
    </HStack>
    <Heading fontSize={[30, 45, 60]}>{title}</Heading>
    <Text>{description}</Text>
  </VStack>
);

export default Hero;
