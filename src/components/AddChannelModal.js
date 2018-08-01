import React from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { Button, Form, Input, Modal } from 'semantic-ui-react';

import { CREATE_CHANEL } from '../queries/channel';
import validate from '../validation/createChannel';
import formatApiErrors from '../helpers/formatApiErrors';

const AddChannelModal = ({ open, onClose, teamId }) => (
	<Mutation mutation={CREATE_CHANEL}>
		{createChannel => (
			<Formik
				initialValues={{
					name: '',
				}}
				validate={validate}
				onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
					console.log(teamId);
					const response = await createChannel({
						variables: { name: values.name, teamId },
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
										<Button fluid onClick={onClose}>
											Cancel
										</Button>
										<Button type="submit" fluid>
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
