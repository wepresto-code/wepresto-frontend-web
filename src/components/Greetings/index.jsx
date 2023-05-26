import React from "react";
import { Heading, Skeleton, Text } from "@chakra-ui/react";
import getUserFirstAndLastName from "@wepresto/utils/get-user-first-and-last-name";

export const Greetings = ({ user = undefined, value = 0 }) => {
  if (user) {
    switch (value) {
      case 0:
        return (
          <Heading key="1" as="h3" size="lg" fontWeight={800}>
            ¡Bienvenido,{" "}
            <Text as="span" fontWeight={200}>
              {getUserFirstAndLastName(user?.fullName).split(" ")[0]}!
            </Text>
          </Heading>
        );
      case 1:
        return (
          <Heading key="1" as="h3" size="lg" fontWeight={800}>
            ¡Hola de nuevo,{" "}
            <Text as="span" fontWeight={200}>
              {getUserFirstAndLastName(user?.fullName).split(" ")[0]}!
            </Text>
          </Heading>
        );
      case 2:
        return (
          <Heading key="2" as="h3" size="lg" fontWeight={800}>
            <Text as="span" fontWeight={200}>
              {getUserFirstAndLastName(user?.fullName).split(" ")[0]}!
            </Text>
            , ¿Qué harás hoy?
          </Heading>
        );
      case 3:
        return (
          <Heading key="1" as="h3" size="lg" fontWeight={800}>
            Qué bueno verte,{" "}
            <Text as="span" fontWeight={200}>
              {getUserFirstAndLastName(user?.fullName).split(" ")[0]}!
            </Text>
          </Heading>
        );

      default:
        return (
          <Skeleton
            mt="8px"
            startColor="gray.100"
            endColor="gray.200"
            height="24px"
          />
        );
    }
  } else {
    return (
      <Skeleton
        mt="8px"
        startColor="gray.100"
        endColor="gray.200"
        height="24px"
      />
    );
  }
};

export default Greetings;
