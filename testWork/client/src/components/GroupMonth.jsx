import React from "react";
import { useTotalInMonth } from "../hooks";


const GroupMonth = () => {
  const months = useTotalInMonth();
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
