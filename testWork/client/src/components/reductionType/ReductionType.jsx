import React, { Component } from 'react';
import { connect } from 'react-redux';
import TypesList from "./TypesList";
import { addType, deleteType, editType, getType } from "../../store/typesSlice";

class ReductionType extends Component {

  componentDidMount() {
    this.props.getType();
  }

  addType = () => {
    this.props.addType({type: '', reduct: ''});
  }

  deleteType = (_id) => {
    let r = window.confirm("Вы точно хотите удалить эту запись?");
    if (r === true) {
      this.props.deleteType(_id);
    }
  }

  editTypeSubmit = (_id, type, reduct) => {
    this.props.editType({
      _id: _id,
      type: type,
      reduct: reduct
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                Сокращения для типов трат
              </div>
              <div className="card-body">
                <table className="table table-hover">
                  <thead className="thead-dark">
                  <tr>
                    <th>Тип</th>
                    <th>Сокращение</th>
                    <th>Edit/Save</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <TypesList
                    deleteType={this.deleteType}
                    typesList={this.props.types}
                    editTypeSubmit={this.editTypeSubmit}/>
                </table>
                <button className="btn btn-dark pull-left" onClick={this.addType}>Add New</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    types: state.types
  }
}

export default connect(mapStateToProps, {getType, addType, editType, deleteType})(ReductionType);
