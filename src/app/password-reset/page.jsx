"use client";

import * as Yup from "yup";
import React, { useState } from "react";
import {
  Flex,
  Heading,
  Text,
  Container,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Link,
  createStandaloneToast,
  Box,
  Stack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import userService from "@wepresto/services/user.service";

import getErrorMessage from "@wepresto/utils/get-error-message";

import ValidateUser from "@wepresto/components/ValidateUser";

const { toast } = createStandaloneToast();

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required("Este campo es requerido"),
});

const formOptions = { resolver: yupResolver(resetPasswordSchema) };

export default function PasswordReset() {
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, watch, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const whatchAllFields = watch();

  const isFormFilled = ["email"].every((key) => whatchAllFields[key]);

  const onSubmit = async (data) => {
    try {
      await userService.sendResetPasswordEmail(data);
      setSent(true);
    } catch (error) {
      toast({
        position: "bottom-right",
        title: "Hubo un error",
        description: getErrorMessage(error),
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <ValidateUser type={undefined} />
      <Flex w="100%" justifyContent={"center"}>
        <Container
          boxShadow={["0px 4px 51px rgba(0, 0, 0, 0.05)", "none", "none"]}
          maxW="100%"
          zIndex={[2, -1]}
          position={["fixed", "absolute"]}
          backgroundImage={"/banner.png"}
          width="100vw"
          height={["66px", "128px"]}
          backgroundSize="cover"
        />
        <Flex
          pt={[24, 40]}
          justifyContent="center"
          pb={["80px", "40px"]}
          w="100%"
          flexDirection={"row"}
        >
          <Flex
            align={"center"}
            justify={"center"}
            bg={"gray.50"}
            alignSelf="center"
            flex="auto"
            flexDir="column"
            pt={8}
          >
            <Flex align={"center"} flexDir="column">
              <Heading mt="22px" textAlign={"center"} fontSize={"2xl"}>
                Cambia tu contraseña
              </Heading>
              <Text
                textAlign="center"
                maxW="600px"
                mb={8}
                mt="4px"
                fontSize={"lg"}
                color={"gray.600"}
              >
                Escribe el correo asociado a tu cuenta. Recibirás un link para
                reestablecer la contraseña.
              </Text>

              <Flex
                minH={["none", "none"]}
                align={"center"}
                justify={"center"}
                bg={"gray.50"}
                alignSelf="center"
                flex="auto"
                flexDir="column"
              >
                <Stack
                  spacing={6}
                  mx={"auto"}
                  maxW={"xl"}
                  py={12}
                  pt={4}
                  px={6}
                >
                  <Box
                    rounded={"lg"}
                    bg={"white"}
                    boxShadow={"lg"}
                    p={6}
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Stack spacing={4}>
                      {!sent && (
                        <>
                          <FormControl
                            isInvalid={errors?.email ? true : false}
                            isRequired
                          >
                            <FormLabel>Correo electrónico</FormLabel>
                            <Input
                              type="email"
                              placeholder="Ingresa tu correo"
                              {...register("email")}
                            />
                            <FormErrorMessage>
                              {errors?.email?.message}
                            </FormErrorMessage>
                          </FormControl>
                          <Button
                            type="submit"
                            isDisabled={!isFormFilled}
                            isLoading={isSubmitting}
                            mt={4}
                            alignSelf="flex-end"
                            colorScheme="primary"
                          >
                            Enviar enlace
                          </Button>
                        </>
                      )}
                      {sent && (
                        <>
                          <Text color="primary.600">
                            Hemos enviado un correo con el link para
                            reestablecer tu contraseña.
                          </Text>
                          <Link
                            display="flex"
                            mt={4}
                            w="fit-content"
                            alignItems="center"
                            _hover={{
                              bg: "primary.700",
                              textDecoration: "none",
                            }}
                            _focusVisible={{
                              bg: "primary.700",
                              textDecoration: "none",
                            }}
                            flexDir="row"
                            px="14px"
                            py="8px"
                            borderRadius={8}
                            href="/"
                            bgColor="primary.500"
                            color="white"
                            alignSelf="flex-end"
                            colorScheme="primary"
                          >
                            Volver al inicio de sesión
                          </Link>
                        </>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
