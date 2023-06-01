"use client";

import * as Yup from "yup";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  HStack,
  Text,
  ModalCloseButton,
  ModalBody,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Stack,
  Button,
  Select,
  RadioGroup,
  Radio,
  createStandaloneToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import environment from "@wepresto/environment";

import withdrawalService from "@wepresto/services/withdrawal.service";

import useAuthContext from "@wepresto/context/auth-context";

import formatCurrency from "@wepresto/utils/format-currency";
import getErrorMessage from "@wepresto/utils/get-error-message";
import getLenderUid from "@wepresto/utils/get-lender-uid";

const BANKS = [
  {
    name: "Banco de Bogotá",
    value: "BANCO_DE_BOGOTA",
  },
  {
    name: "Banco Colombia",
    value: "BANCO_COLOMBIA",
  },
  {
    name: "Banco Davivienda",
    value: "BANCO_DAVIVIENDA",
  },
  {
    name: "Nequi",
    value: "NEQUI",
  },
  {
    name: "Daviplata",
    value: "DAVIPLATA",
  },
  {
    name: "TransfiYa",
    value: "TRANSFIYA",
  },
];

const signInSchema = Yup.object().shape({
  amount: Yup.number("Este campo debe ser numérico")
    .required("Este campo es requerido")
    .min(
      environment.MINIMUM_WITHDRAWAL_AMOUNT,
      `El monto mínimo es ${formatCurrency(
        environment.MINIMUM_WITHDRAWAL_AMOUNT,
        "COP"
      )}`
    )
    .default(0),
  bank: Yup.string().notOneOf(["NONE"], "Este campo es requerido"),
  accountNumber: Yup.string().required("Este campo es requerido"),
});

const formOptions = { resolver: yupResolver(signInSchema) };

export default function WithdrawalRequestFormModal({
  isOpen,
  onClose,
  availableToWithdraw,
  setAvailableToWithdraw,
}) {
  const { user } = useAuthContext();
  const { toast } = createStandaloneToast();

  const [selectedBank, setSelectedBank] = useState("NONE");
  const [accountType, setAccountType] = useState("SAVINGS");

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const onSubmit = async (formData) => {
    try {
      const { message, amount } = await withdrawalService.requestWithdrawal({
        lenderUid: getLenderUid(user),
        accountType,
        ...formData,
      });

      toast({
        position: "bottom-right",
        title: "Solicitud enviada",
        description: message,
        status: "success",
        duration: 10000,
        isClosable: true,
      });

      setAvailableToWithdraw(availableToWithdraw - amount);

      onClose();
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
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Text>Solicitar retiro</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={6} as="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={errors?.amount ? true : false} isRequired>
                <FormLabel>Monto</FormLabel>
                <Input
                  type="number"
                  placeholder="Monto a retirar"
                  autoComplete="off"
                  {...register("amount")}
                />
                <FormErrorMessage>{errors?.amount?.message}</FormErrorMessage>
              </FormControl>
              <Text mb={4}>
                Disponible: {formatCurrency(availableToWithdraw, "COP")}
              </Text>
              <FormControl isInvalid={errors?.bank ? true : false} isRequired>
                <FormLabel>Banco</FormLabel>
                <Select
                  {...register("bank")}
                  value={selectedBank}
                  onChange={(event) => setSelectedBank(event.target.value)}
                >
                  <option value={"NONE"}>Selecciona un banco</option>
                  {BANKS.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors?.bank?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Tipo</FormLabel>
                <RadioGroup onChange={setAccountType} value={accountType}>
                  <Stack direction="row">
                    <Radio value="SAVINGS">Ahorros</Radio>
                    <Radio value="CHECKING">Corriente</Radio>
                    <Radio value="N/A">No aplica</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <FormControl
                isInvalid={errors?.accountNumber ? true : false}
                isRequired
              >
                <FormLabel>Cuenta</FormLabel>
                <Input
                  type="text"
                  placeholder="Número de cuenta"
                  autoComplete="off"
                  {...register("accountNumber")}
                />
                <FormErrorMessage>
                  {errors?.accountNumber?.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={4}>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="primary"
                >
                  Enviar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
