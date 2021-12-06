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
} from "@chakra-ui/react";
import Image from "next/image";
// import Link from "next/link";
import React from "react";
import diamond from "../assets/img/diamond.png";
import unicorn from "../assets/img/unicorn.png";
import me from "../assets/img/me.png";

const imageMap: HoverEmojiProps[] = [
  {
    emoji: diamond,
    title: "something",
    description:
      "ehhhhhh law of thirds lol",
    href: "/about",
  },
  {
    emoji: me,
    title: "About me",
    description: "I'm Albert, a CS student at UC Berkeley",
    href: "https://atian.super.site/",
  },
  {
    emoji: unicorn,
    title: "Buildspace",
    description:
      "Huge shoutout to Buildspace and Farza for this project! Check them out for some sick crypto development tutorials",
    href: "https://buildspace.so/",
  },
];

interface HoverEmojiProps {
  emoji: StaticImageData;
  title: string;
  description: string;
  href: string;
}

const HoverEmoji = (props: HoverEmojiProps) => {
  const sizing = ["75px", "100px", "120px"];
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Link href={props.href} target={"_blank"} w={sizing} h={sizing}>
          <Image src={props.emoji} />
        </Link>
      </PopoverTrigger>
      <PopoverContent border="0px" bg="transparent">
        <Link
          href={props.href}
          rounded={"md"}
          target={"_blank"}
          bg="#7928CA"
          transition=".2s"
          _hover={{ bg: "#441DA9", transition: ".2s" }}
        >
          <Stack color="white" p={4} fontSize={"sm"} textAlign={"center"}>
            <Text fontWeight={800}>{props.title}</Text>
            <Text>{props.description}</Text>
          </Stack>
        </Link>
      </PopoverContent>
    </Popover>
  );
};

const Hero = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <VStack
    justifyContent="center"
    alignItems="center"
    bgGradient="linear(to-l, #7928CA, #FF0080)"
    bgClip="text"
  >
    <HStack justifyContent="space-between" w={"100%"}>
      {imageMap.map((hoverProps) => (
        // <Image src={img} key={img.src} alt={img.src} />
        // <HoverEmoji emoji={img}/>
        <HoverEmoji
          emoji={hoverProps.emoji}
          title={hoverProps.title}
          description={hoverProps.description}
          href={hoverProps.href}
          key={hoverProps.title}
        />
      ))}
    </HStack>
    <Heading fontSize={[30, 45, 60]}>{title}</Heading>
    <Text>{description}</Text>
  </VStack>
);

Hero.defaultProps = {
  title: "with-chakra-ui-typescript",
  description: "no one",
};

export default Hero;
