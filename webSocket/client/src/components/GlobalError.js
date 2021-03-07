import React from 'react'
import { connect } from "react-redux";
import {resetError} from "../reducers/todosSlice"
import CloseIcon from '@material-ui/icons/Close';

class GlobalError extends React.Component {
  handleResetError = ()=>{
    this.props.resetError();
  }

  render() {
    if (!this.props.error) return null

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          fontSize: 20,
          transform: 'translateX(-50%)',
          padding: 10,
          backgroundColor: '#ffcccc',
          boxShadow: '0 3px 25px -10px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {this.props.error}
        &nbsp;
        <CloseIcon
          className="material-icons"
          style={{cursor: 'pointer'}}
          onClick={this.handleResetError}
        >
          close
        </CloseIcon>
      </div>
    )
  }
}
const mapStateToProps = state =>state.todoReducer;

export default connect(mapStateToProps,{resetError})(GlobalError);