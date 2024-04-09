import {
  ArrowLeftEndOnRectangleIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
import { Link, Navigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

//formik custom error message
import CustomStyleErrorMessage from "./CustomStyleErrorMessage";
import { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoteForm = ({ isCreate }) => {
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const [initialValues, setInitivalValues] = useState({});
  const [previewImg, setPreviewImg] = useState(null);
  const fileRef = useRef();

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
        cover_image: oldNote.cover_image,
      });
    } else {
      setInitivalValues({
        title: "",
        content: "",
        note_id: "",
        cover_image: null,
      });
    }
  }, [oldNote, isCreate]);

  //Validation for upload image
  const SUPPORTED_FORMAT = ["image/jpg", "image/jpeg", "image/png"];

  //Yup validation
  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required!"),
    content: Yup.string()
      .min(5, "Content must be at least 5 characters")
      .required("Content is required!"),
    cover_image: Yup.mixed()
      .nullable()
      .test("FILE_FORMAT", "Invalid file format", (value) => {
        return !value || SUPPORTED_FORMAT.includes(value.type);
      }),
  });

  //Method to display preview image
  const handleImageChange = (event, setFieldValue) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setPreviewImg(URL.createObjectURL(selectedImage));
      setFieldValue("cover_image", selectedImage);
    }
  };

  //Method to clear preview image
  const clearPreviewImg = (setFieldValue) => {
    setPreviewImg(null);
    setFieldValue("cover_image", null);
  };

  // In this method (values) is the form input box
  const submitHandler = async (values) => {
    let API = `${import.meta.env.VITE_API}`;

    if (isCreate) {
      API = `${import.meta.env.VITE_API}/create`;
    } else {
      API = `${import.meta.env.VITE_API}/edit-note/${values.note_id}`;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("cover_image", values.cover_image);
    formData.append("note_id", values.note_id);

    const response = await fetch(API, {
      method: "POST",
      body: formData,
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
        {({ setFieldValue }) => (
          <Form encType="multipart/form-data">
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

            <div className="mb-3">
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
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <label htmlFor="cover_image" className=" font-medium block">
                  Cover Image
                  <span className="text-xs font-medium">optional</span>
                </label>
                {previewImg && (
                  <p
                    className="text-base font-medium text-teal-600 cursor-pointer"
                    onClick={() => clearPreviewImg(setFieldValue)}
                  >
                    clear
                  </p>
                )}
              </div>
              <input
                type="file"
                name="cover_image"
                hidden
                ref={fileRef}
                onChange={(e) => {
                  handleImageChange(e, setFieldValue);
                }}
              />
              <div
                className="border border-teal-600 flex items-center justify-center text-teal-950 border-dashed h-60 cursor-pointer rounded-lg relative overflow-hidden"
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                <ArrowUpTrayIcon width={30} height={30} className="z-20" />
                {isCreate ? (
                  <>
                    {previewImg && (
                      <img
                        src={previewImg}
                        alt={"preview"}
                        className="w-full absolute top-0 left-0 h-full object-cover opactiy-80 z-10"
                      />
                    )}
                  </>
                ) : (
                  <>
                    {previewImg ? (
                      <img
                        src={previewImg}
                        className="w-full absolute top-0 left-0 h-full object-cover opactiy-80 z-10"
                      />
                    ) : (
                      <img
                        src={`${import.meta.env.VITE_API}/${
                          oldNote.cover_image
                        }`}
                        className="w-full absolute top-0 left-0 h-full object-cover opactiy-80 z-10"
                      />
                    )}
                  </>
                )}
              </div>
              <CustomStyleErrorMessage name="cover_image" />
            </div>
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
