import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

//formik custom error message
import CustomStyleErrorMessage from "./CustomStyleErrorMessage";

const NoteForm = ({ isCreate }) => {
  const initialValues = {
    title: "",
    content: "",
  };

  //Yup validation
  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(10, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required!"),
    content: Yup.string()
      .min(5, "Content must be at least 5 characters")
      .required("Content is required!"),
  });

  //This method has initial values
  // const validate = (values) => {
  //   const errors = {};

  //   if (values.title.trim().length < 10) {
  //     errors.title = "Title must be at least 10 characters";
  //   }

  //   if (values.content.trim().length < 10) {
  //     errors.content = "Content must be at least 10 characters";
  //   }

  //   return errors;
  // };

  // In this method (values) is the form input box
  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">
          {isCreate ? "Create a new note" : "Edit your note"}
        </h1>
        <Link to={"/"}>
          <ArrowLeftEndOnRectangleIcon width={22} />
        </Link>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={submitHandler}
      >
        {() => (
          <Form>
            <div className="mb-3">
              <label htmlFor="title" className=" font-medium block">
                Note Title
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
              />
              <CustomStyleErrorMessage name="title" />
            </div>
            <div className="">
              <label htmlFor="content" className=" font-medium block">
                Note content
              </label>
              <Field
                as="textarea"
                rows={10}
                type="text"
                name="content"
                id="content"
                className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg resize-none"
              />
              <CustomStyleErrorMessage name="content" />
            </div>
            <button
              type="submit"
              className="text-white bg-teal-600 py-3 font-medium w-full"
            >
              Save Note
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

NoteForm.propTypes = {
  isCreate: PropTypes.bool.isRequired,
};

export default NoteForm;
