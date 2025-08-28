import { AuthenticationService } from "services/authentication";
import { decryptWithCypher, encryptWithCypher } from "utils/encryption";
import { formatColorSchemeFromBackend } from "utils/formatter";
import { deleteValueInCookies, getValueFromCookies } from "utils/storage";

const { createContext, useContext, useState, useEffect } = require("react");

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) return;
    const fetchUserData = async () => {
      try {
        const encryptedToken = await getValueFromCookies("t");
        const token = decryptWithCypher(encryptedToken);
        let user = await AuthenticationService.getuserData(token);

        user.colorScheme = formatColorSchemeFromBackend(user.colorScheme);
        setUser(user);
      } catch (error) {
        setUser(false);
      }
    };

    fetchUserData();
  }, []);
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("useUser must be used within an User Provider.");

  return context;
};

export { UserContext, UserProvider, useUser };
