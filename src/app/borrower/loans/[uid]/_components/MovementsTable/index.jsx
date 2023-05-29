import React, { useState } from "react";
import {
  Flex,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  Button,
  Select,
} from "@chakra-ui/react";
import environment from "@wepresto/environment";

import formatCurrency from "@wepresto/utils/format-currency";
import formatDate from "@wepresto/utils/format-date";

const PAGE_SIZE = 10; // Number of rows per page

const getRows = (items, type) => {
  return items
    .filter((item) => {
      if (
        type.startsWith(environment.PAYMENT_MOVEMENT_TYPE) &&
        item.type.startsWith(environment.PAYMENT_MOVEMENT_TYPE)
      ) {
        return true;
      }

      return item.type === type || type === "ALL";
    })
    .map((item, index) => {
      let type = "";
      switch (item.type) {
        case environment.LOAN_INSTALLMENT_MOVEMENT_TYPE:
          type = <Badge>Cuota</Badge>;
          break;
        case environment.OVERDUE_INTEREST_MOVEMENT_TYPE:
          type = <Badge colorScheme="red">Interés de mora</Badge>;
          break;
        case environment.PAYMENT_MOVEMENT_TYPE:
          type = <Badge colorScheme="green">Pago</Badge>;
          break;
        case environment.PAYMENT_TERM_REDUCTION_MOVEMENT_TYPE:
          type = <Badge colorScheme="green">Pago reducción de plazo</Badge>;
          break;
        case environment.PAYMENT_INSTALLMENT_AMOUNT_REDUCTION_MOVEMENT_TYPE:
          type = <Badge colorScheme="green">Pago reducción de cuota</Badge>;
          break;

        default:
          break;
      }

      let paid = "--";
      if (item.paid === true) paid = "Sí";
      if (item.paid === false) paid = "No";

      let processed = "--";
      if (item.processed === true) processed = "Sí";
      if (item.processed === false) processed = "No";

      return {
        id: item.id,
        index: index + 1,
        type,
        date: formatDate(new Date(item.dueDate || item.movementDate), "UTC"),
        amount: formatCurrency(item.amount, "COP"),
        interest: item.interest ? formatCurrency(item.interest, "COP") : "--",
        principal: item.principal
          ? formatCurrency(item.principal, "COP")
          : "--",
        total: formatCurrency(item.total, "COP"),
        balance: item.balance ? formatCurrency(item.balance, "COP") : "--",
        paid,
        processed,
      };
    });
};

export default function MovementsTable({ movements = [] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedType, setSelectedType] = useState("ALL");

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = (event) => {
    setSelectedType(event.target.value);
    setCurrentPage(0); // Reset the current page when the filter changes
  };

  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const filteredMovements = getRows(movements, selectedType);
  const paginatedMovements = filteredMovements.slice(startIndex, endIndex);

  return (
    <Flex
      borderRadius={8}
      mt={2}
      p={4}
      max-width="100%"
      flexDirection="column"
      bgColor="primary.700"
    >
      <Heading mb={3} size={"s"} color="white">
        Estos son los movimientos de tu préstamo:
      </Heading>
      <Flex justifyContent="left" mb={4}>
        <Select
          value={selectedType}
          onChange={handleFilterChange}
          maxW="200px"
          bgColor="gray.50"
        >
          <option value="ALL">Todos</option>
          <option value={environment.LOAN_INSTALLMENT_MOVEMENT_TYPE}>
            Cuota
          </option>
          <option value={environment.OVERDUE_INTEREST_MOVEMENT_TYPE}>
            Interés de mora
          </option>
          <option value={environment.PAYMENT_MOVEMENT_TYPE}>Pago</option>
        </Select>
      </Flex>
      <Flex
        borderRadius={8}
        bgColor="white"
        maxW={"100%"}
        w={"100%"}
        pb={0}
        px={0}
        justifyContent="center"
      >
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>Tipo</Th>
                <Th>Fecha</Th>
                <Th>Total</Th>
                <Th>A capital</Th>
                <Th>A intereses</Th>
                <Th>Balance</Th>
                <Th>Pagado?</Th>
                <Th>Procesado?</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedMovements.map((item) => (
                <Tr key={item.uid}>
                  <Td>{item.index}</Td>
                  <Td>{item.type}</Td>
                  <Td>{item.date} </Td>
                  <Td>{item.amount} </Td>
                  <Td>{item.principal} </Td>
                  <Td>{item.interest} </Td>
                  <Td>{item.balance} </Td>
                  <Td>{item.paid} </Td>
                  <Td>{item.processed} </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Flex mt={4} justifyContent="center">
        <Button
          mr={2}
          isDisabled={currentPage === 0}
          onClick={handlePreviousPage}
        >
          Previous
        </Button>
        <Button
          ml={2}
          isDisabled={endIndex >= filteredMovements.length}
          onClick={handleNextPage}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
}
