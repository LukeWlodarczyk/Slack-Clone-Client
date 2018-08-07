import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { Formik } from 'formik';

import { Mutation } from 'react-apollo';

import formatApiErrors from '../helpers/formatApiErrors';

const SendMessageWrapper = styled.div`
	grid-column: 3;
	grid-row: 3;
	margin: 20px;
`;

const ENTER_KEY = 13;

const SendMessage = ({
	MUTATION,
	mutationName,
	variables,
	optimisticResponse,
	update,
	placeholder,
}) => (
	<Mutation mutation={MUTATION}>
		{mutate => (
			<Formik
				initialValues={{
					text: '',
				}}
				onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
					if (!values.text || !values.text.trim()) {
						return setSubmitting(false);
					}

					const opts = {
						variables: variables(values.text),
					};

					optimisticResponse && (opts.optimisticResponse = optimisticResponse);
					update && (opts.update = update);

					const response = await mutate(opts);

					setSubmitting(false);

					const { success, errors } = response.data[mutationName];

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
							placeholder={`Message #${placeholder}`}
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
