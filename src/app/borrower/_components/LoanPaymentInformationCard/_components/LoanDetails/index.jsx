import React from "react";
import { Flex, Progress, Box, Text } from "@chakra-ui/react";

import formatCurrency from "@wepresto/utils/format-currency";
import formatDate from "@wepresto/utils/format-date";

const getInstallmentNumber = (data = {}) => {
  if (!data.minimalPaymentInformation) return;
  if (!data.minimalPaymentInformation.movements) return;
  if (!data.minimalPaymentInformation.movements[0]) return;
  if (!data.minimalPaymentInformation.movements[0].loanInstallmentInfo) return;
  if (!data.minimalPaymentInformation.movements[0].loanInstallmentInfo.order) return;

  return data.minimalPaymentInformation.movements[0].loanInstallmentInfo.order;
};

const getProgressPercentage = (installmentNumber, term) => {
  if (!installmentNumber) return 0;
  if (!term) return 0;
  
  return (installmentNumber / term) * 100;
};

export default function LoanDetails({ data }) {
  const installmentNumber = getInstallmentNumber(data);

  const { term, minimalPaymentInformation } = data;

  return (
    <>
      <Flex
        bgColor="gray.50"
        flexWrap={{ base: "wrap", md: "nowrap" }}
        justifyContent={["space-between", "flex-start"]}
        px={[2, 2, 4]}
      >
        <Box mr={[4, 4, 8]} flexBasis={["40%", "unset"]}>
          <Text
            fontSize={16}
            my={[1, 1, 2]}
            fontWeight="400"
            color="primary.700"
          >
            A capital
          </Text>
          <Text
            fontSize={14}
            fontWeight="600"
            color="primary.900"
            my={[1, 1, 2]}
          >
            {formatCurrency(minimalPaymentInformation?.principal, "COP")}
          </Text>
        </Box>
        <Box mr={[0, 0, 8]} flexBasis={["50%", "unset"]}>
          <Text
            fontSize={16}
            my={[1, 1, 2]}
            fontWeight="400"
            color="primary.700"
          >
            A intereses
          </Text>
          <Text
            fontSize={14}
            fontWeight="600"
            color="primary.900"
            my={[1, 1, 2]}
          >
            {formatCurrency(minimalPaymentInformation?.interest, "COP")}
          </Text>
        </Box>
        <Box mr={[4, 4, 8]} flexBasis={["40%", "unset"]}>
          <Text
            fontSize={16}
            my={[1, 1, 2]}
            mt={[4, 4, 2]}
            fontWeight="400"
            color="primary.700"
          >
            Cuota {installmentNumber} de {term}
          </Text>
          <Progress
            value={getProgressPercentage(installmentNumber, term)}
            mt={4}
            my={[1, 1, 2]}
            borderRadius="50"
            colorScheme="primary"
            bgColor="primary.300"
          />
        </Box>
        <Box flexBasis={["50%", "unset"]}>
          <Text
            fontSize={16}
            my={[1, 1, 2]}
            mt={[4, 4, 2]}
            fontWeight="400"
            color="primary.700"
          >
            Límite de pago
          </Text>
          <Text
            fontSize={14}
            fontWeight="600"
            color="primary.900"
            my={[1, 1, 2]}
          >
            {formatDate(new Date(minimalPaymentInformation.paymentDate), "UTC")}
          </Text>
        </Box>
      </Flex>
      {/*
      {hasArrears > 1 && (
        <Flex
          bgColor="gray.150"
          flexWrap={{ base: "wrap", md: "nowrap" }}
          justifyContent={["space-between", "flex-start"]}
          px={[2, 2, 4]}
        >
          <Box mr={[0, 0, 8]} flexBasis={["50%", "unset"]}>
            <Text
              fontSize={16}
              my={[1, 1, 2]}
              mt={[4, 4, 2]}
              fontWeight="400"
              color="primary.700"
            >
              Intereses mora
            </Text>
            <Text
              fontSize={14}
              fontWeight="600"
              color="primary.900"
              my={[1, 1, 2]}
            >
              {formatter(details.overDueInterest)}
            </Text>
          </Box>
          <Box flexBasis={["50%", "unset"]}>
            <Text
              fontSize={16}
              my={[1, 1, 2]}
              mt={[4, 4, 2]}
              fontWeight="400"
              color="primary.700"
            >
              Días mora
            </Text>
            <Text
              fontSize={14}
              fontWeight="600"
              color="primary.900"
              my={[1, 1, 2]}
            >
              {dateDiffInDays(new Date(details.paymentDate), new Date())}
            </Text>
          </Box>
        </Flex>
      )}
      */}
    </>
  );
}
