import { createContext, useContext } from "react";

const GroupContext = createContext(null);

export const GroupProvider = ({ groupService, children }) => {
  return (
    <GroupContext.Provider value={groupService}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGorupService = () => useContext(GroupContext);
