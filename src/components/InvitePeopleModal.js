import React from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { Button, Form, Input, Modal } from 'semantic-ui-react';

import { ADD_TEAM_MEMBER, TEAM_MEMBER } from '../queries/team';
import formatApiErrors from '../helpers/formatApiErrors';
import validate from '../validation/invitePeople';

const update = teamId => (store, { data: { addTeamMember } }) => {
	const { success, user } = addTeamMember;

	if (!success) {
		return;
	}

	const data = store.readQuery({
		query: TEAM_MEMBER,
		variables: { teamId },
	});

	const newData = JSON.parse(JSON.stringify(data));

	newData.teamMembers.push(user);

	store.writeQuery({
		query: TEAM_MEMBER,
		variables: { teamId },
		data: newData,
	});
};

const InvitePeopleModal = ({ open, onClose, teamId }) => (
	<Mutation mutation={ADD_TEAM_MEMBER} update={update(teamId)}>
		{addTeamMember => (
			<Formik
				initialValues={{
					email: '',
				}}
				validate={validate}
				onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
					const response = await addTeamMember({
						variables: { email: values.email, teamId },
					});

					setSubmitting(false);

					const { success, errors } = response.data.addTeamMember;

					if (success) {
						resetForm();
						return onClose();
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
					resetForm,
				}) => (
					<Form onSubmit={handleSubmit}>
						<Modal
							open={open}
							onClose={e => {
								resetForm();
								onClose(e);
							}}
						>
							<Modal.Header>Add people to your team</Modal.Header>
							<Modal.Content>
								<Form>
									<Form.Field error={!!(touched.email && errors.email)}>
										<Input
											name="email"
											fluid
											placeholder="email"
											value={values.email}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{touched.email && errors.email && <p>{errors.email}</p>}
									</Form.Field>
									<Form.Group widths="equal">
										<Button
											disabled={isSubmitting}
											fluid
											onClick={e => {
												resetForm();
												onClose(e);
											}}
										>
											Cancel
										</Button>
										<Button disabled={isSubmitting} type="submit" fluid>
											Add user
										</Button>
									</Form.Group>
								</Form>
							</Modal.Content>
						</Modal>;
					</Form>
				)}
			/>
		)}
	</Mutation>
);

export default InvitePeopleModal;
