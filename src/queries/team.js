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
			errors {
				path
				message
			}
		}
	}
`;

export const MY_TEAMS = gql`
	query {
		myTeamsAsOwner {
			id
			name
			owner {
				id
			}
			channels {
				id
				name
			}
		}

		myTeamsAsMember {
			id
			name
			owner {
				id
			}
			channels {
				id
				name
			}
		}
	}
`;
