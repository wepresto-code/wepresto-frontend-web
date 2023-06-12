import React from "react";
import { Flex, Table, Thead, Tr, Tooltip, Th, Box, Tbody, Td } from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import formatCurrency from "@wepresto/utils/format-currency";

const getRows = (items) => {
  return items.map((item) => {
    return {
      amount: formatCurrency(item?.amount, "COP"),
      depositAmount: formatCurrency(item?.depositAmount),
      comissionAmount: formatCurrency(item?.comissionAmount),
      status: item?.status,
      bank: item?.accountInfo?.bank,
      accountType: item?.accountInfo?.accountType,
      accountNumber: item?.accountInfo?.accountNumber,
    };
  });
};

export default function WithdrawalsTable({ data = [] }) {
  return (
    <Flex overflowX="auto">
      <Table
        style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}
        variant="simple"
      >
        <Thead>
          <Tr bgColor="white">
            <Tooltip label="Monto solicitado para retirar" placement="auto">
              <Th
                color="primary.600"
                cursor="help"
                textAlign="right"
                borderLeftRadius={12}
              >
                <Flex flexDir="row" alignItems="center">
                  Monto{" "}
                  <Box display={["none", "none", "flex"]}>
                    <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                  </Box>
                </Flex>
              </Th>
            </Tooltip>
            <Tooltip label="Monto depositado" placement="auto">
              <Th color="primary.600" cursor="help" textAlign="right">
                <Flex flexDir="row" alignItems="center">
                  Depositado{" "}
                  <Box display={["none", "none", "flex"]}>
                    <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                  </Box>
                </Flex>
              </Th>
            </Tooltip>
            <Tooltip label="Comisión de la plataforma" placement="auto">
              <Th color="primary.600" cursor="help" textAlign="right">
                <Flex flexDir="row" alignItems="center">
                  Comisión{" "}
                  <Box display={["none", "none", "flex"]}>
                    <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                  </Box>
                </Flex>
              </Th>
            </Tooltip>
            <Tooltip label="Estado del retiro" placement="auto">
              <Th
                color="primary.600"
                cursor="help"
                textAlign="right"
                borderRadius={12}
              >
                <Flex flexDir="row" alignItems="center">
                  Estado{" "}
                  <Box display={["none", "none", "flex"]}>
                    <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                  </Box>
                </Flex>
              </Th>
            </Tooltip>
            <Tooltip
              label="Banco o entidad a la cual se realiza el deposito"
              placement="auto"
            >
              <Th
                color="primary.600"
                cursor="help"
                textAlign="right"
                borderRadius={12}
              >
                <Flex flexDir="row" alignItems="center">
                  Banco{" "}
                  <Box display={["none", "none", "flex"]}>
                    <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                  </Box>
                </Flex>
              </Th>
            </Tooltip>
            <Tooltip
              label='Tipo de cuenta. ("N/A" significa: No Aplica)'
              placement="auto"
            >
              <Th
                color="primary.600"
                cursor="help"
                textAlign="right"
                borderRadius={12}
              >
                <Flex flexDir="row" alignItems="center">
                  Tipo de cuenta{" "}
                  <Box display={["none", "none", "flex"]}>
                    <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                  </Box>
                </Flex>
              </Th>
            </Tooltip>
            <Tooltip
              label="Numero de cuenta a la que se realiza el deposito"
              placement="auto"
            >
              <Th
                color="primary.600"
                cursor="help"
                textAlign="right"
                borderRadius={12}
              >
                <Flex flexDir="row" alignItems="center">
                  Número de cuenta{" "}
                  <Box display={["none", "none", "flex"]}>
                    <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                  </Box>
                </Flex>
              </Th>
            </Tooltip>
          </Tr>
        </Thead>
        <Tbody>
          {getRows(data).map((item, index) => (
            <Tr key={index} bgColor="white">
              <Td color="brand.font" borderLeftRadius={12}>
                {item.amount}
              </Td>
              <Td color="brand.font">{item.depositAmount}</Td>
              <Td color="brand.font">{item.comissionAmount}</Td>
              <Td color="brand.font">{item.status}</Td>
              <Td color="brand.font">{item.bank}</Td>
              <Td color="brand.font">{item.accountType}</Td>
              <Td color="brand.font">{item.accountNumber}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
