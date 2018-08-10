import gql from 'graphql-tag';

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

export const LOGIN_USER = gql`
	mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			success
			token
			refreshToken
			errors {
				path
				message
			}
		}
	}
`;

export const AUTH_USER = gql`
	query {
		getAuthUser {
			id
			username
			teams {
				id
				admin
				name
				directMessageMembers {
					id
					username
				}
				channels {
					id
					name
					dm
				}
			}
		}
	}
`;

export const AUTH_USER_WITH_DIRECT_MESSAGE = gql`
	query($userId: ID!) {
		getUserById(userId: $userId) {
			username
			id
		}

		getAuthUser {
			id
			username
			teams {
				id
				admin
				name
				directMessageMembers {
					id
					username
				}
				channels {
					id
					name
				}
			}
		}
	}
`;
