import React, { useState } from "react";
import {
  Flex,
  Table,
  Thead,
  Tr,
  Tooltip,
  Th,
  Box,
  Tbody,
  Td,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import formatCurrency from "@wepresto/utils/format-currency";
import HowToInvestModal from "./_components/HowToInvestModal/inde";

const getRows = (items) => {
  return items.map((item) => {
    return {
      uid: item?.uid.split("-")[4],
      amount: formatCurrency(item?.amount, "COP"),
      annualInterestRate: item?.annualInterestRate * 100 + "%",
      annualInterestOverdueRate: item?.annualInterestOverdueRate * 100 + "%",
      term: item?.term + " meses",
      fundedAmount: formatCurrency(item?.fundedAmount, "COP"),
      remainingAmount: formatCurrency(item?.remainingAmount, "COP"),
      fundedPercentage: item?.fundedPercentage * 100 + "%",
    };
  });
};

export default function OpportunitiesTable({ data = [] }) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loanUid, setLoanUid] = useState("");

  const handleInvestmentButtonClick = ({ loanUid }) => {
    setLoanUid(loanUid);
    onOpen();
  };
  
  return (
    <>
    <Flex overflowX="auto">
      <Table
        style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}
        variant="simple"
      >
        <Thead>
          <Tr bgColor="white">
            <Th color="primary.600" borderLeftRadius={12}>
              Prestamo
            </Th>
            <Tooltip label="Monto solicitado para retirar" placement="auto">
              <Th color="primary.600" cursor="help" textAlign="right">
                <Flex flexDir="row" alignItems="center">
                  Monto{" "}
                  <Box display={["none", "none", "flex"]}>
                    <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                  </Box>
                </Flex>
              </Th>
            </Tooltip>
            <Tooltip label="Tasa de interes anual" placement="auto">
              <Th color="primary.600" cursor="help" textAlign="right">
                <Flex flexDir="row" alignItems="center">
                  Interes anual{" "}
                  <Box display={["none", "none", "flex"]}>
                    <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                  </Box>
                </Flex>
              </Th>
            </Tooltip>
            <Tooltip
              label="Tasa de interes por mora anual (Aplica solo en caso de presentarse mora)"
              placement="auto"
            >
              <Th color="primary.600" cursor="help" textAlign="right">
                <Flex flexDir="row" alignItems="center">
                  Interes mora{" "}
                  <Box display={["none", "none", "flex"]}>
                    <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                  </Box>
                </Flex>
              </Th>
            </Tooltip>
            <Tooltip label="Número de coutas" placement="auto">
              <Th color="primary.600" cursor="help" textAlign="right">
                <Flex flexDir="row" alignItems="center">
                  Plazo{" "}
                  <Box display={["none", "none", "flex"]}>
                    <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                  </Box>
                </Flex>
              </Th>
            </Tooltip>
            <Tooltip label="Monto restante por recaudar" placement="auto">
              <Th color="primary.600" cursor="help" textAlign="right">
                <Flex flexDir="row" alignItems="center">
                  Por recaudar{" "}
                  <Box display={["none", "none", "flex"]}>
                    <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                  </Box>
                </Flex>
              </Th>
            </Tooltip>
            <Tooltip label="Porcentaje de recaudo" placement="auto">
              <Th color="primary.600" cursor="help" textAlign="right">
                <Flex flexDir="row" alignItems="center">
                  Porcentaje recaudado{" "}
                  <Box display={["none", "none", "flex"]}>
                    <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                  </Box>
                </Flex>
              </Th>
            </Tooltip>
            <Th
              color="primary.600"
              cursor="help"
              textAlign="right"
              borderRightRadius={12}
            >
              Invertir
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {getRows(data).map((item, index) => (
            <Tr key={index} bgColor="white">
              <Td borderLeftRadius={12} textAlign="left">
                {item.uid}
              </Td>
              <Td textAlign="left">{item.amount}</Td>
              <Td textAlign="left">{item.annualInterestRate}</Td>
              <Td textAlign="left">{item.annualInterestOverdueRate}</Td>
              <Td textAlign="left">{item.term}</Td>
              <Td textAlign="left">{item.remainingAmount}</Td>
              <Td textAlign="left">{item.fundedPercentage}</Td>
              <Td textAlign="left" borderRightRadius={12}>
                <Button
                  colorScheme="primary"
                  maxW={"fit-content"}
                  onClick={() => handleInvestmentButtonClick({ loanUid: item.uid })}
                >
                  Quiero participar!
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
    <HowToInvestModal isOpen={isOpen} onClose={onClose} loanUid={loanUid} />
    </>
  );
}
