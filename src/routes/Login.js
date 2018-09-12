import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import styled from "styled-components";

import { wsLink } from "../apollo";

import { Container, Form, Input, Button, Message } from "semantic-ui-react";

import { LOGIN_USER } from "../queries/user";

import formatApiErrors from "../helpers/formatApiErrors";
import validate from "../validation/login";

import { Heading } from "./Home";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #53384c;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3em;
`;

const Login = ({ history }) => (
  <Mutation mutation={LOGIN_USER}>
    {login => (
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validate={validate}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const response = await login({ variables: values });

          setSubmitting(false);

          const { success, token, refreshToken, errors } = response.data.login;

          if (success) {
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            wsLink.subscriptionClient.tryReconnect();
            return history.push("/view-team");
          }

          setErrors(formatApiErrors(errors));
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <LoginContainer>
            <Container text>
              <Form onSubmit={handleSubmit}>
                <Heading>Login</Heading>
                <Form.Field error={!!(touched.email && errors.email)}>
                  <Input
                    fluid
                    type="email"
                    placeholder="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Field>
                <Form.Field error={!!(touched.password && errors.password)}>
                  <Input
                    fluid
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </Form.Field>

                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
                <Link style={{ marginLeft: "1em" }} to="/register">
                  Register
                </Link>
              </Form>
              {(errors.email || errors.password) && (
                <Message
                  error
                  header="There was some errors with your login"
                  list={Object.values(errors).map(msg => msg)}
                />
              )}
            </Container>
          </LoginContainer>
        )}
      />
    )}
  </Mutation>
);

export default Login;
