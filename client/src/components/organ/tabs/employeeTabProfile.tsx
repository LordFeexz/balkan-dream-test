import { profileTabItems } from "../../../constant/tabs";
import type { ProfileTabItem } from "../../../interfaces";
import EmployeeTabs from "../../atom/tabs/employeeTabs";
import { useState } from "react";
import EmployeeTabContent from "../../mollecul/content/employeeTab";

export default function EmployeeTabsProfile() {
  const [items, setItems] = useState<ProfileTabItem[]>(profileTabItems);

  const getActiveItem = () =>
    items.find(({ active }) => active) as ProfileTabItem;
  return (
    <>
      <div className="col-md-4">
        <div className="list-group">
          <EmployeeTabs items={items} setItems={setItems} />
        </div>
      </div>
      <EmployeeTabContent activeTab={getActiveItem()} />
    </>
  );
}
