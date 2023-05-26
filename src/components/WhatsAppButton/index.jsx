import { Flex, Text, Image } from "@chakra-ui/react";
import React from "react";

const WhatsAppIcon = ({ phoneNumber, fullName, documentNumber }) => {
  const handleSendMessage = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=Hola, soy ${fullName}, mi número de documento es ${documentNumber} y necesito ayuda con la plataforma.`,
      "_blank"
    );
  };

  return (
    <Flex
      alignItems="center"
      cursor="pointer"
      position="fixed"
      bottom={["unset", "unset", 4]}
      top={[4, 4, "unset"]}
      right={4}
      zIndex={999}
      display="flex"
      onClick={handleSendMessage}
    >
      <Text
        fontSize={[14, 14, 18]}
        height="fit-content"
        bgColor="white"
        mr={2}
        py={[1, 1, 2]}
        px={[2, 2, 4]}
        borderRadius={50}
        boxShadow={"0px 2px 8px rgba(0, 0, 0, 0.1)"}
      >
        ¡Contáctanos!
      </Text>
      <Image
        src="/whatsapp.png"
        width={[10, 10, 20]}
        height={[10, 10, 20]}
        alt="WhatsApp Icon"
        style={{ cursor: "pointer" }}
      />
    </Flex>
  );
};

export default WhatsAppIcon;
