"use client";

import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  chakra,
  createStandaloneToast,
} from "@chakra-ui/react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter, redirect } from "next/navigation";

import signIn from "@wepresto/firebase/sign-in";
import getErrorMessage from "@wepresto/utils/get-error-message";
import delay from "@wepresto/utils/delay";

import ValidateUser from "@wepresto/components/ValidateUser";
import isUserTypeValid from "@wepresto/utils/is-user-type-valid";

const { toast } = createStandaloneToast();

const signInSchema = Yup.object().shape({
  email: Yup.string().email().required("Este campo es requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Este campo es requerido"),
});

const formOptions = { resolver: yupResolver(signInSchema) };

const typeDepending = {
  borrower: {
    title: "Desbloquea tu potencial con un préstamo a medida",
    description:
      "En WePresto trabajamos para tí, entra ahora y solicita tu préstamo.",
  },
  lender: {
    title: "No te quedes por fuera y comienza a invertir",
    description:
      "En WePresto tu dinero SÍ crece, entra ahora e invierte en prestamos.",
  },
};

export default function signInPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const type = searchParams.get("type");

  useEffect(() => {
    if (!isUserTypeValid(type)) return redirect("/");
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const onSubmit = async ({ email, password }) => {
    try {
      await signIn({ email, password });
      await delay(5000);
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
      <ValidateUser />
      <Flex minH={["none", "none", "100vh"]} width="100vw">
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
            <Heading>{typeDepending[type]?.title}</Heading>
            <Text mt={4} fontSize={18}>
              {typeDepending[type]?.description}
            </Text>
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
          <Stack spacing={6} mx={"auto"} maxW={"xl"} py={12} pt={4} px={6}>
            <Flex align={"center"} flexDir="column">
              <Heading mt="22px" textAlign={"center"} fontSize={"2xl"}>
                Inicia sesión
              </Heading>
              <Text mt="16px" fontSize={"lg"} color={"gray.600"}>
                ¿No tienes una cuenta?{" "}
                <Button
                  p={0}
                  ml={1}
                  _hover={{ bg: "none", color: "primary.600" }}
                  onClick={() => router.push(`/sign-up?type=${type}`)}
                  color={"primary.300"}
                >
                  Regístrate
                </Button>
              </Text>
            </Flex>
            <Box
              rounded={"lg"}
              bg={"white"}
              boxShadow={"lg"}
              p={6}
              as="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack spacing={4}>
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
                  <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={errors.password ? true : false}
                  isRequired
                >
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      pr="3rem"
                      autoComplete="password"
                      placeholder="Ingresa tu contraseña"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />
                    <InputRightElement mr={2}>
                      {showPassword ? (
                        <RxEyeClosed
                          color="primary.500"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <RxEyeOpen
                          color="primary.500"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage width="250px">
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>
                <Stack spacing={4}>
                  <Stack
                    direction={"column"}
                    align={"end"}
                    justify={"space-between"}
                  >
                    <Link
                      fontSize={14}
                      href="/password-reset"
                      color={"blue.400"}
                    >
                      Olvidé la constraseña
                    </Link>
                  </Stack>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    colorScheme="primary"
                  >
                    Iniciar sesión
                  </Button>
                </Stack>
              </Stack>
            </Box>
            <chakra.p mt={6} fontSize="xs" textAlign="center" color="gray.600">
              Al iniciar sesión aceptas los{" "}
              <Link href={"/terminos"} target="_blank" color="primary.600">
                Términos y condiciones
              </Link>
            </chakra.p>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
