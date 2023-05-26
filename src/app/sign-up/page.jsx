"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import { Flex, Heading, Image, Text, Stack, Button } from "@chakra-ui/react";

import ValidateUser from "@wepresto/components/ValidateUser";
import isUserTypeValid from "@wepresto/utils/is-user-type-valid";

import StepsForm from "./_components/steps-form";

export default function SignUp() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const type = searchParams.get("type");

  useEffect(() => {
    if (!isUserTypeValid) return redirect("/");
  }, []);

  return (
    <>
      <ValidateUser type={undefined} />
      <Flex minH={["none", "none", "100vh"]} width="100vw" maxWidth="100%">
        <Flex
          display={["none", "none", "flex"]}
          bgColor="primary.500"
          justifyContent={"space-between"}
          flexDir="column"
          height={"auto"}
          color="white"
          width="50%"
          py={8}
          px={12}
        >
          <Image
            alt="bienvenido a wepresto"
            src={"/logo_white.png"}
            width={48}
            _hover={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          />
          <Flex flexDirection={"column"}>
            <Heading>Primero lo primero...</Heading>
          </Flex>
          <Text fontSize={14}>
            © {new Date().getFullYear()} WePresto. Todos los derechos
            reservados.
          </Text>
        </Flex>
        <Flex
          minH={["none", "none", "100vh"]}
          align={"center"}
          justify={"center"}
          bg={"gray.50"}
          alignSelf="center"
          flex="auto"
          flexDir="column"
        >
          <Image
            display={["flex", "flex", "none"]}
            alt="bienvenido a wepresto"
            src={"/logo.png"}
            mt={8}
            width={150}
            height={30}
            _hover={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          />
          <Stack spacing={6} mx={"auto"} maxW={"xl"} py={12} px={6}>
            <Flex align={"center"} flexDir="column">
              <Heading mt="22px" textAlign={"center"} fontSize={"2xl"}>
                Regístrate
              </Heading>
              <Text mt="16px" fontSize={"lg"} color={"gray.600"}>
                ¿Ya tienes una cuenta?{" "}
                <Button
                  p={0}
                  ml={1}
                  _hover={{ bg: "none", color: "primary.600" }}
                  onClick={() => router.push(`/sign-in?type=${type}`)}
                  color={"primary.300"}
                >
                  Inicia sesión
                </Button>
              </Text>
            </Flex>
            <StepsForm type={type} />
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
