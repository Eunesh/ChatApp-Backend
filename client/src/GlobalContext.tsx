import { createContext } from "react";
import { createConsumer } from "@rails/actioncable";

const CableApp: { cable: ReturnType<typeof createConsumer> } = {
  cable: createConsumer("ws://localhost:3001/chats"),
};

export const GlobalContext = createContext<any>({});
const GlobalContextProvider = ({ children }: any) => {
  return (
    <GlobalContext.Provider value={{ cable: CableApp.cable }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
