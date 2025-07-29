import AlertDialog from "shared/AlertDialog";
import { GLOBAL_THEME } from "styles/theme";

const { useContext, createContext, useState } = require("react");

const AlertContext = createContext({});

const AlertProvider = ({ children }) => {
  const types = {
    erro: {
      background: GLOBAL_THEME.colors.alerts.error.bg,
      text: GLOBAL_THEME.colors.alerts.error.text,
      icon: GLOBAL_THEME.colors.alerts.error.icon,
    },
    sucesso: {
      background: GLOBAL_THEME.colors.alerts.success.bg,
      text: GLOBAL_THEME.colors.alerts.success.text,
      icon: GLOBAL_THEME.colors.alerts.success.icon,
    },
  };

  const [content, setContent] = useState({
    message: "",
    type: "",
    isOpen: false,
  });

  const colorScheme = types[content.type];

  const { isOpen } = content;

  return (
    <AlertContext.Provider value={{ setContent }}>
      {children}
      {isOpen && (
        <AlertDialog
          content={content}
          isOpen={isOpen}
          colorScheme={colorScheme}
        />
      )}
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context)
    throw new Error("useAlert must be used within an Alert Provider.");

  return context;
};

export { AlertProvider, AlertContext, useAlert };
