import React, { Component } from 'react';

export default class Date extends Component {
  state = {
    isEdit: false
  }

  deleteDate = () => {
    const {_id} = this.props.date;
    this.props.deleteDate(_id);
  }

  editDate = () => {
    this.setState((prevState, props) => ({
      isEdit: !prevState.isEdit
    }))
  }

  editDateSubmit = () => {
    this.setState((prevState, props) => ({
      isEdit: !prevState.isEdit
    }));
    this.props.editDateSubmit(
      this.props.date._id,
      this.dateInput.value,
      this.reductInput.value
    );
  }

  render() {
    const {date, reduct} = this.props.date;
    return (
      this.state.isEdit === true ?
        <tr
          className="bg-warning"
          key={this.props.index}>
          <td>
            <input
              ref={dateInput => this.dateInput = dateInput}
              defaultValue={date}
              title="Разрешен ввод таких дат: сегодня,вчера, понедельник, вторник, среда, четверг, пятница, суббота, воскресенье"
            />
          </td>
          <td>
            <input
              ref={reductInput => this.reductInput = reductInput}
              defaultValue={reduct}
              title="Разрешен ввод только одного сокращения"
            /></td>
          <td><i className="far fa-save" onClick={this.editDateSubmit}></i></td>
          <td><i className="fas fa-trash"></i></td>
        </tr>
        :
        <tr key={this.props.index}>
          <td>{date}</td>
          <td>{reduct}</td>
          <td><i className="far fa-edit" onClick={this.editDate}></i></td>
          <td><i className="fas fa-trash" onClick={this.deleteDate}></i></td>
        </tr>
    );
  }
}
