import { gql } from 'apollo-boost';

export const ALL_USERS = gql`
	query {
		allUsers {
			id
			username
		}
	}
`;
