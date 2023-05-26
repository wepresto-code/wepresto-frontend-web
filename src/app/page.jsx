"use client";
// import styles from './page.module.css'

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Flex,
  Stack,
  Image,
  Heading,
  Text,
  useBreakpointValue,
  Button,
  Link,
  background,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import ValidateUser from "@wepresto/components/ValidateUser";

const slogans = [
  "Uniendo tecnología y financiamiento colaborativo para construir un futuro más próspero juntos.",
  "Transformando el poder de la comunidad en préstamos justos y accesibles",
  "Convierte tus sueños en realidad con nuestra tecnología de préstamos colectivos",
  "Juntos impulsamos tus sueños: Financia y crea con nuestra tecnología de crowdlending.",
];

const images = [
  {
    image:
      "https://images.pexels.com/photos/3658482/pexels-photo-3658482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    info: "Foto por Frank Meriño",
    url: "https://www.pexels.com/photo/person-holding-a-yellow-corn-3658482/",
  },
  {
    image:
      "https://images.unsplash.com/photo-1601578605817-63f825110984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1517&q=80",
    info: "Foto por Luis Vidal",
    url: "https://unsplash.com/photos/FKE-fCOPKCw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    image:
      "https://images.pexels.com/photos/3963167/pexels-photo-3963167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    info: "Foto por Frank Meriño",
    url: "https://www.pexels.com/photo/man-in-white-button-up-shirt-holding-green-bananas-3963167/",
  },
  {
    image:
      "https://images.pexels.com/photos/3963370/pexels-photo-3963370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    info: "Foto por Frank Meriño",
    url: "https://www.pexels.com/photo/man-in-polo-shirt-holding-yellow-fruit-3963370/",
  },
];

export default function Home() {
  const router = useRouter();

  const [slogan, setSlogan] = React.useState(slogans[0]);
  background;
  const [backgroundImage, setBackgroundImage] = React.useState(images[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const slogansIndex = Math.floor(Math.random() * slogans.length);
      setSlogan(slogans[slogansIndex]);

      const imagesIndex = Math.floor(Math.random() * images.length);
      setBackgroundImage(images[imagesIndex]);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleBorrowerButtonClick = () => {
    router.push("/sign-in?type=borrower");
  };

  const handleLenderButtonClick = () => {
    router.push("/sign-in?type=lender");
  };

  return (
    <>
      <ValidateUser type={undefined} />
      <Stack
        minH={"100vh"}
        direction={{ base: "column", md: "row" }}
        width="100%"
      >
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Image
            alt="bienvenido a wepresto"
            src={"/logo.png"}
            width={150}
            height={30}
            position="absolute"
            top={5}
            left={5}
          />
          <Stack mt={{ base: "60px", md: "0" }} spacing={6} w={"full"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                color="primary.900"
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "15%", md: "25%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "primary.600",
                  zIndex: -1,
                }}
              >
                Te prestamos facilito
              </Text>
              <Text
                fontSize={{ base: "md", lg: "lg" }}
                color={"gray.500"}
                marginTop={"1rem"}
              >
                {slogan}
              </Text>
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={4}
                marginTop={"1rem"}
              >
                <Button
                  id="borrower-button"
                  onClick={handleBorrowerButtonClick}
                  rounded={"full"}
                  bg={"primary.600"}
                  color={"white"}
                  _hover={{
                    bg: "primary.700",
                    textDecoration: "none",
                  }}
                  _focusVisible={{
                    bg: "primary.700",
                    textDecoration: "none",
                  }}
                >
                  Necesito dinero
                </Button>
                <Button
                  id="lender-button"
                  onClick={handleLenderButtonClick}
                  rounded={"full"}
                  color={"primary.500"}
                  _hover={{
                    bg: "gray.200",
                    textDecoration: "none",
                  }}
                  _focusVisible={{
                    bg: "gray.200",
                    textDecoration: "none",
                  }}
                >
                  Quiero invertir
                </Button>
              </Stack>
            </Heading>
          </Stack>
        </Flex>
        <Flex
          alignItems={"flex-end"}
          bgSize="cover"
          bgPosition="center"
          flex={1}
          bgImage={backgroundImage.image}
        >
          <Text
            display={"flex"}
            justifyContent={{ lg: "flex-end", sm: "flex-start" }}
            m={4}
            width={{ base: "50dvw", md: "50dvw" }}
          >
            <Link
              fontSize={12}
              _hover={{
                opacity: ".8",
              }}
              _focusVisible={{
                opacity: ".8",
              }}
              bgColor={"gray.900"}
              opacity="0.5"
              color="white"
              py={2}
              px={3}
              borderRadius="8"
              display={"flex"}
              alignItems="center"
              isExternal
              href={backgroundImage.url}
            >
              {backgroundImage.info}&nbsp;&nbsp;
              <FaExternalLinkAlt />
            </Link>
          </Text>
        </Flex>
      </Stack>
    </>
  );
}
