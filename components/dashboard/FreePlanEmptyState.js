import React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

const FreePlanEmptyState = () => (
  <Box width="100%" backgroundColor="white" borderRadius={4} p={8}>
    <Heading size="md" as="h2">
      Get feedback on your site instantly
    </Heading>
    <Text>Start today, then grow with us 🌱</Text>
    <Button variant="solid" size="md">
      Upgrade to Starter
    </Button>
  </Box>
);
export default FreePlanEmptyState;
