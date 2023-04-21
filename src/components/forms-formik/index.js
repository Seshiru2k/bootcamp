import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from '@styles/formstyle.module.css'


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
    <div className={styles.formContainer}>
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
          setDisplay(`Welcome ${values.firstName} ${values.lastName}! Your email is ${values.email}, birthdate is ${values.birthdate}, and gender is ${values.gender}.`);
        }}
      >
        {({ errors, touched, values }) => (
          <Form className={styles["form-container"]}>
            <label htmlFor="firstName" className={styles["form-label"]} >First Name</label>
            <Field id="firstName" name="firstName" placeholder="First Name" className={styles["form-input"]}/>
            <ErrorMessage name="firstName" className={styles["form-error"]} />

            <label htmlFor="lastName"className={styles["form-label"]} >Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Last Name" className={styles["form-input"]} />
            <ErrorMessage name="lastName" className={styles["form-error"]} />

            <label htmlFor="email" className={styles["form-label"]} >Email</label>
            <Field id="email" name="email" placeholder="Email" className={styles["form-input"]} />
            <ErrorMessage name="email" className={styles["form-error"]} />

            <label htmlFor="password" className={styles["form-label"]} >Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className={styles["form-input"]}
            />
            <ErrorMessage name="password" className={styles["form-error"]} />

            <label htmlFor="birthdate">Birthdate</label>
            <Field
              id="birthdate"
              name="birthdate"
              type="date"
              placeholder="MM/DD/YYYY"
              className={styles["form-input"]}
            />
            <ErrorMessage name="birthdate" className={styles["form-error"]} />

            <label htmlFor="gender">Gender</label>
            <Field as="select" id="gender" name="gender">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="custom">Custom</option>
              className={styles["form-input"]}
            </Field>
            <ErrorMessage name="gender" className={styles["form-error"]}/>

            <button type="submit" className={styles["form-submit"]}>Sign Up</button>

            {display && <p className={styles.success}>{display}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
