import React, { Component } from 'react';

class RenderText extends Component {
	state = {
		text: '',
	};

	componentDidMount = async () => {
		const response = await fetch(this.props.url);
		const text = await response.text();
		this.setState({ text });
	};

	render() {
		const { text } = this.state;

		return (
			<div>
				<div>-----</div>
				<p>{text}</p>
				<div>-----</div>
			</div>
		);
	}
}

export default RenderText;
