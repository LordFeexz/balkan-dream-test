import { useContext } from "react";
import { profileTabItems } from "../../../constant/tabs";
import { context } from "../../../context/salaryContext";
import type { ProfileTabItem } from "../../../interfaces";

export default function SalaryTab() {
  const { setDisplayData } = useContext(context);

  const onClick = (id: number) => {
    setDisplayData((prev) => ({
      ...prev,
      activeTab: profileTabItems.find((el) => el.id === id) as ProfileTabItem,
    }));
  };
  return (
    <>
      {profileTabItems.map((item) => (
        <li
          onClick={() => {
            onClick(item.id);
          }}
          key={item.id}
          className={`${item.active ? "active" : ""}`}
        >
          <a data-toggle="tab" className="btn">
            {item.name}
          </a>
        </li>
      ))}
    </>
  );
}
