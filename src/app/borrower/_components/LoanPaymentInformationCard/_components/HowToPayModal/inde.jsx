import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  HStack,
  Text,
  ModalCloseButton,
  ModalBody,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Link,
  Stack,
  Flex,
  Divider,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaRegCopy } from "react-icons/fa";

import formatCurrency from "@wepresto/utils/format-currency";

const StepItem = ({ step, content, finalStep }) => (
  <Stack>
    <Stack direction="row">
      <Stack direction="column" alignItems="center" spacing={0}>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          flexGrow={0}
          width={8}
          height={8}
          borderRadius="9999px"
          backgroundColor="primary.500"
          color="white"
        >
          {step}
        </Flex>
        {!finalStep && (
          <Divider
            orientation="vertical"
            opacity={1}
            height="100%"
            borderWidth="1px"
            borderColor="primary.500"
          />
        )}
      </Stack>
      <Stack direction="column" pb={8}>
        {content}
      </Stack>
    </Stack>
  </Stack>
);

const PaymentGuide = ({ minimumPaymentAmount, maximumPaymentAmount }) => {
  const toast = useToast();

  let stepOne;

  if (minimumPaymentAmount && !maximumPaymentAmount) {
    stepOne = (
      <StepItem
        step={1}
        content={
          <Text>
            Haz una transferencia a través de Nequi por el monto de{" "}
            <Box as="strong" color="primary.500">
              {formatCurrency(minimumPaymentAmount, "COP")}
            </Box>
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(minimumPaymentAmount);
                toast({
                  title: "¡Valor copiado!",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              }}
              aria-label="Copiar número de WhatsApp"
              variant="ghost"
              height="23px"
              color="primary.350"
              icon={<FaRegCopy />}
            />
          </Text>
        }
      />
    );
  } else if (minimumPaymentAmount && maximumPaymentAmount) {
    stepOne = (
      <StepItem
        step={1}
        content={
          <Text>
            Haz una transferencia a través de Nequi por el monto mayor a{" "}
            <Box as="strong" color="primary.500">
              {formatCurrency(minimumPaymentAmount, "COP")}
            </Box>{" "}
            y menor o igual a{" "}
            <Box as="strong" color="primary.500">
              {formatCurrency(maximumPaymentAmount, "COP")}
            </Box>
          </Text>
        }
      />
    );
  } else if (!minimumPaymentAmount && maximumPaymentAmount) {
    stepOne = (
      <StepItem
        step={1}
        content={
          <Text>
            Haz una transferencia a través de Nequi por el monto de{" "}
            <Box as="strong" color="primary.500">
              {formatCurrency(maximumPaymentAmount, "COP")}
            </Box>
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(maximumPaymentAmount);
                toast({
                  title: "¡Valor copiado!",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              }}
              aria-label="Copiar número de WhatsApp"
              variant="ghost"
              height="23px"
              color="primary.350"
              icon={<FaRegCopy />}
            />
          </Text>
        }
      />
    );
  }

  return (
    <>
      {stepOne}
      <StepItem
        step={2}
        content={
          <Text>
            Si necesitas información sobre cómo realizar la transferencia,
            puedes hacer clic en el{" "}
            <Link
              color="primary.500"
              href="https://ayuda.nequi.com.co/hc/es/articles/115001419752-Quiero-enviar-plata-a-otro-Nequi"
              target="_blank"
            >
              enlace
            </Link>{" "}
            de ayuda.
          </Text>
        }
      />
      <StepItem
        step={3}
        content={
          <Text>
            Una vez que hayas completado la transacción, por favor envíanos una
            captura de pantalla o comparte el comprobante al siguiente número de
            WhatsApp:{" "}
            <Link
              fontWeight="medium"
              color="primary.500"
              target="_blank"
              href={
                "https://wa.me/+573134086868/?text=Hola, quisiera confirmar que ya he realizado un pago a mi préstamo."
              }
            >
              +57 3134086868
            </Link>
          </Text>
        }
      />
      <StepItem
        step={4}
        content={
          <Text>
            Nosotros validaremos tu pago de manera efectiva una vez que hayamos
            recibido la captura de pantalla o el comprobante.
          </Text>
        }
        finalStep
      />
    </>
  );
};

export default function HowToPayModal({
  isOpen,
  onClose,
  minimumPaymentAmount,
  maximumPaymentAmount,
}) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Text>¿Cómo pagar mi préstamo?</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" color="primary.500">
                  Quiero pagar mi cuota
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <PaymentGuide
                  minimumPaymentAmount={minimumPaymentAmount}
                  maximumPaymentAmount={undefined}
                />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" color="primary.500">
                    Quiero hacer un abono por otro valor
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <PaymentGuide
                  minimumPaymentAmount={minimumPaymentAmount}
                  maximumPaymentAmount={maximumPaymentAmount}
                />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" color="primary.500">
                    Quiero liquidar mi préstamo
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <PaymentGuide
                  minimumPaymentAmount={undefined}
                  maximumPaymentAmount={maximumPaymentAmount}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
