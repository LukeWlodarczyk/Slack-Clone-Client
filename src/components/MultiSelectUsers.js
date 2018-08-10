import React from 'react';
import { Query } from 'react-apollo';
import { TEAM_MEMBER } from '../queries/team';

import { Dropdown } from 'semantic-ui-react';

const MultiSelectUsers = ({
	value,
	placeholder,
	handleChange,
	teamId,
	currentUserId,
}) => (
	<Query query={TEAM_MEMBER} variables={{ teamId }}>
		{({ data: { teamMembers }, loading }) =>
			loading ? null : (
				<Dropdown
					value={value}
					onChange={handleChange}
					placeholder={placeholder}
					fluid
					multiple
					search
					selection
					options={teamMembers
						.filter(tm => tm.id !== currentUserId)
						.map(tm => ({
							key: tm.id,
							value: tm.id,
							text: tm.username,
						}))}
				/>
			)
		}
	</Query>
);

export default MultiSelectUsers;
