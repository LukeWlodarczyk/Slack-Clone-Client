import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { Formik } from 'formik';

import { Mutation } from 'react-apollo';

import { CREATE_MESSAGE } from '../queries/message';
import formatApiErrors from '../helpers/formatApiErrors';

const SendMessageWrapper = styled.div`
	grid-column: 3;
	grid-row: 3;
	margin: 20px;
`;

const ENTER_KEY = 13;

const SendMessage = ({ channelName, channelId }) => (
	<Mutation mutation={CREATE_MESSAGE}>
		{createMessage => (
			<Formik
				initialValues={{
					text: '',
				}}
				onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
					if (!values.text || !values.text.trim()) {
						return setSubmitting(false);
					}
					const response = await createMessage({
						variables: { text: values.text, channelId },
					});

					setSubmitting(false);

					const { success, errors } = response.data.createMessage;

					if (success) {
						return resetForm();
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
					<SendMessageWrapper>
						<Input
							fluid
							placeholder={`Message #${channelName}`}
							name="text"
							value={values.text}
							onChange={handleChange}
							onBlur={handleBlur}
							onKeyDown={e => {
								if (e.keyCode === ENTER_KEY && !isSubmitting) {
									handleSubmit();
								}
							}}
						/>
					</SendMessageWrapper>
				)}
			/>
		)}
	</Mutation>
);

export default SendMessage;
