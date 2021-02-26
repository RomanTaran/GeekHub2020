import * as types from '../constants/ActionTypes'
import superagent from "superagent"

const BASE_URL = 'http://localhost:8000/api/'

export const getTodos = () => {
  return dispatch => {
    return superagent
      .get(`${BASE_URL}`)
      .end((err, res) => {
        if (err) {
          dispatch({type: types.GET_TODOS, data: []})
        } else {
          dispatch({type: types.GET_TODOS, data: JSON.parse(res.text)})
        }
      })
  }
}

export const addTodo = text => {
  return dispatch => {
    return superagent
      .post(`${BASE_URL}todo`)
      .send({_id: Math.random(), text: text, completed: false})
      .set('Accept', 'application/json')
      .end((err, res) => {
        dispatch({
          type: types.ADD_TODO, _id: Math.random(), text: text,
          completed: false
        })
      })
  }
}

export const deleteTodo = ({_id}) => {
  return dispatch => {
    return superagent
      .delete(`${BASE_URL}/todo/${_id}`)
      .send({_id: _id})
      .set('Accept', 'application/json')
      .end((err, res) => {
        dispatch({type: types.DELETE_TODO, _id})
      })
  }
}

export const editTodo = (todo) => {
  return dispatch => {
    return superagent
      .put(`${BASE_URL}/todo/${todo._id}`)
      .send(todo)
      .set('Accept', 'application/json')
      .end((err, res) => {
        dispatch({type: types.EDIT_TODO, _id: todo._id, text: todo.text})
      })
  }
}

export const completeTodo = (id, state) => {
  return dispatch => {
    return superagent
      .put(`${BASE_URL}/todo/complete/${id}`)
      .send({_id: id, completed: state})
      .end((err, res) => dispatch({type: types.COMPLETE_TODO, _id: id, completed: state}))
  }
}

export const clearCompleted = () => {
  return dispatch => {
    return superagent
      .delete(`${BASE_URL}/todo/complete/all`)
      .send({id: 123})
      .end((err, res) => dispatch({type: types.CLEAR_COMPLETED}))
  }
}
/*
export const clearCompleted = () => {
  return dispatch => {
    return superagent
      .put(`${BASE_URL}/todo/clearcompleted`)
      .end((err, res) => dispatch({type: types.CLEAR_COMPLETED}))
  }
}*/
