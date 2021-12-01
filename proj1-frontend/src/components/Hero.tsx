import { Heading } from "@chakra-ui/react";

const Hero = ({ title, account }: { title: string; account: any }) => (
  <>
    <Heading
      bgGradient="linear-gradient(84.73deg, #F4978E 3.53%, #F6A380 29.12%, #FCB85F 74.92%, #FDC952 95.08%)"
      bgClip="text"
      fontSize={{ base: "60px", md: "100px", lg: "120px" }}
      textAlign="center"
    >
      {title}
    </Heading>
    by {account}
  </>
);

Hero.defaultProps = {
  title: "with-chakra-ui-typescript",
  account: "xxx",
};

export default Hero;
