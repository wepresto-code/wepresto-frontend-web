"use client";

import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  createStandaloneToast,
  Spinner,
} from "@chakra-ui/react";

import useAuthContext from "@wepresto/context/auth-context";

import withdrawalService from "@wepresto/services/withdrawal.service";

import getLenderUid from "@wepresto/utils/get-lender-uid";
import getErrorMessage from "@wepresto/utils/get-error-message";

import ValidateUser from "@wepresto/components/ValidateUser";
import WithdrawalInformationCard from "./_components/WithdrawalInformationCard";

export default function WithdrawalsPage() {
  const { user } = useAuthContext();
  const { toast } = createStandaloneToast();

  const [loading, setLoading] = useState(true);
  const [withdrawalInfo, setWithdrawalInfo] = useState();

  const fetchWithdrawalInfo = async () => {
    try {
      const result = await withdrawalService.getAvailableToWithdraw({
        lenderUid: getLenderUid(user),
      });
      const result1 = await withdrawalService.getTotalWithdrawn({
        lenderUid: getLenderUid(user),
      });

      setWithdrawalInfo({
        ...result,
        ...result1,
      });
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

  useEffect(() => {
    fetchWithdrawalInfo().finally(() => setLoading(false));
  }, []);

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
          Retira tú dinero
        </Heading>

        {loading && <Spinner mt={4} />}

        {!loading && withdrawalInfo && <WithdrawalInformationCard data={withdrawalInfo} />}
      </Flex>
    </>
  );
}
