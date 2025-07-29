import { createContext, useContext, useState } from "react";

const PageLoader = createContext();

export const usePageLoader = () => useContext(PageLoader);

export const PageLoadProvider = ({ children }) => {
  const [pageLoading, setPageLoading] = useState(false);

  return (
    <PageLoader.Provider value={{ pageLoading, setPageLoading }}>
      {children}
    </PageLoader.Provider>
  );
};
