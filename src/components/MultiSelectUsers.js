import React from 'react';
import { Query } from 'react-apollo';
import { TEAM_MEMBER } from '../queries/team';

import { Dropdown } from 'semantic-ui-react';

const MultiSelectUsers = ({ value, placeholder, handleChange, teamId }) => (
	<Query query={TEAM_MEMBER} variables={{ teamId }}>
		{({ data: { teamMembers }, loading }) => {
			return (
				<Dropdown
					value={value}
					onChange={handleChange}
					placeholder={placeholder}
					fluid
					multiple
					search
					selection
					options={teamMembers.map(tm => ({
						key: tm.id,
						value: tm.id,
						text: tm.username,
					}))}
				/>
			);
		}}
	</Query>
);

export default MultiSelectUsers;
