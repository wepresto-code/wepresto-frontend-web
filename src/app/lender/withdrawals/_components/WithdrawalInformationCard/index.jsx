"use client";

import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import environment from "@wepresto/environment";

import formatCurrency from "@wepresto/utils/format-currency";

import WithdrawalRequestFormModal from "./_components/WithdrawalRequestFormModal";

export default function WithdrawalInformationCard({ data }) {
  const [availableToWithdraw, setAvailableToWithdraw] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setAvailableToWithdraw(data?.availableToWithdraw);
  }, [data]);


  return (
    <>
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
          En este momento dispones en total
        </Text>
        <Accordion allowToggle>
          <AccordionItem border="none">
            <AccordionButton
              color="primary.350"
              px={8}
              justifyContent="space-between"
            >
              <Flex alignItems={"baseline"}>
                <Text fontSize={[24, 50]} color="brand.font">
                  {formatCurrency(availableToWithdraw, "COP")}
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
                    Retirado
                  </Text>
                  <Text fontSize={16} fontWeight="600" color="primary.900">
                    {formatCurrency(data?.totalWithdrawn, "COP")}
                  </Text>
                </Box>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Flex m={[4, 6]} justifyContent="flex-end">
          <Button
            id="apply-for-loan-button"
            colorScheme="primary"
            maxW={"fit-content"}
            onClick={() => onOpen()}
            isDisabled={
              !(
                data?.availableToWithdraw >
                environment.MINIMUM_WITHDRAWAL_AMOUNT
              )
            }
          >
            Solicitar retiro
          </Button>
        </Flex>
      </Flex>
      <WithdrawalRequestFormModal
        isOpen={isOpen}
        onClose={onClose}
        availableToWithdraw={data?.availableToWithdraw}
        setAvailableToWithdraw={setAvailableToWithdraw}
      />
    </>
  );
}
