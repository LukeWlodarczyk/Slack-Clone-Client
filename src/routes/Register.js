import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { Mutation } from "react-apollo";

import {
  Container,
  Header,
  Input,
  Button,
  Form,
  Message
} from "semantic-ui-react";

import { LoginContainer as RegisterContainer } from "./Login";
import { Heading } from "./Home";

import { REGISTER_USER } from "../queries/user";

import formatApiErrors from "../helpers/formatApiErrors";
import validate from "../validation/register";

const Register = ({ history }) => (
  <Mutation mutation={REGISTER_USER}>
    {register => (
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordConf: ""
        }}
        validate={validate}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const response = await register({ variables: values });

          setSubmitting(false);

          const { success, errors } = response.data.register;

          if (success) {
            return history.push("/login");
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
          <RegisterContainer>
            <Container text>
              <Form onSubmit={handleSubmit}>
                <Heading>Register</Heading>
                <Form.Field error={!!(touched.username && errors.username)}>
                  <Input
                    fluid
                    placeholder="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Field>
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
                <Form.Field
                  error={!!(touched.passwordConf && errors.passwordConf)}
                >
                  <Input
                    fluid
                    type="password"
                    name="passwordConf"
                    placeholder="confirm password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConf}
                  />
                </Form.Field>
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
                <Link style={{ marginLeft: "1em" }} to="/login">
                  Login
                </Link>
              </Form>
              {(errors.username ||
                errors.email ||
                errors.password ||
                errors.passwordConf) && (
                <Message
                  error
                  header="There was some errors with your registration"
                  list={Object.values(errors).map(msg => msg)}
                />
              )}
            </Container>
          </RegisterContainer>
        )}
      />
    )}
  </Mutation>
);

export default Register;
