import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

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

const paddingLeft = "padding-left: 10px";

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

const InteractionIcon = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : "○");

const channel = teamId => ({ id, name }) => (
  <Link key={id} to={`/view-team/${teamId}/${id}`}>
    <SideBarListItem># {name}</SideBarListItem>
  </Link>
);

const dmChannel = (teamId, username) => ({ id, name }) => (
  <Link key={id} to={`/view-team/${teamId}/${id}`}>
    <SideBarListItem>
      <Bubble />{" "}
      {name
        .split(", ")
        .filter(name => name !== username)
        .join(", ")}
    </SideBarListItem>
  </Link>
);

export default ({
  teamName,
  teamId,
  username,
  channels,
  dmChannels,
  onAddChannelClick,
  onInvitePeopleClick,
  onNewDirectMessageClick,
  isOwner
}) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
    </PushLeft>

    <div>
      <SideBarList>
        <SideBarListHeader>
          Channels{" "}
          {isOwner && (
            <InteractionIcon>
              <Icon onClick={onAddChannelClick} name="add circle" />
            </InteractionIcon>
          )}
        </SideBarListHeader>

        {channels.map(channel(teamId))}
      </SideBarList>
    </div>

    <div>
      <SideBarList>
        <SideBarListHeader>
          Direct Messages{" "}
          <InteractionIcon>
            <Icon onClick={onNewDirectMessageClick} name="add circle" />
          </InteractionIcon>
        </SideBarListHeader>
        {dmChannels.map(dmChannel(teamId, username))}
      </SideBarList>
    </div>
    {isOwner && (
      <div>
        <SideBarList>
          <SideBarListHeader>
            Invite people{" "}
            <InteractionIcon>
              <Icon onClick={onInvitePeopleClick} name="add circle" />
            </InteractionIcon>
          </SideBarListHeader>
        </SideBarList>
      </div>
    )}
  </ChannelWrapper>
);
