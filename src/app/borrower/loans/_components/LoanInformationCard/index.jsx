import React from "react";
import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  Text,
  AccordionIcon,
  AccordionPanel,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import environment from "@wepresto/environment";

import formatCurrency from "@wepresto/utils/format-currency";

import Chip from "./_components/Chip";
import approximateToTwoDecimals from "@wepresto/utils/approximate-to-two-decimals";
import formatDate from "@wepresto/utils/format-date";

const loanState = {
  APPROVED: {
    name: "Aprobado",
    bgColor: "status.approved",
    color: "primary.900",
  },
  REJECTED: {
    name: "Rechazado",
    bgColor: "status.rejected",
    color: "white",
  },
  DISBURSED: {
    name: "Desembolsado",
    bgColor: "status.disbursed",
    color: "white",
  },
  APPLIED: {
    name: "Solicitado",
    bgColor: "status.applied",
    color: "white",
  },
  REVIEWING: {
    name: "En Revisión",
    bgColor: "status.reviewing",
    color: "white",
  },
  PAID: {
    name: "Pagado",
    bgColor: "status.paid",
    color: "primary.900",
  },
  FUNDING: {
    name: "Fondeando",
    bgColor: "status.funding",
    color: "white",
  },
};

export default function LoanInformationCard({ data }) {
  const router = useRouter();

  const handleLoanDetailsButtonClick = () => {
    router.push(`/borrower/loans/${data?.uid}`);
  };

  return (
    <Flex
      boxShadow={"0px 4px 51px rgba(0, 0, 0, 0.05)"}
      borderRadius={[8, 22]}
      mt={[4, 4, 8]}
      bgColor="white"
      minW={["100%", "100%", "400px"]}
      w={["100%", "100%", "800px"]}
      flexDirection="column"
    >
      <Accordion allowToggle>
        <AccordionItem border="none">
          <AccordionButton
            color="primary.350"
            px={8}
            py={4}
            pb={[6, 6, 4]}
            borderRadius={[8, 22]}
            justifyContent="space-between"
          >
            <Flex
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Flex flexDir="column">
                <Flex
                  alignItems={["flex-start", "flex-start", "center"]}
                  flexDir={["column", "column", "row"]}
                >
                  <Flex alignItems={"baseline"}>
                    <Text fontSize={25} color="brand.font">
                      {formatCurrency(data.amount, "COP")}
                    </Text>
                  </Flex>
                  <Chip
                    text={loanState[data.status].name}
                    color={loanState[data.status].color}
                    bgColor={loanState[data.status].bgColor}
                  />
                </Flex>
                <Flex display={["none", "none", "flex"]} fontSize={14}>
                  <Flex alignItems="center">
                    <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                      Tasa EA:
                    </Text>
                    <Text fontWeight="600" color="primary.900" ml={2} mr={4}>
                      {data?.annualInterestRate
                        ? `${data?.annualInterestRate * 100}%`
                        : "--"}
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                      Interés mensual:
                    </Text>
                    <Text fontWeight="600" color="primary.900" ml={2} mr={4}>
                      {data?.annualInterestRate
                        ? approximateToTwoDecimals(
                            (data?.annualInterestRate * 100) / 12
                          )
                        : "--"}
                      %
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                      Plazo de pago:
                    </Text>
                    <Text fontWeight="600" color="primary.900" ml={2}>
                      {data?.term ? `${data?.term} cuotas` : "--"}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <AccordionIcon w={8} h={8} />
            </Flex>
          </AccordionButton>
          <AccordionPanel
            bgColor="gray.150"
            minW={["100%", "100%", "630px"]}
            w={["100%", "100%", "100%"]}
            pb={4}
            borderBottomRadius={[8, 22]}
          >
            <Flex
              fontSize={14}
              my={4}
              mx={4}
              flexDirection={["column", "column", "row"]}
            >
              <Flex alignItems="center">
                <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                  Interes mora:
                </Text>
                <Text ml={2} mr={4} fontWeight="600" color="primary.900">
                  {data?.annualInterestOverdueRate
                    ? approximateToTwoDecimals(
                        (data?.annualInterestOverdueRate / 12) * 100
                      )
                    : "--"}
                  %
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                  Solicitud:
                </Text>
                <Text ml={2} mr={4} fontWeight="600" color="primary.900">
                  {data?.createdAt
                    ? formatDate(new Date(data.createdAt), "UTC")
                    : "--"}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                  Desembolso:
                </Text>
                <Text ml={2} mr={4} fontWeight="600" color="primary.900">
                  {data?.startDate
                    ? formatDate(new Date(data.startDate), "UTC")
                    : "--"}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                  T. plataforma:
                </Text>
                <Text ml={2} mr={4} fontWeight="600" color="primary.900">
                  {data?.platformFee
                    ? approximateToTwoDecimals(data?.platformFee)
                    : "--"}
                </Text>
              </Flex>
            </Flex>
            {data.status === environment.DISBURSED_LOAN_STATUS && (
              <Flex
                fontSize={14}
                my={4}
                mx={4}
                flexDirection={["column", "column", "row"]}
              >
                <Button
                  id="loan-details-button"
                  bgColor="primary.700"
                  color="white"
                  _hover={{
                    bg: "primary.500",
                    textDecoration: "none",
                  }}
                  _focusVisible={{
                    bg: "primary.500",
                    textDecoration: "none",
                  }}
                  onClick={handleLoanDetailsButtonClick}
                >
                  Detalles
                </Button>
              </Flex>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}
