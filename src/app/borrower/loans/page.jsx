"use client";

import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Spinner,
  createStandaloneToast,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import environment from "@wepresto/environment";

import useAuthContext from "@wepresto/context/auth-context";

import loanService from "@wepresto/services/loan.service";

import getBorrowerUid from "@wepresto/utils/get-borrower-uid";
import getErrorMessage from "@wepresto/utils/get-error-message";

import ValidateUser from "@wepresto/components/ValidateUser";
import LoanInformationCard from "./_components/LoanInformationCard";

const { toast } = createStandaloneToast();

export default function LoansPage() {
  const router = useRouter();
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    try {
      const loans = await loanService.getBorrowerLoans({
        borrowerUid: getBorrowerUid(user),
      });

      setLoans(loans);
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
    fetchLoans().finally(() => setLoading(false));
  }, []);

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
          Mis Préstamos
        </Heading>
        {loading && <Spinner mt={4} />}

        {!loading && loans.length && (
          <Flex flexDirection="column" mt={6}>
            <Button
              id="apply-for-loan-button"
              bgColor="gray.700"
              color="white"
              maxW={"fit-content"}
              _hover={{
                bg: "gray.500",
                textDecoration: "none",
              }}
              _focusVisible={{
                bg: "gray.500",
                textDecoration: "none",
              }}
              disabled={loans?.some((loan) => loan.status === environment.APPLIED_LOAN_STATUS)}
              onClick={() => router.push("/borrower/loans/application")}
            >
              Solicitar nuevo préstamo
            </Button>
          </Flex>
        )}

        {!loading &&
          loans.length &&
          loans.map((loan) => (
            <LoanInformationCard key={loan.uid} data={loan} />
          ))}
      </Flex>
    </>
  );
}
