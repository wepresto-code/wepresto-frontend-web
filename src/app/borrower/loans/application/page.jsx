"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Heading,
  Text,
  NumberInput,
  NumberInputField,
  createStandaloneToast,
  Spinner,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Select,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Input,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

import useAuthContext from "@wepresto/context/auth-context";

import loanService from "@wepresto/services/loan.service";

import getErrorMessage from "@wepresto/utils/get-error-message";
import getBorrowerUid from "@wepresto/utils/get-borrower-uid";

import ValidateUser from "@wepresto/components/ValidateUser";
import formatCurrency from "@wepresto/utils/format-currency";
import approximateToTwoDecimals from "@wepresto/utils/approximate-to-two-decimals";
import InstallementsTable from "./_components/InstallementsTable";

const { toast } = createStandaloneToast();

const MIN_AMOUNT = 250000;
const MAX_AMOUNT = 5000000;
const INITIAL_AMOUNT = 500000;

const ALIAS_PLACEHOLDERS = [
  `Vacaciones ${new Date().getFullYear()}`,
  `Navidad ${new Date().getFullYear()}`,
  `Cumpleaños ${new Date().getFullYear()}`,
  `Reforma ${new Date().getFullYear()}`,
  "Moto",
  "Deudas",
  "Ropa",
];

export default function Application() {
  const [loading, setLoading] = useState(true);
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(0);
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [simulatedLoan, setSimulatedLoan] = useState(undefined);
  const [aliasPlaceholder, setAliasPlaceholder] = useState(undefined);
  const [alias, setAlias] = useState(undefined);
  const [applying, setApplying] = useState(false);

  const { user } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const fetchTerms = async () => {
    try {
      const terms = await loanService.getLoanTerms();

      setTerms(terms);
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
    fetchTerms().finally(() => {
      setAmount(INITIAL_AMOUNT);
      setLoading(false);
    });
  }, []);

  const filterTerms = () => {
    return terms.filter(({ value }) => {
      if (amount <= MIN_AMOUNT) return false;
      if (amount <= 500000 && value <= 6) {
        return true;
      } else if (amount > 500000 && amount <= 1000000 && value <= 12) {
        return true;
      } else if (amount > 1000000 && amount <= 2000000 && value <= 18) {
        return true;
      } else if (amount > 2000000 && amount <= 5000000 && value <= 24) {
        return true;
      } else {
        return false;
      }
    });
  };

  useEffect(() => {
    setFilteredTerms(filterTerms());

    if (amount < MIN_AMOUNT) {
      return setErrorMessage(
        `El monto mínimo es ${formatCurrency(MIN_AMOUNT, "COP")}`
      );
    } else if (amount > MAX_AMOUNT) {
      return setErrorMessage(
        `El monto máximo es ${formatCurrency(MAX_AMOUNT, "COP")}`
      );
    } else if (amount % 10000 !== 0) {
      return setErrorMessage("El monto debe ser múltiplo de 10000");
    }

    return setErrorMessage(undefined);
  }, [amount]);

  useEffect(() => {
    setAliasPlaceholder(
      ALIAS_PLACEHOLDERS[Math.floor(Math.random() * ALIAS_PLACEHOLDERS.length)]
    );

    const intervalId = setInterval(() => {
      setAliasPlaceholder(
        ALIAS_PLACEHOLDERS[
          Math.floor(Math.random() * ALIAS_PLACEHOLDERS.length)
        ]
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleNumberInputOnChange = (value) => {
    if (!value) return setAmount(0);
    const parsedValue = typeof value === "string" ? parseInt(value) : value;
    setAmount(parsedValue);
    setSelectedTerm(0);
  };

  const handleSliderOnChange = (value) => {
    const parsedValue = typeof value === "string" ? parseInt(value) : value;
    setAmount(Math.floor(parsedValue / 50000) * 50000);
  };

  const handleSliderOnChangeEnd = () => {
    setSelectedTerm(0);
  };

  const handleSelectOnChange = (event) => {
    const parsedValue = event.target.value ? parseInt(event.target.value) : 0;
    setSelectedTerm(parsedValue);
  };

  const handleSimulateOnClick = async () => {
    if (!alias) {
      return toast({
        position: "bottom-right",
        title: "Hubo un error",
        description: "Debes ingresar un alias",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }

    if (errorMessage) {
      return toast({
        position: "bottom-right",
        title: "Hubo un error",
        description: errorMessage,
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }

    if (selectedTerm === 0) {
      return toast({
        position: "bottom-right",
        title: "Hubo un error",
        description: "Debes seleccionar un plazo",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }

    try {
      const simulatedLoan = await loanService.loanSimulate({
        amount,
        term: selectedTerm,
      });

      setSimulatedLoan(simulatedLoan);
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

  const handleApplyOnClick = async () => {
    try {
      setApplying(true);

      const loansInProgress = await loanService.getLoansInProgress({
        borrowerUid: getBorrowerUid(user),
      });

      if (loansInProgress.length > 0) {
        throw new Error("Ya tienes un préstamo en progreso");
      }

      await loanService.loanApply({
        borrowerUid: getBorrowerUid(user),
        amount: simulatedLoan?.amount,
        term: simulatedLoan?.term,
        alias: simulatedLoan?.alias,
      });

      onClose();

      setSimulatedLoan(undefined);

      toast({
        position: "bottom-right",
        title: "Préstamo solicitado",
        description: "Tu préstamo ha sido solicitado con éxito",
        status: "success",
        duration: 10000,
        isClosable: true,
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
    } finally {
      setApplying(false);
    }
  };

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
          Aplica para un préstamo
        </Heading>
        {loading && <Spinner mt={4} />}

        {!loading && (
          <Flex
            justifyContent="space-between"
            flexDirection={["column", "column", "row"]}
          >
            <Flex
              boxShadow={"0px 4px 51px rgba(0, 0, 0, 0.05)"}
              mb={[2, 2, 0]}
              borderRadius={[8, 22]}
              mt={[4, 4, 8]}
              bgColor="white"
              flexDirection="column"
              p={[4, 4, 6]}
              h="fit-content"
            >
              <Flex flexDir={"column"} justifyContent="center">
                <Text fontWeight={600} fontSize={18} mb={4}>
                  Alias
                </Text>
                <Input
                  placeholder={aliasPlaceholder}
                  py={8}
                  px={6}
                  fontSize={26}
                  fontWeight={600}
                  type="text"
                  onChange={(event) => setAlias(event.target.value)}
                ></Input>
                <Text fontWeight={600} fontSize={18} mb={4} marginTop={4}>
                  ¿Cuánto necesitas?
                </Text>
                <NumberInput
                  clampValueOnBlur={false}
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  value={amount}
                  onChange={handleNumberInputOnChange}
                >
                  <NumberInputField
                    py={8}
                    px={6}
                    fontSize={26}
                    fontWeight={600}
                  />
                </NumberInput>
                <Text mb={4} mt={2} fontSize={16} color="error.400">
                  {errorMessage}
                </Text>
                <Slider
                  colorScheme="primary"
                  aria-label="slider-ex-6"
                  mb={12}
                  focusThumbOnChange={false}
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  value={amount}
                  onChange={handleSliderOnChange}
                  onChangeEnd={handleSliderOnChangeEnd}
                >
                  <SliderMark value={MIN_AMOUNT} mt={5} fontSize={"sm"}>
                    {formatCurrency(MIN_AMOUNT, "COP")}
                  </SliderMark>
                  <SliderMark
                    value={MAX_AMOUNT}
                    ml={-120}
                    mt={5}
                    fontSize={"sm"}
                  >
                    {formatCurrency(MAX_AMOUNT, "COP")}
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text fontWeight={600} fontSize={18} mb={4}>
                  ¿Cuánto plazo necesitas?
                </Text>
                {terms.length && (
                  <Select value={selectedTerm} onChange={handleSelectOnChange}>
                    <option value={0}>Selecciona un plazo</option>
                    {filteredTerms.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.value} cuotas
                      </option>
                    ))}
                  </Select>
                )}

                <Button
                  marginTop={5}
                  maxW={["100%", "100%", "fit-content"]}
                  colorScheme={"primary"}
                  onClick={handleSimulateOnClick}
                >
                  Simular
                </Button>
              </Flex>
            </Flex>
            <Flex
              boxShadow={"0px 4px 51px rgba(0, 0, 0, 0.05)"}
              mb={12}
              borderRadius={[8, 22]}
              mt={[1, 1, 8]}
              bgColor="white"
              w={"100%"}
              maxW="100%"
              overflowX="auto"
              flexDirection="column"
              p={[4, 4, 6]}
              ml={[0, 0, 4]}
            >
              <Text fontWeight={600} fontSize={18} my={4}>
                Resumen del préstamo:
              </Text>
              <Flex
                borderRadius={6}
                border={"1px"}
                borderColor={"gray.200"}
                flexDir={"column"}
                mb={8}
              >
                <Accordion allowToggle>
                  <AccordionItem border="none">
                    <AccordionButton
                      color="primary.350"
                      px={4}
                      justifyContent="space-between"
                    >
                      <Text color={"gray.400"}>Estas serían las cuotas:</Text>
                      <AccordionIcon w={6} h={6} color="gray.900" />
                    </AccordionButton>
                    <AccordionPanel
                      bgColor="white"
                      maxW={"100%"}
                      w={"100%"}
                      pb={0}
                      px={0}
                    >
                      <InstallementsTable
                        installments={simulatedLoan?.loanInstallments}
                      />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <Flex
                  px={4}
                  bgColor="gray.100"
                  justifyContent={"space-between"}
                  py={2}
                >
                  <Text color={"gray.400"}>Tasa Efectiva Anual:</Text>
                  <Text>{(simulatedLoan?.annualInterestRate || 0) * 100}%</Text>
                </Flex>
                <Flex px={4} justifyContent={"space-between"} py={2}>
                  <Text color={"gray.400"}>Interés mensual:</Text>
                  <Text>
                    {approximateToTwoDecimals(
                      (simulatedLoan?.annualInterestRate || 0) / 12
                    ) * 100}
                    %
                  </Text>
                </Flex>
                <Flex
                  px={4}
                  bgColor="gray.100"
                  justifyContent={"space-between"}
                  py={2}
                >
                  <Text color={"gray.400"}>Plazo de pago:</Text>
                  <Text>{simulatedLoan?.term || 0} cuotas/meses</Text>
                </Flex>
                <Flex px={4} justifyContent={"space-between"} py={2}>
                  <Text color={"gray.400"}>Monto solicitado:</Text>
                  <Text>
                    {formatCurrency(simulatedLoan?.requestedAmount || 0, "COP")}
                  </Text>
                </Flex>
                <Flex
                  px={4}
                  bgColor="gray.100"
                  justifyContent={"space-between"}
                  py={2}
                >
                  <Text color={"gray.400"}>Tarifa de la plataforma:</Text>
                  <Text>
                    {formatCurrency(
                      simulatedLoan?.platformUsageFee || 0,
                      "COP"
                    )}
                  </Text>
                </Flex>
                <Flex px={4} justifyContent={"space-between"} py={2}>
                  <Text color={"gray.400"}>Monto prestado:</Text>
                  <Text>
                    {formatCurrency(simulatedLoan?.amount || 0, "COP")}
                  </Text>
                </Flex>
              </Flex>
              <Button
                isLoading={loading}
                colorScheme={"primary"}
                alignSelf={"flex-end"}
                maxW={["100%", "100%", "fit-content"]}
                size="md"
                isDisabled={!simulatedLoan}
                onClick={onOpen}
              >
                Solicitar préstamo
              </Button>
              <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
              >
                <AlertDialogOverlay />
                <AlertDialogContent>
                  <AlertDialogHeader>Solicitar préstamo?</AlertDialogHeader>
                  <AlertDialogCloseButton />
                  <AlertDialogBody>
                    Estas seguro de solicitar el préstamo por un monto de{" "}
                    {formatCurrency(simulatedLoan?.amount, "COP")} a un plazo de{" "}
                    {simulatedLoan?.term} cuotas?
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      No
                    </Button>
                    <Button
                      colorScheme={"primary"}
                      ml={3}
                      isDisabled={applying}
                      onClick={handleApplyOnClick}
                    >
                      Si
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
}
