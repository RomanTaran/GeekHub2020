import React, { Component } from 'react';

export default class GoodItem extends Component {
  state = {
    isEdit: false
  }

  deleteGood = () => {
    const {_id} = this.props.good;
    this.props.deleteGood(_id);
  }

  editGood = () => {
    this.setState((prevState, props) => ({
      isEdit: !prevState.isEdit
    }))
  }

  editGoodSubmit = () => {
    this.setState((prevState, props) => ({
      isEdit: !prevState.isEdit
    }));
    this.props.editGoodSubmit(
      this.props.good._id,
      this.dateInput.value,
      this.typeInput.value,
      this.sumInput.value,
      this.commentsInput.value
    );
  }

  render() {
    const {date, type, sum, comment} = this.props.good;
    return (
      this.state.isEdit === true ?
        <tr
          className="bg-warning"
          key={this.props.index}>
          <td><input ref={dateInput => this.dateInput = dateInput} defaultValue={date}/></td>
          <td><input ref={typeInput => this.typeInput = typeInput} defaultValue={type}/></td>
          <td><input ref={sumInput => this.sumInput = sumInput} defaultValue={sum}/></td>
          <td><input ref={commentsInput => this.commentsInput = commentsInput} defaultValue={comment}/></td>
          <td><i className="far fa-save" onClick={this.editGoodSubmit}></i></td>
          <td><i className="fas fa-trash"></i></td>
        </tr>
        :
        <tr key={this.props.index}>
          <td>{date}</td>
          <td>{type}</td>
          <td>{sum}</td>
          <td>{comment}</td>
          <td><i className="far fa-edit" onClick={this.editGood}></i></td>
          <td><i className="fas fa-trash" onClick={this.deleteGood}></i></td>
        </tr>
    );
  }
}
