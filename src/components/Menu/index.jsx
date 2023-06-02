"use client";
import {
  Flex,
  Avatar,
  Image,
  Text,
  Button,
  Box,
  useMediaQuery,
  Heading,
  SkeletonCircle,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaCog, FaSignOutAlt, FaChevronRight } from "react-icons/fa";

import signOut from "@wepresto/firebase/sign-out";

import getUserFirstAndLastName from "@wepresto/utils/get-user-first-and-last-name";

import BottomNav from "./BottomNav";

export const Menu = ({ user = undefined, menuItems = [] }) => {
  const pathname = usePathname();
  const [isSmallScreen] = useMediaQuery("(max-width: 930px)");
  const [scrollY, setScrollY] = useState(0);
  const [avatarSize, setAvatarSize] = useState("100px");
  const [avatarFontSize, setAvatarFontSize] = useState("50px");
  const [opacity, setOpacity] = useState(0);
  const [profileLink, setProfileLink] = useState("/");

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    if (user?.borrower) setProfileLink("/borrower/profile");
    else if (user?.lender) setProfileLink("/lender/profile");

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY < 60 && scrollY > 0) {
      setAvatarSize(`${100 - scrollY}px`);
      setAvatarFontSize(`${50 - scrollY / 1.8}px`);
    }
    if (scrollY > 60) {
      setAvatarSize("40px");
      setAvatarFontSize("18px");
    }
    if (scrollY > 30) {
      setOpacity((scrollY - 30) / (60 - 30));
    } else if (scrollY < 30) {
      setOpacity(0);
    }
  }, [scrollY]);

  const handleSignOut = async () => {
    await signOut();
  };

  return isSmallScreen ? (
    <>
      <Box
        bgColor={"rgba(12,29,32,0.7)"}
        opacity={opacity}
        zIndex={2}
        w="100%"
        h="66px"
        position="fixed"
      />
      <Link
        m={4}
        mt={3}
        position="fixed"
        zIndex={3}
        display="flex"
        href={profileLink}
      >
        <Avatar
          border={"3px white solid"}
          size="xl"
          name={user?.fullName}
          src={user?.image}
          zIndex={3}
          h={avatarSize}
          w={avatarSize}
          sx={{
            div: {
              fontSize: avatarFontSize,
            },
          }}
        />
        <Heading
          display="flex"
          p={1}
          opacity={opacity}
          mt="4px"
          position="fixed"
          ml={1}
          left={16}
          fontSize={20}
          zIndex={3}
          as="h3"
          color="white"
          fontWeight={800}
        >
          Ir a mi perfil{" "}
          <FaChevronRight
            fontSize={14}
            style={{ marginLeft: "8px", marginTop: "6px" }}
          />
        </Heading>
      </Link>

      <BottomNav menuItems={menuItems} pathname={pathname} />
    </>
  ) : (
    <Flex
      minW="320px"
      height={menuItems.length > 2 ? "auto" : "85vh"}
      display={["none", "flex"]}
      borderRadius={22}
      m={10}
      boxShadow={"7px 0px 64px rgba(0, 0, 0, 0.04)"}
      flexDirection={"column"}
      bgColor="white"
      py={10}
      px={4}
      justifyContent="space-between"
      alignItems={"center"}
    >
      {!user ? (
        <Flex flexDirection="column" width="100%" alignItems={"center"}>
          <Skeleton
            startColor="gray.100"
            endColor="gray.200"
            mt="2"
            mb="6"
            width="150px"
            height="30px"
          />
          <SkeletonCircle
            startColor="gray.100"
            endColor="gray.200"
            size="4rem"
            alignSelf="center"
          />
          <Skeleton
            startColor="gray.100"
            endColor="gray.200"
            width="70%"
            mt="1rem"
            height="20px"
          />
        </Flex>
      ) : (
        <Flex
          flexDirection={"column"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Link href={"/home"}>
            <Image alt="Logo de WePresto" src="/logo.png" width={150} mb={6} />
          </Link>
          <Avatar
            size="xl"
            name={getUserFirstAndLastName(user?.fullName)}
            src={getUserFirstAndLastName(user?.fullName)}
          />
          <Text color="brand.font" mt={4} fontSize={20} fontWeight={600}>
            {user?.fullName}
          </Text>
        </Flex>
      )}

      <Flex
        as="nav"
        width="100%"
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        listStyleType="none"
      >
        {!menuItems.length && <Spinner />}
        {menuItems?.map((item, index) => (
          <Link
            w="100%"
            target={item.target || "_self"}
            textDecoration="none"
            _hover={{
              TextDecoration: "none",
            }}
            key={index}
            href={item.link}
          >
            <Button
              px={8}
              justifyContent="flex-start"
              width="100%"
              mt={4}
              py={6}
              leftIcon={item.icon}
              isActive={pathname === item.link}
              _active={{
                bg: "brand.background",
                color: "primary.700",
              }}
              _hover={{ bg: "brand.background", color: "primary.700" }}
              bgColor="transparent"
              color="primary.350"
              borderRadius={12}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </Flex>

      <Flex
        as="nav"
        width="100%"
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        listStyleType="none"
      >
        <Link
          href={profileLink}
          w="100%"
          textDecoration="none"
          _hover={{
            TextDecoration: "none",
          }}
        >
          <Button
            justifyContent="flex-start"
            px={8}
            leftIcon={<FaCog fontSize={22} style={{ marginRight: "8px" }} />}
            width="100%"
            mt={4}
            py={6}
            isActive={pathname?.substring(1) === "profile"}
            _active={{
              bg: "brand.background",
              color: "primary.700",
            }}
            _hover={{ bg: "brand.background", color: "primary.700" }}
            bgColor="transparent"
            color="primary.350"
            borderRadius={12}
          >
            Ajustes
          </Button>
        </Link>
        <Button
          justifyContent="flex-start"
          px={8}
          leftIcon={
            <FaSignOutAlt fontSize={22} style={{ marginRight: "8px" }} />
          }
          width="100%"
          mt={4}
          py={6}
          onClick={() => handleSignOut()}
          isActive={pathname?.substring(1) === "cerrar sesión"}
          _active={{
            color: "error.400",
          }}
          _hover={{ color: "error.400" }}
          bgColor="transparent"
          color="error.300"
          borderRadius={12}
        >
          Cerrar sesión
        </Button>
      </Flex>
    </Flex>
  );
};

export default Menu;
