import "@/styles/globals.css";
import { AgentSocketObjectsProvider } from "contexts/AgentSocketObjects/AgentSocketObjects";
import AlertProvider from "contexts/Alert";
import { CallingCallProvider } from "contexts/CallingModal/CallingModal";
import { CompanySocketObjectsProvider } from "contexts/CompanySocketObjects/CompanySocketObjects";
import { PageLoadProvider } from "contexts/Page Loader/PageLoader";
import { SocketProvider } from "contexts/Socket/Socket";
import UserProvider from "contexts/User";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ThemeProvider } from "styled-components";
import { GLOBAL_THEME } from "styles/theme";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ThemeProvider theme={GLOBAL_THEME}>
      <CompanySocketObjectsProvider>
        <AgentSocketObjectsProvider>
          <UserProvider>
            <SocketProvider>
              <PageLoadProvider>
                <AlertProvider>
                  <CallingCallProvider>
                    {getLayout(<Component {...pageProps} />)}
                  </CallingCallProvider>
                </AlertProvider>
              </PageLoadProvider>
            </SocketProvider>
          </UserProvider>
        </AgentSocketObjectsProvider>
      </CompanySocketObjectsProvider>
    </ThemeProvider>
  );
}
