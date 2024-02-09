import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";
import { TabSalaryContext } from "../interfaces/context";
import { profileTabItems } from "../constant/tabs";

export type ContextValue = TabSalaryContext & {
  setDisplayData: Dispatch<SetStateAction<TabSalaryContext>>;
};

export const context = createContext<ContextValue>({} as ContextValue);

export interface SalaryWrapperProps {
  children: ReactNode;
}

export default function SalaryWrapper({ children }: SalaryWrapperProps) {
  const [displayData, setDisplayData] = useState<TabSalaryContext>({
    activeTab: profileTabItems[0],
  });

  return (
    <context.Provider value={{ ...displayData, setDisplayData }}>
      {children}
    </context.Provider>
  );
}
