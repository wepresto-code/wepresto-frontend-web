import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

const NavItem = ({
  label,
  icon,
  link,
  active,
}) => {
  return (
    <Flex flexBasis={0} flexGrow={1} alignItems="center" flexDirection="column">
      <Link href={link}>
        <Flex
          color={active ? "primary.700" : "primary.350"}
          flexDirection={"column"}
          alignItems="center"
        >
          {icon}
          <Text fontSize={12}>{label}</Text>
        </Flex>
      </Link>
    </Flex>
  );
};

export const BottomNav = ({ menuItems, pathname }) => {
  return (
    <Flex
      position="fixed"
      bottom="0"
      bgColor={"white"}
      boxShadow={"top"}
      p={2}
      zIndex={10}
      justifyContent="space-between"
      w="100%"
    >
      {menuItems.map((item, index) => (
        <NavItem
          active={pathname === item.link}
          key={index}
          label={item.mobileName || item.name}
          icon={item.iconMobile || item.icon}
          link={item.link}
        />
      ))}
    </Flex>
  );
};

export default BottomNav;
