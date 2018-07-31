import React from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';

import {
	Container,
	Header,
	Form,
	Input,
	Button,
	Message,
} from 'semantic-ui-react';

import { LOGIN_USER } from '../queries/user';

import formatApiErrors from '../helpers/formatApiErrors';
import validate from '../validation/login';

const Login = ({ history }) => (
	<Mutation mutation={LOGIN_USER}>
		{login => (
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validate={validate}
				onSubmit={async (values, { setSubmitting, setErrors }) => {
					const response = await login({ variables: values });

					setSubmitting(false);

					const { success, token, refreshToken, errors } = response.data.login;

					if (success) {
						localStorage.setItem('token', token);
						localStorage.setItem('refreshToken', refreshToken);
						return history.push('/');
					}

					setErrors(formatApiErrors(errors));
				}}
				render={({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<Container text>
						<Form onSubmit={handleSubmit}>
							<Header as="h2">Login</Header>
							<Form.Field error={!!(touched.email && errors.email)}>
								<Input
									fluid
									type="email"
									placeholder="email"
									name="email"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</Form.Field>
							<Form.Field error={!!(touched.password && errors.password)}>
								<Input
									fluid
									type="password"
									name="password"
									placeholder="password"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
								/>
							</Form.Field>
							<Button type="submit" disabled={isSubmitting}>
								Submit
							</Button>
						</Form>
						{(errors.email || errors.password) && (
							<Message
								error
								header="There was some errors with your login"
								list={Object.values(errors).map(msg => msg)}
							/>
						)}
					</Container>
				)}
			/>
		)}
	</Mutation>
);

export default Login;
