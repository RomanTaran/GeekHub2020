import React from "react";
import { useTypesInMonth } from "../hooks";

const GroupTypes = () => {
  const types = useTypesInMonth();
  return (
    <table className="table table-bordered">
      <thead>
      <tr>
        <th>Тип</th>
        <th>Сумма</th>
        <th>Разница</th>
      </tr>
      </thead>
      <tbody>
      {types.map((row, index) => {
        return (
          <tr key={index}>
            <td>{row.type}</td>
            <td>{row.sum}</td>
            <td>{row.diff}</td>
          </tr>
        );
      })}
      </tbody>
    </table>
  )
}

export default GroupTypes;
