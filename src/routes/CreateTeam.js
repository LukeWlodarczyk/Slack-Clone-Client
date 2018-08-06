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
// import { AUTH_USER } from '../queries/user';

import formatApiErrors from '../helpers/formatApiErrors';
import validate from '../validation/createTeam';

// const update = (store, { data: { createTeam } }) => {
// 	const { team, success } = createTeam;
//
// 	if (!success) {
// 		return;
// 	}
//
// 	const data = store.readQuery({ query: AUTH_USER });
//
// 	const newData = JSON.parse(JSON.stringify(data));
//
// 	newData.getAuthUser.teams.push(team);
//
// 	store.writeQuery({ query: AUTH_USER, data: newData });
// };

const CreateTeam = ({ history }) => (
	<Mutation mutation={CREATE_TEAM} /*update={update} */>
		{createTeam => (
			<Formik
				initialValues={{
					name: '',
				}}
				validate={validate}
				onSubmit={async (values, { setSubmitting, setErrors }) => {
					let response = null;
					try {
						response = await createTeam({
							variables: values,
							optimisticResponse: {
								createTeam: {
									__typename: 'Mutation',
									success: true,
									team: {
										__typename: 'Team',
										id: -1,
										name: values.name,
										channels: [
											{
												__typename: 'Channel',
												id: -1,
												name: 'General',
											},
										],
									},
									errors: null,
								},
							},
						});
					} catch (err) {
						return history.push('/login');
					}

					setSubmitting(false);

					const { success, team, errors } = response.data.createTeam;

					if (success) {
						return history.push(`/view-team/${team.id}`);
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
