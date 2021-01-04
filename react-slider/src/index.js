import React from 'react';
import ReactDom from 'react-dom';
import Slider from './Slider';
import DoubleSlider from './DoubleSlider';

ReactDom.render(
	<Slider
		min={100}
		max={1500}
		value={1500}
		onChange={(value) => console.log(value)}
	/>,
	document.querySelector('#slider')
);

ReactDom.render(
	<DoubleSlider
		min={100}
		max={1800}
		startValue={900}
		endValue={1600}
		onChange={(startValue, endValue) => console.log(startValue, endValue)}
	/>,
	document.querySelector('#double-slider')
);