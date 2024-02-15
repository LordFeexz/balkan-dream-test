import { useState, useEffect } from "react";
import type { EmployeeStatistic } from "../../../interfaces/report";
import { getStatistic } from "../../../actions/report";
import { PieChart } from "react-minimal-pie-chart";
import { getRandomColor } from "../../../helpers/global";
import type { BaseDataEntry } from "../../../interfaces";
import PercentageInfo from "../../atom/content/percentageInfo";
import InfoChart from "../../atom/content/infoChart";
import { useLocation, useNavigate } from "react-router-dom";

export default function EmployeeStatistic() {
  const navigate = useNavigate();
  const [statistic, setStatistic] = useState<EmployeeStatistic | null>(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const month = Number(query.get("month"));
  const year = Number(query.get("year"));

  useEffect(() => {
    if (!month || !year) {
      navigate(`/reports/details?err=${"invalid date"}`);
      return;
    }

    if (!statistic)
      (async () => {
        setStatistic(await getStatistic(month, year));
      })();
  }, [statistic]);

  const role: BaseDataEntry[] | null =
    statistic?.rolePrecentage.map((el) => ({
      title: el._id,
      value: el.total,
      key: el._id,
      color: getRandomColor(),
    })) ?? null;

  const activeEmployee: BaseDataEntry[] | null =
    statistic?.activeEmployeePrecentage.map((emp) => ({
      title: emp._id,
      value: emp.total,
      key: emp._id,
      color: getRandomColor(),
    })) ?? null;

  const gender: BaseDataEntry[] | null =
    statistic?.genderPrecentage.map((el) => ({
      title: el._id,
      value: el.total,
      key: el._id,
      color: getRandomColor(),
    })) ?? null;

  const age: BaseDataEntry[] | null =
    statistic?.agePrecentage.map((el) => ({
      title: el._id,
      value: el.total,
      key: el._id,
      color: getRandomColor(),
    })) ?? null;

  const salary: BaseDataEntry[] | null =
    statistic?.salaryPercentage.map((el) => ({
      title: el._id,
      value: el.total,
      key: el._id,
      color: getRandomColor(),
    })) ?? null;

  return (
    <>
      {!!statistic && (
        <>
          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <h6>
                {" "}
                Total number of employees{" "}
                <i className={`fa fa-long-arrow-right`} />
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#3291b6",
                    fontWeight: "bold",
                    letterSpacing: "3px",
                    fontSize: "2rem",
                  }}
                >
                  {" "}
                  {activeEmployee?.reduce((acc, curr) => curr.value + acc, 0)}
                </span>
              </h6>
            </div>
          </div>

          <PercentageInfo title="Male vs. Female Ratio">
            {gender?.map((el) => (
              <InfoChart
                key={el.key}
                color={el.color}
                keyInfo={el.key?.toString() as string}
                info={`${
                  (el.value /
                    statistic.genderPrecentage.reduce(
                      (acc, curr) => curr.total + acc,
                      0
                    )) *
                  100
                } %`}
              />
            ))}
            <PieChart data={gender ?? []} paddingAngle={1} animate />
          </PercentageInfo>

          <PercentageInfo title=" Active vs. Inactive Stats">
            {activeEmployee?.map((el) => (
              <InfoChart
                key={el.key}
                color={el.color}
                keyInfo={el.key?.toString() as string}
                info={`${
                  (el.value /
                    statistic.activeEmployeePrecentage.reduce(
                      (acc, curr) => curr.total + acc,
                      0
                    )) *
                  100
                } %`}
              />
            ))}
            <PieChart data={activeEmployee ?? []} paddingAngle={1} animate />
          </PercentageInfo>

          <PercentageInfo title="Position Statistics">
            {role?.map((el) => (
              <InfoChart
                key={el.key}
                color={el.color}
                keyInfo={el.key?.toString() as string}
                info={`${
                  (el.value /
                    statistic.rolePrecentage.reduce(
                      (acc, curr) => curr.total + acc,
                      0
                    )) *
                  100
                } %`}
              />
            ))}
            <PieChart data={role ?? []} paddingAngle={1} animate />
          </PercentageInfo>

          <PercentageInfo title="Age Statistics">
            {age?.map((el) => (
              <InfoChart
                key={el.key}
                color={el.color}
                keyInfo={Math.ceil(
                  new Date().getFullYear() - (el.key as number)
                ).toString()}
                info={`${
                  (el.value /
                    statistic.agePrecentage.reduce(
                      (acc, curr) => curr.total + acc,
                      0
                    )) *
                  100
                } %`}
              />
            ))}
            <PieChart data={age ?? []} paddingAngle={1} animate />
          </PercentageInfo>

          <PercentageInfo title="Salary Percentage">
            {salary?.map((el) => (
              <InfoChart
                key={el.key}
                color={el.color}
                keyInfo={el.key?.toString() as string}
                info={`${
                  (el.value /
                    statistic.salaryPercentage.reduce(
                      (acc, curr) => curr.total + acc,
                      0
                    )) *
                  100
                } %`}
              />
            ))}
            <PieChart data={salary ?? []} paddingAngle={1} animate />
          </PercentageInfo>
        </>
      )}
    </>
  );
}
