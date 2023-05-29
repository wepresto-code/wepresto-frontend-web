"use client";

import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  createStandaloneToast,
  Spinner,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";

import loanService from "@wepresto/services/loan.service";
import movementService from "@wepresto/services/movement.service";

import getErrorMessage from "@wepresto/utils/get-error-message";

import ValidateUser from "@wepresto/components/ValidateUser";
import MovementsTable from "./_components/MovementsTable";

const { toast } = createStandaloneToast();

export default function LoanPage() {
  const params = useParams();
  const { uid } = params;

  const [loading, setLoading] = useState(true);
  const [loan, setLoan] = useState(null);

  const fetchLoan = async () => {
    try {
      const loan = await loanService.getLoan({ loanUid: uid });
      const movements = await movementService.getLoanMovements({ loanUid: loan.uid });
      setLoan({ ...loan, movements });
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
    fetchLoan().finally(() => setLoading(false));
  }, [uid]);

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
          Préstamo
        </Heading>
        {loading && <Spinner mt={4} />}

        {!loading && loan && (
          <MovementsTable movements={loan.movements} />
        )}
      </Flex>
    </>
  );
}
