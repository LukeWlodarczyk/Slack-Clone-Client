import React from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { Button, Form, Input, Modal } from 'semantic-ui-react';

import { ADD_TEAM_MEMBER } from '../queries/team';
import formatApiErrors from '../helpers/formatApiErrors';

const InvitePeopleModal = ({ open, onClose, teamId }) => (
	<Mutation mutation={ADD_TEAM_MEMBER}>
		{addTeamMember => (
			<Formik
				initialValues={{
					email: '',
				}}
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
				}) => (
					<Form onSubmit={handleSubmit}>
						<Modal open={open} onClose={onClose}>
							<Modal.Header>Add people to your team</Modal.Header>
							<Modal.Content>
								<Form>
									<Form.Field error={!!(touched.name && errors.name)}>
										<Input
											name="email"
											fluid
											placeholder="email"
											value={values.email}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors && <p>{errors.email}</p>}
									</Form.Field>
									<Form.Group widths="equal">
										<Button disabled={isSubmitting} fluid onClick={onClose}>
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
