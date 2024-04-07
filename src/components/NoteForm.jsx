import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link, Navigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

//formik custom error message
import CustomStyleErrorMessage from "./CustomStyleErrorMessage";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoteForm = ({ isCreate }) => {
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const [initialValues, setInitivalValues] = useState({});

  const { id } = useParams();

  const getOldNote = useCallback(async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/edit/${id}`);
    if (response.status === 200) {
      const data = await response.json();
      setOldNote(data);
    } else {
      setRedirect(true);
    }
  }, [id]);

  useEffect(() => {
    if (!isCreate) {
      getOldNote();
    }
  }, [isCreate, getOldNote]);

  useEffect(() => {
    if (oldNote && !isCreate) {
      setInitivalValues({
        title: oldNote.title,
        content: oldNote.content,
        note_id: oldNote._id,
      });
    } else {
      setInitivalValues({
        title: "",
        content: "",
        note_id: "",
      });
    }
  }, [oldNote, isCreate]);

  //Yup validation
  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required!"),
    content: Yup.string()
      .min(5, "Content must be at least 5 characters")
      .required("Content is required!"),
  });

  // In this method (values) is the form input box
  const submitHandler = async (values) => {
    let API = `${import.meta.env.VITE_API}`;

    if (isCreate) {
      API = `${import.meta.env.VITE_API}/create`;
    } else {
      API = `${import.meta.env.VITE_API}/edit-note/${values.note_id}`;
    }

    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status === 201 || response.status == 200) {
      setRedirect(true);
    } else {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
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
        enableReinitialize={true}
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
            <Field type="text" name="note_id" id="note_id" hidden />
            <button
              type="submit"
              className="text-white bg-teal-600 py-3 font-medium w-full"
            >
              {isCreate ? "Save Note" : "Update Note"}
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
