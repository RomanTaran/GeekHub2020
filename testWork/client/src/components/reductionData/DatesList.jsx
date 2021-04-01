import React, { Component } from 'react';
import Date from "./Date";


export default class DatesList extends Component {
  render() {
    let dates = this.props.datesList;
    const trItem = dates.map((item, index) =>
      <Date
        key={index}
        date={item}
        index={index}
        editDateSubmit={this.props.editDateSubmit}
        deleteDate={this.props.deleteDate}/>)
    return (
      <tbody>{trItem}</tbody>
    );
  }
}
