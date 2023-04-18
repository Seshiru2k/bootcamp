import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("First Name is Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Last Name is Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is Required"),
  birthdate: Yup.date()
    .required("Birthdate is Required"),
  gender: Yup.string()
    .oneOf(['male', 'female', 'custom'], 'Invalid Gender')
    .required("Gender is Required"),
});

const SignupForm = () => {
  const [display, setDisplay] = useState();

  return (
    <div>
      <h2>Create an account</h2>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          birthdate: "",
          gender: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          setDisplay(`Welcome ${values.firstName}!`);
        }}
      >
        {({ errors, touched, values }) => (
          <Form style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="First Name" />
            <ErrorMessage name="firstName" />

            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Last Name" />
            <ErrorMessage name="lastName" />

            <label htmlFor="email">Email</label>
            <Field id="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" />

            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <ErrorMessage name="password" />

            <label htmlFor="birthdate">Birthdate</label>
            <Field
              id="birthdate"
              name="birthdate"
              type="date"
              placeholder="MM/DD/YYYY"
            />
            <ErrorMessage name="birthdate" />

            <label htmlFor="gender">Gender</label>
            <Field as="select" id="gender" name="gender">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="custom">Custom</option>
            </Field>
            <ErrorMessage name="gender" />

            <button type="submit">Create Account</button>

            {display && <p>{display}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
