import React, { Component } from 'react';
import Type from "./Type";


export default class TypesList extends Component {
  render() {
    let types = this.props.typesList;
    const trItem = types.map((item, index) =>
      <Type
        key={index}
        type={item}
        index={index}
        editTypeSubmit={this.props.editTypeSubmit}
        deleteType={this.props.deleteType}
      />)
    return (
      <tbody>{trItem}</tbody>
    );
  }
}
