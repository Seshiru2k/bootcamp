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
  contactNumber: Yup.string()
    .matches(/^[0-9]{11}$/, "Invalid Phone Number")
    .required("Contact Number is Required"),
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
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          contactNumber: "",
          email: "",
          password: "",
          birthdate: "",
          birthMonth:"",
          birthYear:"",
          gender: "",
          customGender: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          setDisplay(`Welcome ${values.firstName} ${values.contactNumber} ${values.lastName}! Your email is ${values.email}, birthdate is ${values.birthMonth} ${values.birthdate} ${values.birthYear}, and gender is ${values.gender}.`);
        }}
      >
        {({ errors, touched, values }) => (
          <Form className={styles["form-container"]}>
            <h2>Sign Up!</h2>
            <br>
            </br>
            <h4>It's quick and easy</h4>
            <br>
            </br>
            <label htmlFor="firstName" className={styles["form-label"]} >First Name</label>
            <Field id="firstName" name="firstName" placeholder="First Name" className={styles["form-input"]}/>
            <ErrorMessage name="firstName" className={styles["form-error"]} />

            <label htmlFor="lastName"className={styles["form-label"]} >Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Last Name" className={styles["form-input"]} />
            <ErrorMessage name="lastName" className={styles["form-error"]} />

            <label htmlFor="contactNumber" className={styles["form-label"]}>Contact Number</label>
            <Field id="contactNumber" name="contactNumber" placeholder="Contact Number" className={styles["form-input"]} />
            <ErrorMessage name="contactNumber" className={styles["form-error"]} />


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
            <br>
            </br>

            <label htmlFor="birthdate">Birthdate</label>
            <Field as="select" id="birthdate" name="birthdate" className={styles["form-input"]}>
              <option value="">Select</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
            {day}
            </option>
            ))}
            </Field>
            <Field as="select" id="birthMonth" name="birthMonth" className={styles["form-input"]}>
              <option value="">Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </Field>
            <Field as="select" id="birthYear" name="birthYear" className={styles["form-input"]}>
              <option value="">Year</option>
              {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
              <option key={year} value={year}>
              {year}
              </option>
              ))}
            </Field>
            <ErrorMessage name="birthdate" className={styles["form-error"]} />
            <br>
            </br>


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
