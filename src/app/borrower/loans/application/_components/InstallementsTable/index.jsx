"use client";

import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import formatCurrency from "@wepresto/utils/format-currency";

export default function InstallementsTable({ installments = [] }) {
  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>A intereses</Th>
            <Th>A capital</Th>
            <Th>Total</Th>
            <Th>Balance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {installments.map((item, index) => (
            <Tr key={index}>
              <Td>{item.order + 1} </Td>
              <Td>{formatCurrency(item.interest, "COP")} </Td>
              <Td>{formatCurrency(item.principal, "COP")} </Td>
              <Td>{formatCurrency(item.amount, "COP")} </Td>
              <Td>{formatCurrency(item.balance, "COP")} </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
