import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className=" bg-slate-200 py-4 px-10 flex items-center justify-between font-mono">
      <Link to={"/"}>
        <h1 className=" text-teal-600 font-bold text-4xl">SANote.io</h1>
      </Link>
      <div className="flex gap-3">
        <Link to={"/create"} className="text-teal-600 font-medium">
          Share Notes
        </Link>
        <Link to={"/login"} className="text-teal-600 font-medium">
          Login
        </Link>
        <Link to={"/register"} className="text-teal-600 font-medium">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
