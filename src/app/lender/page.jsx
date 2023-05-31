"use client";

import React, { useState, useEffect } from "react";
import { Flex, Spinner, createStandaloneToast } from "@chakra-ui/react";

import lenderService from "@wepresto/services/lender.service";

import useAuthContext from "@wepresto/context/auth-context";

import getLenderUid from "@wepresto/utils/get-lender-uid";
import getErrorMessage from "@wepresto/utils/get-error-message";

import ValidateUser from "@wepresto/components/ValidateUser";
import Greetings from "@wepresto/components/Greetings";
import LoanParticipationsResumeCard from "./_components/LoanParticipationsResumeCard";

export default function Borrower() {
  const { user } = useAuthContext();
  const { toast } = createStandaloneToast();

  const [loading, setLoading] = useState(true);
  const [greetingsCase, setGreetingsCase] = useState();
  const [participationsResume, setParticipationsResume] = useState();

  const fetchParticipationsResume = async () => {
    try {
      const result = await lenderService.getParticipationsResume({
        lenderUid: getLenderUid(user),
      });

      setParticipationsResume({
        ...result,
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
    setGreetingsCase(Math.floor(Math.random() * 4));
    fetchParticipationsResume().finally(() => setLoading(false));
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
        <Greetings user={user} value={greetingsCase} />

        {loading && <Spinner mt={4} />}

        {!loading && participationsResume && (
          <LoanParticipationsResumeCard data={participationsResume} />
        )}
      </Flex>
    </>
  );
}
