import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";

import { UserIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import formatISO9075 from "date-fns/formatISO9075";

const Details = () => {
  const { id } = useParams();

  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getNote = async () => {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API}/notes/${id}`);
      const note = await response.json();
      setNote(note);
      setLoading(false);
    };
    getNote();
  }, [id]);

  return (
    <>
      {loading ? (
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
      ) : (
        <section className="px-10 mt-10">
          <div className="text-right">
            <Link
              to={"/"}
              className="text-teal-600 font-medium border border-teal-600 px-3 py-2"
            >
              Back
            </Link>
          </div>
          <div className=" border-t-4 border-t-teal-600 shadow-lg p-3 mt-4">
            {note.cover_image && (
              <img
                src={`${import.meta.env.VITE_API}/${note.cover_image}`}
                alt={note.title}
                className="my-10 h-64 w-full object-cover"
              />
            )}
            <h3 className="text-3xl font-medium"> {note.title} </h3>
            <div className="flex gap-4 my-2">
              {note.createdAt && (
                <>
                  <p className="flex items-center gap-1 font-medium text-sm text-gray-600">
                    <UserIcon className="w-4 h-4" /> {note.author.username}
                  </p>
                  <p className="flex items-center gap-1 font-medium text-sm text-gray-600">
                    <CalendarDaysIcon className="w-4 h-4" />
                    {formatISO9075(new Date(note.createdAt), {
                      respresentation: "date",
                    })}
                  </p>
                </>
              )}
            </div>
            <p className=" text-base mt-2">{note.content}</p>
          </div>
        </section>
      )}
    </>
  );
};

export default Details;
