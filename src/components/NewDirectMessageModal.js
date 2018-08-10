import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';

import MultiSelectUsers from './MultiSelectUsers';

import { GET_OR_CREATE_CHANNEL } from '../queries/channel';
import { AUTH_USER } from '../queries/user';
import formatApiErrors from '../helpers/formatApiErrors';

const update = teamId => (store, { data: { getOrCreateChannel } }) => {
	const { channel, success } = getOrCreateChannel;

	if (!success) {
		return;
	}
	const data = store.readQuery({ query: AUTH_USER });

	const newData = JSON.parse(JSON.stringify(data));

	newData.getAuthUser.teams.find(team => {
		if (team.id === teamId) {
			team.channels = [...team.channels, channel];
		}
	});

	store.writeQuery({ query: AUTH_USER, data: newData });
};

const DirectMessageModal = ({ open, onClose, teamId, currentUserId }) => (
	<Mutation mutation={GET_OR_CREATE_CHANNEL} update={update(teamId)}>
		{getOrCreateChannel => (
			<Formik
				initialValues={{
					privateMembers: [],
				}}
				onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
					const response = await getOrCreateChannel({
						variables: {
							dmMembers: values.privateMembers,
							teamId,
						},
					});

					console.log({ response });

					setSubmitting(false);

					const { success, errors } = response.data.getOrCreateChannel;

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
					handleSubmit,
					isSubmitting,
					resetForm,
					setFieldValue,
				}) => (
					<Modal open={open} onClose={onClose}>
						<Modal.Header>New conversation</Modal.Header>
						<Modal.Content>
							<Form onSubmit={handleSubmit}>
								<Form.Field>
									<MultiSelectUsers
										teamId={teamId}
										placeholder="Select members to message"
										value={values.privateMembers}
										handleChange={(e, { value }) =>
											setFieldValue('privateMembers', value)
										}
										currentUserId={currentUserId}
									/>
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
										Create conversation
									</Button>
								</Form.Group>
							</Form>
						</Modal.Content>
					</Modal>
				)}
			/>
		)}
	</Mutation>
);

export default DirectMessageModal;
