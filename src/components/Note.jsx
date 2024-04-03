import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Note = () => {
  return (
    <div className=" w-2/5 border-t-4 border-t-teal-600 shadow-lg p-3">
      <h3 className="text-xl font-medium">Lorem ipsum dolor sit amet</h3>
      <p className=" text-sm">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis quia
        laborum iusto, impedit ducimus ullam hic eligendi nisi ut fugit.
      </p>
      <div className="flex items-center justify-end gap-2">
        <TrashIcon width={17} className="text-red-600" />
        <Link to={"/edit/1"}>
          <PencilSquareIcon width={17} className="text-teal-600" />
        </Link>
        <Link to={"notes/1"}>
          <EyeIcon width={17} className="text-gray-500" />
        </Link>
      </div>
    </div>
  );
};

export default Note;
