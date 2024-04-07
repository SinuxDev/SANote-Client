import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className=" bg-slate-200 py-4 px-10 flex items-center justify-between font-mono">
      <Link to={"/"}>
        <h1 className=" text-teal-600 font-bold text-4xl">SANote.io</h1>
      </Link>
      <div>
        <Link to={"/create"} className="text-teal-600 font-medium">
          Share Notes
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
