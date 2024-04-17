import { useEffect, useState } from "react";
import Note from "../components/Note";
import { DNA } from "react-loader-spinner";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getNotesFromAPI = async (pageNum) => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API}/notes?page=${pageNum}`
    );
    const { notes, totalPages } = await response.json();
    setTotalPages(totalPages);
    setNotes(notes);
    setLoading(false);
  };

  useEffect(() => {
    getNotesFromAPI(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const customAlert = (message) => {
    toast.success(message, {
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
  };

  return (
    <section className="flex gap-6 px-10 mt-10 flex-wrap mx-auto w-full justify-center">
      {!loading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Note
              key={note._id}
              note={note}
              getNotesFromAPI={getNotesFromAPI}
              customAlert={customAlert}
            />
          ))}
          <div className="w-full flex items-center justify-center gap-3">
            {currentPage > 1 && (
              <button
                type="button"
                className="text-white font-medium bg-teal-600 px-3 py-1"
                onClick={handlePreviousPage}
              >
                Previous
              </button>
            )}
            {currentPage < totalPages && (
              <button
                type="button"
                className="text-white font-medium bg-teal-600 px-3 py-1"
                onClick={handleNextPage}
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full">
          <DNA
            visible={loading}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          {!loading && notes.length === 0 && <p>No notes found hi </p>}
        </div>
      )}
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
    </section>
  );
};

export default Index;
