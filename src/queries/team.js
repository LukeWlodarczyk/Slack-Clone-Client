import gql from 'graphql-tag';

export const CREATE_TEAM = gql`
	mutation($name: String!) {
		createTeam(name: $name) {
			success
			team {
				id
				name
				channels {
					id
					name
				}
			}
			errors {
				path
				message
			}
		}
	}
`;

export const ADD_TEAM_MEMBER = gql`
	mutation($teamId: ID!, $email: String!) {
		addTeamMember(teamId: $teamId, email: $email) {
			success
			user {
				username
				id
			}
			errors {
				path
				message
			}
		}
	}
`;

export const TEAM_MEMBER = gql`
	query($teamId: ID!) {
		teamMembers(teamId: $teamId) {
			id
			username
		}
	}
`;
