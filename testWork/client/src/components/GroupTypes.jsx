import React from "react";
import { getTypesInMonth } from "../selectors/index";
import { useSelector } from "react-redux";

const GroupTypes = () => {
  const types = useSelector(state => getTypesInMonth(state))
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
