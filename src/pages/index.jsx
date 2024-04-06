import { useEffect, useState } from "react";
import Note from "../components/Note";
import Plus from "../components/Plus";
import { DNA } from "react-loader-spinner";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNotesFromAPI = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes`);
    const data = await response.json();
    setNotes(data);
    setLoading(false);
  };

  useEffect(() => {
    getNotesFromAPI();
  }, []);

  return (
    <section className=" flex gap-6 px-10 mt-10 flex-wrap">
      {!loading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </>
      ) : (
        <div className="flex justify-center items-center w-full">
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
      <Plus />
    </section>
  );
};

export default Index;
