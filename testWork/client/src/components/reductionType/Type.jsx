import React, { Component } from 'react';

export default class Type extends Component {
  state = {
    isEdit: false
  }

  deleteType = () => {
    const {_id} = this.props.type;
    this.props.deleteType(_id);
  }

  editType = () => {
    this.setState((prevState, props) => ({
      isEdit: !prevState.isEdit
    }))
  }

  editTypeSubmit = () => {
    this.setState((prevState, props) => ({
      isEdit: !prevState.isEdit
    }));
    this.props.editTypeSubmit(
      this.props.type._id,
      this.typeInput.value,
      this.reductInput.value
    );
  }

  render() {
    const {type, reduct} = this.props.type;
    return (
      this.state.isEdit === true ?
        <tr
          className="bg-warning"
          key={this.props.index}>
          <td><input ref={typeInput => this.typeInput = typeInput} defaultValue={type}/></td>
          <td><input ref={reductInput => this.reductInput = reductInput} defaultValue={reduct}/></td>
          <td><i className="far fa-save" onClick={this.editTypeSubmit}></i></td>
          <td><i className="fas fa-trash"></i></td>
        </tr>
        :
        <tr key={this.props.index}>
          <td>{type}</td>
          <td>{reduct}</td>
          <td><i className="far fa-edit" onClick={this.editType}></i></td>
          <td><i className="fas fa-trash" onClick={this.deleteType}></i></td>
        </tr>
    );
  }
}
