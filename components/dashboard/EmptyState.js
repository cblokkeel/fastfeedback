import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import AddSiteModal from "@/components/dashboard/AddSiteModal";

const EmptyState = () => {
  return (
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius={4}
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size="lg" as="h2" mb={2}>
        You haven't added any sites
      </Heading>
      <Text mb={4}>Welcome 👋🏻 Let's get started.</Text>
      <AddSiteModal>Add your first site</AddSiteModal>
    </Flex>
  );
};
export default EmptyState;
