import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #53384c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3em;
`;

export const Heading = styled.h1`
  font-size: 3em;
  color: #958993;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.ul`
  padding: 0.3em;
  font-size: 1.2em;
`;

const Home = () => (
  <HomeContainer>
    <Heading>Slack Clone</Heading>
    <List>
      <ListItem>
        <Link to="/view-team">Enter the chat</Link>
      </ListItem>
      <ListItem>
        <Link to="/login">Login</Link>
      </ListItem>
      <ListItem>
        <Link to="/register">Register</Link>
      </ListItem>
    </List>
  </HomeContainer>
);

export default Home;
