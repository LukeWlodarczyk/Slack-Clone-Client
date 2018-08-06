import React from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { Button, Form, Input, Modal } from 'semantic-ui-react';

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

const AddChannelModal = ({ open, onClose, teamId }) => (
	<Mutation mutation={CREATE_CHANEL} update={update(teamId)}>
		{createChannel => (
			<Formik
				initialValues={{
					name: '',
				}}
				validate={validate}
				onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
					const response = await createChannel({
						variables: { name: values.name, teamId },
						optimisticResponse: {
							createChannel: {
								__typename: 'Mutation',
								success: true,
								channel: {
									__typename: 'Channel',
									id: -1,
									name: values.name,
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
				}) => (
					<Form onSubmit={handleSubmit}>
						<Modal open={open} onClose={onClose}>
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
									<Form.Group widths="equal">
										<Button disabled={isSubmitting} fluid onClick={onClose}>
											Cancel
										</Button>
										<Button disabled={isSubmitting} type="submit" fluid>
											Create
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

export default AddChannelModal;
