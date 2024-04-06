import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import formatISO9075 from "date-fns/formatISO9075";

const Note = ({ note }) => {
  const { _id, title, content, createdAt } = note;
  return (
    <div className=" w-2/5 border-t-4 border-t-teal-600 shadow-lg p-3 h-f">
      <h3 className="text-xl font-medium">{title}</h3>
      <p className=" text-sm">{content.slice(0, 80)} ...</p>
      <div className="flex items-center justify-between mt-2 border-t-2 border-red-300 pt-2">
        <p className=" text-small font-medium">
          {formatISO9075(new Date(createdAt), { representation: "date" })}{" "}
        </p>
        <div className="flex items-center justify-end gap-2">
          <TrashIcon width={17} className="text-red-600" />
          <Link to={"/edit/" + _id}>
            <PencilSquareIcon width={17} className="text-teal-600" />
          </Link>
          <Link to={"notes/" + _id}>
            <EyeIcon width={17} className="text-gray-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

Note.propTypes = {
  note: PropTypes.bool.isRequired,
};

export default Note;
