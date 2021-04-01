import React, { Component } from 'react';
import GoodItem from "./GoodItem";


export default class GoodsList extends Component {
  render() {
    let goods = this.props.goodsList;
    const trItem = goods.map((item, index) =>
      <GoodItem
        key={index}
        good={item}
        index={index}
        editGoodSubmit={this.props.editGoodSubmit}
        deleteGood={this.props.deleteGood}
      />
    )
    return (
      <tbody>{trItem}</tbody>
    );
  }
}
