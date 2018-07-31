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

import { CREATE_TEAM } from '../queries/team';

import formatApiErrors from '../helpers/formatApiErrors';
import validate from '../validation/createTeam';

const CreateTeam = ({ history }) => (
	<Mutation mutation={CREATE_TEAM}>
		{createTeam => (
			<Formik
				initialValues={{
					name: '',
				}}
				validate={validate}
				onSubmit={async (values, { setSubmitting, setErrors }) => {
					const response = await createTeam({ variables: values });

					setSubmitting(false);

					const { success, errors } = response.data.createTeam;

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
						<Form onSubmit={handleSubmit}>
							<Header as="h2">Create Team</Header>
							<Form.Field error={!!(touched.name && errors.name)}>
								<Input
									fluid
									type="text"
									placeholder="name"
									name="name"
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</Form.Field>
							<Button type="submit" disabled={isSubmitting}>
								Submit
							</Button>
						</Form>
						{errors.name && (
							<Message
								error
								header="There was some errors with creating newteam"
								list={Object.values(errors).map(msg => msg)}
							/>
						)}
					</Container>
				)}
			/>
		)}
	</Mutation>
);

export default CreateTeam;
