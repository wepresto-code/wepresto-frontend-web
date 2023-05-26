"use client";

import React, { useEffect, useState } from "react";
import { Flex, Text, Spinner, createStandaloneToast } from "@chakra-ui/react";

import useAuthContext from "@wepresto/context/auth-context";

import loanService from "@wepresto/services/loan.service";
import movementService from "@wepresto/services/movement.service";

import getBorrowerUid from "@wepresto/utils/get-borrower-uid";
import getErrorMessage from "@wepresto/utils/get-error-message";

import ValidateUser from "@wepresto/components/ValidateUser";
import Greetings from "@wepresto/components/Greetings";
import LoanPaymentInformationCard from "./_components/LoanPaymentInformationCard";

const { toast } = createStandaloneToast();

const DISBURSED_LOAN_STATUS = process.env.NEXT_PUBLIC_DISBURSED_LOAN_STATUS;
const LOAN_INSTALLMENT_MOVEMENT_TYPE =
  process.env.NEXT_PUBLIC_LOAN_INSTALLMENT_MOVEMENT_TYPE;

export default function Borrower() {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [greetingsCase, setGreetingsCase] = useState();
  const [disbursedLoans, setDisbursedLoans] = useState([]);

  const fetchDisbursedLoans = async () => {
    try {
      const loans = await loanService.getBorrowerLoans({
        borrowerUid: getBorrowerUid(user),
        statuses: [DISBURSED_LOAN_STATUS].join(","),
      });

      let newLoans = [];
      for (const loan of loans) {
        const [minimalPaymentInformation, totalPaymentInformation] = await Promise.all([
          loanService.getMinimumPaymentInformation({ loanUid: loan.uid }),
          loanService.getTotalPaymentInformation({ loanUid: loan.uid }),
        ]);

        const { movements = [] } = minimalPaymentInformation;

        let newMovements = [];
        for (const movement of movements) {
          const { type } = movement;

          if (type === LOAN_INSTALLMENT_MOVEMENT_TYPE) {
            const loanInstallmentInfo =
              await movementService.getLoanInstallmentInfo({
                movementUid: movement.uid,
              });

            newMovements = [
              ...newMovements,
              { ...movement, loanInstallmentInfo },
            ];
          } else {
            newMovements = [...newMovements, { ...movement }];
          }
        }

        newLoans = [
          ...newLoans,
          {
            ...loan,
            minimalPaymentInformation: {
              ...minimalPaymentInformation,
              movements: newMovements,
            },
            totalPaymentInformation: {
              ...totalPaymentInformation,
            },
          },
        ];
      }

      setDisbursedLoans(newLoans);
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
    setGreetingsCase(Math.floor(Math.random() * 4));
    fetchDisbursedLoans().finally(() => setLoading(false));
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
        <Greetings user={user} value={greetingsCase} />

        {loading && <Spinner mt={4} />}

        {!loading && !disbursedLoans.length && (
          <Flex flexDir={"column"}>
            <Text mt={8}>
              No tienes préstamos desembolsados por el momento. Solicita uno:
            </Text>
          </Flex>
        )}

        {!loading && disbursedLoans.length && (
          <>
            {disbursedLoans.map((loan) => (
              <LoanPaymentInformationCard
                key={loan.uid}
                data={{
                  term: loan.term,
                  minimalPaymentInformation:  { ...loan.minimalPaymentInformation },
                  totalPaymentInformation: { ...loan.totalPaymentInformation },
                }}
              />
            ))}
          </>
        )}
      </Flex>
    </>
  );
}
