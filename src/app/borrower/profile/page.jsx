"use client";

import React from "react";
import { Flex, Heading, FormLabel, Input, Button, useBreakpointValue } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";

import signOut from "@wepresto/firebase/sign-out";

import useAuthContext from "@wepresto/context/auth-context";

import ValidateUser from "@wepresto/components/ValidateUser";

export default function profilePage() {
  const { user } = useAuthContext();

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <ValidateUser type={"borrower"} />
      <Flex
        mt={[32, 32, 40]}
        pb={[10, 10, 4]}
        flexDirection="column"
        w={"100%"}
      >
        <Heading key="1" as="h3" size="lg" fontWeight={800}>
          Perfil
        </Heading>

        <Flex
          boxShadow={"0px 4px 51px rgba(0, 0, 0, 0.05)"}
          mb={12}
          borderRadius={[8, 22]}
          mt={[4, 4, 8]}
          bgColor="white"
          maxW={["100%", "100%", "630px"]}
          w={["100%", "100%", "auto"]}
          flexDirection="column"
          py={4}
          pt={6}
          px={6}
        >
          <FormLabel fontWeight={600} mb={2} htmlFor="name">
            Nombre
          </FormLabel>
          <Input
            disabled
            value={user?.fullName}
            placeholder="Ingresa tu nuevo nombre"
            mb={6}
          />
          <FormLabel fontWeight={600} mb={2} htmlFor="email">
            Correo electrónico
          </FormLabel>
          <Input
            disabled
            value={user?.email}
            // onChange={handleEmailChange}
            placeholder="Ingresa tu nuevo correo"
            mb={6}
          />
          <FormLabel fontWeight={600} mb={2} htmlFor="phone">
            Teléfono
          </FormLabel>
          <Input
            disabled
            value={user?.phoneNumber}
            placeholder="Ingresa tu nuevo número telefónico"
            mb={3}
          />
          <FormLabel fontWeight={600} mb={2} htmlFor="phone">
            Dirección
          </FormLabel>
          <Input
            disabled
            value={user?.address}
            placeholder="Ingresa tu nueva dirección"
            mb={3}
          />
        </Flex>
        {isMobile && (
          <Flex flexDirection="column" mt={[4, 4, 8]}>
            <Button
              id="apply-for-loan-button"
              colorScheme="red"
              onClick={() => signOut()}
              leftIcon={
                <FaSignOutAlt fontSize={22} style={{ marginRight: "8px" }} />
              }
            >
              Cerrar sesión
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  );
}
