import React, { Component } from 'react';

import { Container, Header, Input, Button } from 'semantic-ui-react';

class Register extends Component {
	state = {
		username: '',
		email: '',
		password: '',
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = () => {};

	render() {
		const { username, email, password } = this.state;

		return (
			<Container text>
				<Header as="h2">Register</Header>
				<Input
					fluid
					placeholder="username"
					name="username"
					value={username}
					onChange={this.handleChange}
				/>
				<Input
					fluid
					placeholder="email"
					name="email"
					value={email}
					onChange={this.handleChange}
				/>
				<Input
					fluid
					placeholder="password"
					name="password"
					type="password"
					value={password}
					onChange={this.handleChange}
				/>
				<Button type="submit" onClick={this.handleSubmit}>
					Submit
				</Button>
			</Container>
		);
	}
}

export default Register;
