import React from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { Button, Form, Input, Modal, Checkbox } from 'semantic-ui-react';

import MultiSelectUsers from './MultiSelectUsers';

import { CREATE_CHANEL } from '../queries/channel';
import { AUTH_USER } from '../queries/user';
import validate from '../validation/createChannel';
import formatApiErrors from '../helpers/formatApiErrors';

const update = teamId => (store, { data: { createChannel } }) => {
	const { channel, success } = createChannel;

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

const AddChannelModal = ({ open, onClose, teamId, currentUserId }) => (
	<Mutation mutation={CREATE_CHANEL} update={update(teamId)}>
		{createChannel => (
			<Formik
				initialValues={{
					name: '',
					public: true,
					privateMembers: [],
				}}
				validate={validate}
				onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
					const response = await createChannel({
						variables: {
							name: values.name,
							teamId,
							privateMembers: values.privateMembers,
							public: values.public,
						},
						optimisticResponse: {
							createChannel: {
								__typename: 'Mutation',
								success: true,
								channel: {
									__typename: 'Channel',
									id: -1,
									name: values.name,
									dm: false,
								},
								errors: null,
							},
						},
					});

					setSubmitting(false);

					const { success, errors } = response.data.createChannel;

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
					setFieldValue,
				}) => (
					<Form onSubmit={handleSubmit}>
						<Modal
							open={open}
							onClose={e => {
								resetForm();
								onClose(e);
							}}
						>
							<Modal.Header>Create Channel</Modal.Header>
							<Modal.Content>
								<Form>
									<Form.Field error={!!(touched.name && errors.name)}>
										<Input
											name="name"
											fluid
											placeholder="channel name"
											value={values.name}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors && <p>{errors.name}</p>}
									</Form.Field>
									<Form.Field>
										<Checkbox
											toggle
											checked={!values.public}
											onChange={(e, { checked }) =>
												setFieldValue('public', !checked)
											}
											label="Private"
										/>
									</Form.Field>
									{!values.public && (
										<Form.Field>
											<MultiSelectUsers
												teamId={teamId}
												placeholder="Select members to invite"
												value={values.privateMembers}
												handleChange={(e, { value }) =>
													setFieldValue('privateMembers', value)
												}
												currentUserId={currentUserId}
											/>
										</Form.Field>
									)}
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
											Create
										</Button>
									</Form.Group>
								</Form>
							</Modal.Content>
						</Modal>
					</Form>
				)}
			/>
		)}
	</Mutation>
);

export default AddChannelModal;
