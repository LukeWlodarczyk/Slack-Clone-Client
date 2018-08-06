import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const ChannelWrapper = styled.div`
	grid-column: 2;
	grid-row: 1 / 4;
	background-color: #4e3a4c;
	color: #958993;
`;

const TeamNameHeader = styled.h1`
	color: #fff;
	font-size: 20px;
`;

const SideBarList = styled.ul`
	width: 100%;
	list-style: none;
	padding-left: 0px;
`;

const paddingLeft = 'padding-left: 10px';

const SideBarListItem = styled.li`
	padding: 2px;
	${paddingLeft};
	&:hover {
		background: #3e313c;
	}
`;

const SideBarListHeader = styled.li`
	${paddingLeft};
`;

const PushLeft = styled.div`
	${paddingLeft};
`;

const Green = styled.span`
	color: #38978d;
`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');

const channel = teamId => ({ id, name }) => (
	<Link key={id} to={`/view-team/${teamId}/${id}`}>
		<SideBarListItem># {name}</SideBarListItem>
	</Link>
);

const user = teamId => ({ id, username }) => (
	<Link key={id} to={`/view-team/user/${teamId}/${id}`}>
		<SideBarListItem>
			<Bubble /> {username}
		</SideBarListItem>
	</Link>
);

export default ({
	teamName,
	teamId,
	username,
	channels,
	users,
	onAddChannelClick,
	onInvitePeopleClick,
	onNewDirectMessageClick,
	isOwner,
}) => (
	<ChannelWrapper>
		<PushLeft>
			<TeamNameHeader>{teamName}</TeamNameHeader>
			{username}
		</PushLeft>

		<div>
			<SideBarList>
				<SideBarListHeader>
					Channels{' '}
					{isOwner && <Icon onClick={onAddChannelClick} name="add circle" />}
				</SideBarListHeader>

				{channels.map(channel(teamId))}
			</SideBarList>
		</div>

		<div>
			<SideBarList>
				<SideBarListHeader>
					Direct Messages{' '}
					<Icon onClick={onNewDirectMessageClick} name="add circle" />
				</SideBarListHeader>
				{users.map(user(teamId))}
			</SideBarList>
		</div>
		{isOwner && (
			<div>
				<SideBarList>
					<SideBarListHeader>
						Invite people{' '}
						<Icon onClick={onInvitePeopleClick} name="add circle" />{' '}
					</SideBarListHeader>
				</SideBarList>
			</div>
		)}
	</ChannelWrapper>
);
