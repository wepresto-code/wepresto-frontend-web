"use client";

import React from "react";
import {
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Link,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

import formatCurrency from "@wepresto/utils/format-currency";

export default function LoanParticipationsResumeCard({ data }) {
  return (
    <Flex
      boxShadow={"0px 4px 51px rgba(0, 0, 0, 0.05)"}
      mb={12}
      borderRadius={[8, 22]}
      mt={[4, 4, 8]}
      bgColor="white"
      maxW={["100%", "100%", "600px"]}
      w={["100%", "100%", "100%"]}
      flexDirection="column"
    >
      <Text fontSize={16} color="primary.700" pt={8} px={8}>
        Haz invertido en total
      </Text>
      <Accordion allowToggle>
        <AccordionItem border="none">
          <AccordionButton
            color="primary.350"
            px={8}
            justifyContent="space-between"
          >
            <Flex alignItems={"baseline"}>
              <Text fontSize={[34, 50]} color="brand.font">
                {formatCurrency(data?.totalInvested, "COP")}
              </Text>
            </Flex>
            <AccordionIcon w={8} h={8} />
          </AccordionButton>
          <AccordionPanel
            bgColor="gray.150"
            minW={["100%", "100%", "630px"]}
            w={["100%", "100%", "auto"]}
            pb={4}
          >
            <Flex
              flexWrap={{ base: "wrap", md: "nowrap" }}
              justifyContent={["space-between", "flex-start"]}
              px={[2, 2, 4]}
            >
              <Box mr={[4, 4, 8]} flexBasis={["40%", "unset"]}>
                <Text
                  fontSize={18}
                  my={[1, 1, 2]}
                  fontWeight="400"
                  color="primary.700"
                >
                  Recuperado
                </Text>
                <Text fontSize={16} fontWeight="600" color="primary.900">
                  {formatCurrency(data?.totalPrincipal, "COP")}
                </Text>
              </Box>
              <Box mr={[0, 0, 8]} flexBasis={["50%", "unset"]}>
                <Text
                  fontSize={18}
                  my={[1, 1, 2]}
                  fontWeight="400"
                  color="primary.700"
                >
                  Ganancias
                </Text>
                <Text fontSize={16} fontWeight="600" color="primary.900">
                  {formatCurrency(data?.totalInterest)}
                </Text>
              </Box>
              <Box mr={[0, 0, 8]} flexBasis={["50%", "unset"]}>
                <Text
                  fontSize={18}
                  my={[1, 1, 2]}
                  fontWeight="400"
                  color="primary.700"
                >
                  Retirado
                </Text>
                <Text fontSize={16} fontWeight="600" color="primary.900">
                  {formatCurrency(data?.totalWithdrawn ? data?.totalWithdrawn * -1 : data?.totalWithdrawn, "COP")}
                </Text>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Flex m={[4, 6]} justifyContent="flex-end">
        <Link
          display="flex"
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
          href={"https://recarga.nequi.com.co/bdigitalpsl/"}
          target="_blank"
          bgColor="primary.500"
          color="white"
        >
          Retirar
          <FaArrowRight style={{ marginLeft: "8px" }} />
        </Link>
      </Flex>
    </Flex>
  );
}
