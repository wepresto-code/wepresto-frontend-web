"use client";

import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

import ValidateUser from "@wepresto/components/ValidateUser";

export default function OpportunitiesPage() {
  return (
    <>
      <ValidateUser type={"lender"} />
      <Flex
        mt={[32, 32, 40]}
        pb={[10, 10, 4]}
        flexDirection="column"
        w={"100%"}
      >
        <Heading key="1" as="h3" size="lg" fontWeight={800}>
          Oportunidades para que inviertas
        </Heading>
      </Flex>
    </>
  );
}
