import { ChevronRight, Info } from "react-feather";
import { profileTabItems } from "../../../constant/tabs";
import type { Dispatch, SetStateAction } from "react";

export interface EmployeeTabsProps {
  items: typeof profileTabItems;
  setItems: Dispatch<SetStateAction<typeof profileTabItems>>;
}

export default function EmployeeTabs({ items, setItems }: EmployeeTabsProps) {
  const onClick = (id: number) => {
    setItems((prev) =>
      prev
        .map((el) => ({ ...el, active: false }))
        .map((el) => (el.id === id ? { ...el, active: true } : el))
    );
  };
  return (
    <>
      {items.map((item) => (
        <a
          className={`list-group-item ${item.active ? "selectedTab" : ""}`}
          key={item.id}
          onClick={() => {
            onClick(item.id);
          }}
        >
          <Info size="18" /> &nbsp;&nbsp;
          {item.name}
          <ChevronRight size="18" />
        </a>
      ))}
    </>
  );
}
