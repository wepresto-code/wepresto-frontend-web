"use client";

import * as Yup from "yup";
import React from "react";
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
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import formatCurrency from "@wepresto/utils/format-currency";

const signInSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Este campo es requerido"),
  bank: Yup.string().required("Este campo es requerido"),
  accountType: Yup.string().required("Este campo es requerido"),
  accountNumber: Yup.string().required("Este campo es requerido"),
});

const formOptions = { resolver: yupResolver(signInSchema) };

export default function WithdrawalRequestFormModal({
  isOpen,
  onClose,
  availableToWithdraw,
}) {
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

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
          <Box
            p={6}
            as="form"
            // onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={4}>
              <FormControl isInvalid={errors?.amount ? true : false} isRequired>
                <FormLabel>Monto</FormLabel>
                <Input
                  type="number"
                  placeholder="Monto a retirar"
                  {...register("amount")}
                />
                <FormErrorMessage>{errors?.amount?.message}</FormErrorMessage>
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
