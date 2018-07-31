import React, { Component } from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';

import { Container, Header, Input, Button, Message } from 'semantic-ui-react';

import { REGISTER_USER } from '../queries/user';

import formatApiErrors from '../helpers/formatApiErrors';
import validate from '../validation/register';

const Register = ({ history }) => (
	<Mutation mutation={REGISTER_USER}>
		{register => (
			<Formik
				initialValues={{
					username: '',
					email: '',
					password: '',
					passwordConf: '',
				}}
				validate={validate}
				onSubmit={async (values, { setSubmitting, setErrors }) => {
					const response = await register({ variables: values });

					setSubmitting(false);

					const { success, errors } = response.data.register;

					if (success) {
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
						<form onSubmit={handleSubmit}>
							<Header as="h2">Register</Header>
							<Input
								fluid
								placeholder="username"
								name="username"
								value={values.username}
								onChange={handleChange}
								onBlur={handleBlur}
								error={!!(touched.username && errors.username)}
							/>
							<Input
								fluid
								type="email"
								placeholder="email"
								name="email"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								error={!!(touched.email && errors.email)}
							/>
							<Input
								fluid
								type="password"
								name="password"
								placeholder="password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								error={!!(touched.password && errors.password)}
							/>
							<Input
								fluid
								type="password"
								name="passwordConf"
								placeholder="confirm password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.passwordConf}
								error={!!(touched.passwordConf && errors.passwordConf)}
							/>
							<Button type="submit" disabled={isSubmitting}>
								Submit
							</Button>
							{(errors.username ||
								errors.email ||
								errors.password ||
								errors.passwordConf) && (
								<Message
									error
									header="There was some errors with your registration"
									list={Object.values(errors).map(msg => msg)}
								/>
							)}
						</form>
					</Container>
				)}
			/>
		)}
	</Mutation>
);

export default Register;
