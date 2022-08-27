import Head from "next/head";
import { useAuth } from "@/lib/auth";
import { Button, Flex } from "@chakra-ui/react";
import { LogoIcon } from "@/styles/customTheme";

const Home = () => {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <LogoIcon fontSize="64px" />
      {auth.user ? (
        <Button as="a" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={() => auth.signinWithGithub()}>
          Sign In
        </Button>
      )}
    </Flex>
  );
};

export default Home;
