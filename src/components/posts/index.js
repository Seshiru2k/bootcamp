import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const Posts = () => {
  const api = "https://jsonplaceholder.typicode.com";
  const [data, setData] = useState();
  const [postStatus, setPostStatus] = useState();
  const [patchStatus, setPatchStatus] = useState();
  const [deleteStatus, setDeleteStatus] = useState();

  // -- API
  // https://jsonplaceholder.typicode.com/posts
  // -- HTTP methods
  // GET	/posts ->> get data
  // POST	/posts ->> create new data
  // PUT	/posts/1 ->> edit one data only
  // PATCH	/posts/1 ->> edit group of data
  // DELETE	/posts/1 ->> delete data

  // data type
  // [] -> array
  // {} -> object

  // undefined/null -> no data type
  // [] -> empty

  // async
  // sync

  // flow
  // inner to outer --- xxx
  // outer to inner --- check

  const SignupSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Title is Required"),
    body: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Body is Required"),
  });

  const getPosts = () => {
    axios.get(`${api}/posts`).then(function (response) {
      setData(response?.data);
    });
  };

  const postPosts = (passValue) => {
    console.log("passValue == ", passValue);
    axios
      .post(`${api}/posts`, {
        userId: passValue?.userId,
        title: passValue?.title,
        body: passValue?.body,
      })
      .then(function (response) {
        setPostStatus(response?.status);
        console.log(response);
      });
  };

  const patchPosts = (passValue) => {
    console.log("passValue == ", passValue);
    axios
      .patch(`${api}/posts/1`, {
        userId: passValue?.userId,
        title: passValue?.title,
        body: passValue?.body,
        // body: passValue?.body, --> include one key only for PUT
      })
      .then(function (response) {
        setPatchStatus(response?.status);
      });
  };

  const deletePosts = (passValue) => {
    axios.delete(`${api}/posts/${passValue?.id}`).then(function (response) {
      setDeleteStatus(response?.status);
    });
  };

  useEffect(() => {
    getPosts();
  }, [data]);

  return (
    <div>
      <div>
        <p>GET</p>
        {data &&
          data.splice(0, 5).map((value, key) => {
            return (
              <p key={key}>
                {key}: {value?.title}
              </p>
            );
          })}
      </div>
      <br />
      <div>
        <p>POST</p>
        <Formik
          initialValues={{
            userId: "1",
            title: "",
            body: "",
          }}
          onSubmit={(values) => {
            postPosts(values);
          }}
          // add reset
          validationSchema={SignupSchema}
        >
          {({ errors, touched, values }) => (
            <Form>
              <label htmlFor="title">Title </label>
              <Field id="title" name="title" placeholder="Title" />
              <ErrorMessage style={{ color: "red" }} name="title" />
              <br />
              <label htmlFor="body">Body </label>
              <Field id="body" name="body" placeholder="Body" />
              <ErrorMessage name="body" />
              <br />
              <br />
              <button type="submit">Submit</button>
              <p>
                Status:{" "}
                {postStatus === 201 ? (
                  <span style={{ color: "green" }}>Success</span>
                ) : postStatus === 500 ? (
                  <span style={{ color: "red" }}>Failed</span>
                ) : (
                  "N/A"
                )}
              </p>
            </Form>
          )}
        </Formik>
      </div>
      <br />
      <div>
        <p>PATCH</p>
        <Formik
          initialValues={{
            userId: "1",
            title: "",
            body: "",
          }}
          onSubmit={(values) => {
            patchPosts(values);
          }}
          // add reset
          validationSchema={SignupSchema}
        >
          {({ errors, touched, values }) => (
            <Form>
              <label htmlFor="title">Title </label>
              <Field id="title" name="title" placeholder="Title" />
              <ErrorMessage style={{ color: "red" }} name="title" />
              <br />
              <label htmlFor="body">Body </label>
              <Field id="body" name="body" placeholder="Body" />
              <ErrorMessage name="body" />
              <br />
              <br />
              <button type="submit">Submit</button>
              <p>
                Status:{" "}
                {patchStatus === 200 ? (
                  <span style={{ color: "green" }}>Success</span>
                ) : patchStatus === 500 ? (
                  <span style={{ color: "red" }}>Failed</span>
                ) : (
                  "N/A"
                )}
              </p>
            </Form>
          )}
        </Formik>
      </div>
      <br />
      <div>
        <p>DELETE</p>
        <Formik
          initialValues={{
            id: "",
          }}
          onSubmit={(values) => {
            deletePosts(values);
          }}
        >
          {({ errors, touched, values }) => (
            <Form>
              <label htmlFor="id">ID </label>
              <Field id="id" name="id" placeholder="ID" />
              <ErrorMessage style={{ color: "red" }} name="id" />
              <br />
              <button type="submit">Delete</button>
              <p>
                Status:{" "}
                {deleteStatus === 200 ? (
                  <span style={{ color: "green" }}>Success</span>
                ) : deleteStatus === 500 ? (
                  <span style={{ color: "red" }}>Failed</span>
                ) : (
                  "N/A"
                )}
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Posts;