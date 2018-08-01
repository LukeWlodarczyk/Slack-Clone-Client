import gql from 'graphql-tag';

export const CREATE_TEAM = gql`
	mutation($name: String!) {
		createTeam(name: $name) {
			success
			team {
				id
			}
			errors {
				path
				message
			}
		}
	}
`;

export const ALL_TEAMS = gql`
	query {
		allTeams {
			id
			name
			channels {
				id
				name
			}
		}
	}
`;
