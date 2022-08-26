import "@/styles/globals.css";
import { AuthProvider } from "@/lib/auth";
import { ChakraProvider } from "@chakra-ui/react";
import { CSSReset } from "@chakra-ui/css-reset";
import customTheme from "@/styles/customTheme";
import { css, Global } from "@emotion/react";

const GlobalStyle = ({ children }) => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
