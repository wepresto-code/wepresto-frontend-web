import React from "react";
import { Flex } from "@chakra-ui/react";

export default function Chip({ text, color, bgColor }) {
  return (
    <Flex borderRadius={4} px={2} bgColor={bgColor} color={color} marginLeft={[0, 5]}>
      {text}
    </Flex>
  );
}
