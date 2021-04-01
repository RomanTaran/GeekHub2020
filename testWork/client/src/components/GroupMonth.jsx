import React from "react";
import { useSelector } from "react-redux";
import { getTotalInMonth } from "../selectors/index";

const GroupMonth = () => {
  const months = useSelector(state => getTotalInMonth(state))
  return (
    <table className="table table-bordered">
      <thead>
      <tr>
        <th>Месяц</th>
        <th>Сумма</th>
        <th>Разница</th>
      </tr>
      </thead>
      <tbody>
      {months.map((row, index) => {
        return (
          <tr key={index}>
            <td>{row.month}</td>
            <td>{row.sum}</td>
            <td>{row.diff}</td>
          </tr>
        );
      })}
      </tbody>
    </table>
  )
}

export default GroupMonth;
