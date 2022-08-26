import React from "react";
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Link,
  Stack,
} from "@chakra-ui/react";
import { LogoIcon } from "@/styles/customTheme";
import { useAuth } from "@/lib/auth";

const DashboardShell = ({ children }) => {
  const auth = useAuth();

  return (
    <Flex flexDirection="column">
      <Flex
        backgroundColor="white"
        alignItems="center"
        justifyContent="space-between"
        py={4}
        px={8}
      >
        <Stack spacing={4} isInline align="center">
          <LogoIcon color="black" fontSize={24} />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Flex alignItems="center">
          <Link mr={4}>Account</Link>
          <Avatar size="sm" src={auth.user.photoUrl} />
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.100" p={8} height="100vh">
        <Flex maxWidth="800px" w="100%" ml="auto" mr="auto" direction="column">
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.700">Sites</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading as="h2" size="xl" mb={4}>
            Sites
          </Heading>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default DashboardShell;
