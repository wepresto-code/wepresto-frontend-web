import React, { useState } from "react";
import { Flex, Button, useToast } from "@chakra-ui/react";

export default function Toggle({ title, component, disabled, ...props }) {
  const [show, setShow] = useState(false);

  const toast = useToast();
  const handleToggle = (disabled) => {
    if (disabled) {
      toast({
        position: "bottom-right",
        title: "Ya tienes una solicitud pendiente",
        description:
          "Solo puedes tener una solicitud en estado \"solicitado\" al tiempo.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      setShow(!show);
    }
  };

  return (
    <Flex {...props}>
      <Button
        maxW={"fit-content"}
        colorScheme="primary"
        onClick={() => handleToggle(disabled)}
      >
        {title}
      </Button>
      {show ? component : undefined}
    </Flex>
  );
}
