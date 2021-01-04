import React from 'react';
import styled from 'styled-components';

export default class Slider extends React.PureComponent {
  state = {
    x: this.props.min,
    value: this.props.min,
  };

  startX = this.props.min;
  firstX = 0;

  onDragStart = (e) => {
    this.firstX = e.clientX;

    document.body.addEventListener('mousemove', this.onDrag);
    document.body.addEventListener('mouseup', this.onDragEnd);
  }
  onDrag = (e) => {
    let x = Math.max(Math.min(this.startX + e.clientX - this.firstX, this.props.max), this.props.min)
    this.setState({
      x: x,
      value: x
    })
  }
  onDragEnd = () => {
    this.startX = this.state.x;
    document.body.removeEventListener('mousemove', this.onDrag);
    document.body.removeEventListener('mouseup', this.onDragEnd);
  }
  inputChange = (e) => {
    let val = Math.max(Math.min(e.target.value, this.props.max), this.props.min);
    this.setState({
      x: val,
      value: e.target.value
    })
  }

  render() {
    const {x, value} = this.state;
    const {min, max} = this.props;
    return (
      <Root>
        <input
          type='number'
          min={min}
          max={max}
          value={value}
          onChange={this.inputChange}
        />
        <Bar x={x}>
          <Handler
            x={x}
            onMouseDown={this.onDragStart}
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
  background: linear-gradient(to right, green ${p=>p.x}px, red ${p=>p.x}px);
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