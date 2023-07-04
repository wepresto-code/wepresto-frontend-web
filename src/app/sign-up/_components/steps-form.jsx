"use client";

import * as Yup from "yup";
import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
  Select,
  ButtonGroup,
  Flex,
  Button,
  createStandaloneToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

import userService from "@wepresto/services/user.service";
import signIn from "@wepresto/firebase/sign-in";

import delay from "@wepresto/utils/delay";
import getErrorMessage from "@wepresto/utils/get-error-message";

const { toast } = createStandaloneToast();

const phoneFormat = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

const signUpSchema = Yup.object().shape({
  fullName: Yup.string().required("Este campo es requerido"),
  email: Yup.string().email().required("Este campo es requerido"),
  phoneNumber: Yup.string().matches(phoneFormat, "Este número no es válido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Este campo es requerido"),
  documentNumber: Yup.string()
    .min(6, "La cédula está incompleta")
    .required("Este campo es requerido"),
  documentType: Yup.string(),
  country: Yup.string().required("Este campo es requerido"),
  city: Yup.string().uppercase().required("Este campo es requerido"),
  address: Yup.string().required("Este campo es requerido"),
});

const documentTypes = [
  { type: "CC", name: "Cédula de ciudadanía", value: "CEDULA_CIUDADANIA" },
  { type: "PP", name: "Pasaporte", value: "PASAPORTE" },
  { type: "CE", name: "Cédula de extranjería", value: "CEDULA_EXTRANJERIA" },
];

export default function StepsForm({ type = undefined }) {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState("Cédula de ciudadanía");

  const { register, handleSubmit, watch, formState } = useForm({
    mode: "all",
    resolver: yupResolver(signUpSchema),
  });
  const { errors, isSubmitting } = formState;

  const whatchAllFields = watch();

  const isFirstStepFilled = [
    "fullName",
    "email",
    "phoneNumber",
    "password",
  ].every((key) => whatchAllFields[key]);

  const onSubmit = async (formData) => {
    try {
      if (type === "borrower") {
        await userService.createBorrower({ ...formData });
      }
      if (type === "lender") {
        await userService.createLender({ ...formData });
      }

      await signIn({ email: formData.email, password: formData.password });

      await delay(10000);
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
      <Box
        w={[325, 450]}
        rounded={"lg"}
        bg={"white"}
        boxShadow={"0px 4px 51px rgba(0, 0, 0, 0.05)"}
        p={6}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {step === 0 && (
          <Box display={step === 0 ? "inherit" : "none"}>
            <FormControl isInvalid={errors.fullName} isRequired>
              <FormLabel htmlFor="full-name" fontWeight={"normal"}>
                Nombre completo
              </FormLabel>
              <Input
                {...register("fullName")}
                name="fullName"
                id="full-name"
                placeholder="Ingresa tu nombre completo"
              />
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email} isRequired mt={4}>
              <FormLabel htmlFor="email" fontWeight={"normal"}>
                Correo electrónico
              </FormLabel>
              <Input
                {...register("email")}
                id="email"
                type="email"
                name="email"
                placeholder="Ingresa tu correo electrónico"
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.phoneNumber} isRequired>
              <FormLabel
                htmlFor="phone_number"
                fontWeight="normal"
                _dark={{
                  color: "gray.50",
                }}
                mt={4}
              >
                Celular
              </FormLabel>
              <Input
                {...register("phoneNumber")}
                type="tel"
                name="phoneNumber"
                id="phone_number"
                autoComplete="tel"
                placeholder="Teléfono de contacto"
              />
              <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password} isRequired mt={4}>
              <FormLabel htmlFor="password" fontWeight={"normal"} mt="2%">
                Contraseña
              </FormLabel>
              <InputGroup size="md">
                <Input
                  pr="3rem"
                  autoComplete="new-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa una contraseña"
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
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
          </Box>
        )}

        {step === 1 && (
          <Box display={step === 1 ? "inherit" : "none"}>
            <FormControl isInvalid={errors.documentNumber} isRequired>
              <FormLabel
                htmlFor="document_number"
                fontWeight="normal"
                _dark={{
                  color: "gray.50",
                }}
                mt={4}
              >
                Documento de identidad
              </FormLabel>
              <InputGroup>
                <InputLeftAddon
                  bg="gray.50"
                  p="0"
                  _dark={{
                    bg: "gray.800",
                  }}
                  color="gray.500"
                >
                  <Select
                    {...register("documentType")}
                    id="documentType"
                    name="documentType"
                    focusBorderColor="transparent"
                    bgColor="transparent"
                    border="none"
                    defaultValue={"CC"}
                    borderRadius={"8px 0 0 8px"}
                    onChange={(e) => {
                      const { value } = e.target;
                      const documentType = documentTypes.find(
                        (item) => item.value === value
                      );
                      setSelectedDocumentType(documentType.name);
                    }}
                  >
                    {documentTypes.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.type}
                      </option>
                    ))}
                  </Select>
                </InputLeftAddon>
                <Input
                  {...register("documentNumber")}
                  type="text"
                  name="documentNumber"
                  id="document_number"
                  placeholder={selectedDocumentType}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.documentNumber?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.country} isRequired>
              <FormLabel
                htmlFor="country"
                fontWeight="normal"
                _dark={{
                  color: "gray.50",
                }}
                mt={4}
              >
                País de residencia
              </FormLabel>
              <Select
                {...register("country")}
                id="country"
                name="country"
                autoComplete="country"
                defaultValue={"COLOMBIA"}
                placeholder="País de residencia"
                focusBorderColor="primary.500"
                w="full"
                rounded="md"
              >
                <option value="COLOMBIA">Colombia</option>
              </Select>
              <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.city} isRequired>
              <FormLabel
                htmlFor="city"
                fontWeight="normal"
                _dark={{
                  color: "gray.50",
                }}
                mt={4}
              >
                Ciudad
              </FormLabel>
              <Select
                {...register("city")}
                name="city"
                id="city"
                autoComplete="city"
                defaultValue={"CALI"}
                placeholder="Ciudad de residencia"
                focusBorderColor="primary.500"
                w="full"
                rounded="md"
              >
                <option value="CALI">Cali</option>
              </Select>
              <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.address} isRequired>
              <FormLabel
                htmlFor="street_address"
                fontWeight="normal"
                _dark={{
                  color: "gray.50",
                }}
                mt={4}
              >
                Dirección
              </FormLabel>
              <Input
                {...register("address")}
                type="text"
                name="address"
                id="street_address"
                autoComplete="street-address"
                placeholder="Dirección de residencia"
              />
              <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
            </FormControl>
          </Box>
        )}
        <ButtonGroup mt={6} w="100%">
          <Flex w="100%" justifyContent="space-between">
            {step != 0 && (
              <Button
                onClick={() => {
                  setStep(step - 1);
                }}
                colorScheme="primary"
                w="7rem"
                mr="5%"
                variant="outline"
                type="button"
              >
                Atrás
              </Button>
            )}
            {step != 1 && (
              <Button
                isDisabled={!isFirstStepFilled}
                w="7rem"
                colorScheme="primary"
                variant="outline"
                type="button"
                onClick={() => {
                  setStep(step + 1);
                }}
              >
                Siguiente
              </Button>
            )}
            {step === 1 && (
              <Button
                w="7rem"
                colorScheme="primary"
                variant="solid"
                type="submit"
                isLoading={isSubmitting}
              >
                Registrarse
              </Button>
            )}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
