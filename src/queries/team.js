import gql from 'graphql-tag';

export const CREATE_TEAM = gql`
	mutation($name: String!) {
		createTeam(name: $name) {
			success
			errors {
				path
				message
			}
		}
	}
`;
