import { gql } from 'apollo-boost';

export const ALL_USERS = gql`
	query {
		allUsers {
			id
			username
		}
	}
`;

export const REGISTER_USER = gql`
	mutation($username: String!, $email: String!, $password: String!) {
		register(username: $username, email: $email, password: $password) {
			success
			errors {
				path
				message
			}
		}
	}
`;
