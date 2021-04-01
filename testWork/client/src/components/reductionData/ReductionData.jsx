import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatesList from "./DatesList";
import { addDate, deleteDate, editDate, getDate } from "../../store/dateSlice";

class ReductionData extends Component {

  componentDidMount() {
    this.props.getDate();
  }

  addDate = () => {
    this.props.addDate({date: '', reduct: ''});
  }

  deleteDate = (_id) => {
    let r = window.confirm("Вы точно хотите удалить эту запись?");
    if (r === true) {
      this.props.deleteDate(_id);
    }
  }

  editDateSubmit = (_id, date, reduct) => {
    this.props.editDate({
      _id: _id,
      date: date,
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
                Сокращения для даты
              </div>
              <div className="card-body">
                <table className="table table-hover">
                  <thead className="thead-dark">
                  <tr>
                    <th>Дата</th>
                    <th>Сокращение</th>
                    <th>Edit/Save</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <DatesList
                    deleteDate={this.deleteDate}
                    datesList={this.props.dates}
                    editDateSubmit={this.editDateSubmit}/>
                </table>
                <button className="btn btn-dark pull-left" onClick={this.addDate}>Add New</button>
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
    dates: state.dates
  }
}

export default connect(mapStateToProps, {getDate, addDate, editDate, deleteDate})(ReductionData);
