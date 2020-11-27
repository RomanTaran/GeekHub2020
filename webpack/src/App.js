import React, {PureComponent} from 'react';

export default class App extends PureComponent {
	render() {
		const data = [
			['asd', 'qwe'],
			['yui', 'dfg'],
			['yui', 'dfg'],
		];

		const table = data.map((element,index)=>
			<tr key={index}>
				{element.map((item, i) =>
					<td key={i}>{item}</td>
				)}
			</tr>);

		return (
			<table>
				<tbody>
				{table}
				</tbody>
			</table>
		);
	}
}