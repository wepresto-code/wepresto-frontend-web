import React from "react";
import {
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

import formatCurrency from "@wepresto/utils/format-currency";

import LoanDetails from "./_components/LoanDetails";
import HowToPayModal from "./_components/HowToPayModal/inde";

export default function LoanPaymentInformationCard({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { minimalPaymentInformation, totalPaymentInformation } = data;

  const handleHowToPayClick = () => {
    onOpen();
  };

  return (
    <>
      <Flex
        boxShadow={"0px 4px 51px rgba(0, 0, 0, 0.05)"}
        mb={12}
        borderRadius={[8, 22]}
        mt={[4, 4, 8]}
        bgColor="white"
        maxW={["100%", "100%", "630px"]}
        w={["100%", "100%", "auto"]}
        flexDirection="column"
      >
        <Flex justifyContent="space-between">
          <Text fontSize={16} color="primary.700" pt={8} px={8}>
            Tu próxima cuota es de
          </Text>
        </Flex>
        <Accordion allowToggle>
          <AccordionItem border="none">
            <AccordionButton
              color="primary.350"
              px={8}
              justifyContent="space-between"
            >
              <Flex alignItems={"baseline"}>
                <Text fontSize={[34, 50]} color="brand.font">
                  {formatCurrency(
                    minimalPaymentInformation?.totalAmount,
                    "COP"
                  )}
                </Text>
              </Flex>
              <AccordionIcon w={8} h={8} />
            </AccordionButton>
            <AccordionPanel
              minW={["100%", "100%", "630px"]}
              w={["100%", "100%", "auto"]}
              pb={4}
            >
              <LoanDetails data={{ ...data }} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Flex m={[4, 6]} justifyContent="flex-end">
          <Button
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
            bgColor="primary.500"
            color="white"
            onClick={handleHowToPayClick}
          >
            ¿Cómo pagar?
            <FaArrowRight style={{ marginLeft: "8px" }} />
          </Button>
        </Flex>
      </Flex>
      <HowToPayModal
        isOpen={isOpen}
        onClose={onClose}
        minimumPaymentAmount={minimalPaymentInformation.totalAmount}
        maximumPaymentAmount={totalPaymentInformation.totalAmount}
      />
    </>
  );
}
