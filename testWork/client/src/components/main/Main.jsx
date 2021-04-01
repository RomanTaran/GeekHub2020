import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGood, deleteGood, editGood, getGoods } from "../../store/goodsSlice";
import GoodsList from "./GoodsList";
import { Input } from "@material-ui/core";
import { getAllGoods } from "../../selectors/index";

class Main extends Component {
  state = {
    text: ''
  }

  componentDidMount() {
    this.props.getGoods();
  }

  addGood = () => {
    this.props.addGood(this.state.text);
    this.setState({text: ''});

  }

  deleteGood = (_id) => {
    let r = window.confirm("Вы точно хотите удалить эту запись?");
    if (r === true) {
      this.props.deleteGood(_id);
    }
  }

  editGoodSubmit = (_id, date, type, sum, comment) => {
    this.props.editGood({
      _id: _id,
      date: date,
      type: type,
      sum: sum,
      comment: comment
    });
  }
  handleChange = (e) => {
    this.setState({text: e.target.value})
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                Список расходов
              </div>
              <div className="card-body">
                <table className="table table-hover">
                  <thead className="thead-dark">
                  <tr>
                    <th>Дата</th>
                    <th>Тип</th>
                    <th>Сумма</th>
                    <th>Комментарий</th>
                    <th>Edit/Save</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <GoodsList
                    deleteGood={this.deleteGood}
                    goodsList={this.props.goods}
                    editGoodSubmit={this.editGoodSubmit}/>
                </table>
                <Input
                  value={this.state.text}
                  placeholder="Введите новый пункт"
                  inputProps={{'aria-label': 'description'}}
                  onChange={this.handleChange}
                />
                <button className="btn btn-dark pull-left" onClick={this.addGood}>ДОБАВИТЬ</button>
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
    goods: getAllGoods(state)
  }
}

export default connect(mapStateToProps, {getGoods, addGood, editGood, deleteGood})(Main);
