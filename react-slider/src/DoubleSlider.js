import React from 'react';
import styled from 'styled-components';

export default class DoubleSlider extends React.PureComponent {
  state = {
    x1: this.props.min,
    x2: this.props.min + 150,
    value1: this.props.min,
    value2: this.props.min + 150
  };

  startX1 = this.props.min;
  startX2 = this.props.min + 150;
  firstX1 = 0;
  firstX2 = 0;

  onDragStart1 = (e) => {
    this.firstX1 = e.clientX;
    document.body.addEventListener('mousemove', this.onDrag1);
    document.body.addEventListener('mouseup', this.onDragEnd1);
  }

  onDrag1 = (e) => {
    let x = Math.max(Math.min(this.startX1 + e.clientX - this.firstX1, this.state.x2 - 5), this.props.min);
    this.setState({
      x1: x,
      value1: x
    })
  }
  onDragEnd1 = () => {
    this.startX1 = this.state.x1;
    document.body.removeEventListener('mousemove', this.onDrag1);
    document.body.removeEventListener('mouseup', this.onDragEnd1);
  }

  onDragStart2 = (e) => {
    this.firstX2 = e.clientX;
    document.body.addEventListener('mousemove', this.onDrag2);
    document.body.addEventListener('mouseup', this.onDragEnd2);
  }
  onDrag2 = (e) => {
    let x = Math.max(Math.min(this.startX2 + e.clientX - this.firstX2, this.props.max), this.state.x1 + 5);
    this.setState({
      x2: x,
      value2: x
    })
  }
  onDragEnd2 = () => {
    this.startX2 = this.state.x2;
    document.body.removeEventListener('mousemove', this.onDrag2);
    document.body.removeEventListener('mouseup', this.onDragEnd2);
  }
  inputChange1 = (e) => {
    let val = Math.max(Math.min(e.target.value, this.state.x2 - 5), this.props.min);
    this.setState({
      x1: val,
      value1: e.target.value
    })
  }
  inputChange2 = (e) => {
    let val = Math.max(Math.min(e.target.value, this.props.max), this.state.x1 + 5);
    this.setState({
      x2: val,
      value2: e.target.value
    })
  }

  render() {
    const {x1, x2, value1, value2} = this.state;
    const {min, max} = this.props;
    return (
      <Root>
        <input
          type='number'
          min={min}
          value={value1}
          onChange={this.inputChange1}
        />
        <input
          type='number'
          max={max}
          value={value2}
          onChange={this.inputChange2}
        />

        <Bar
          x1={x1}
          x2={x2}
        >
          <Handler
            x={x1}
            onMouseDown={this.onDragStart1}
          />
          <Handler
            x={x2}
            onMouseDown={this.onDragStart2}
          />
        </Bar>
      </Root>
    );
  }
}


//region ====================== Styles ========================================

const Root = styled.div`
  padding: 10px 0;
`;

const Bar = styled.div`
  position: relative;
  height: 2px;
  background: linear-gradient(to right, green ${p => p.x1}px, red ${p => p.x1}px, red ${p => p.x2}px, green ${p => p.x2}px);
  margin-top: 10px;
`;

const Handler = styled.div.attrs(props => ({
  style: {
    left: props.x + 'px',
  },
}))`
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: red;
  top: -4px;
`;

//endregion