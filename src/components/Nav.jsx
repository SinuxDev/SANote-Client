import { Link } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../contexts/UserContext";

const Nav = () => {
  const { token, updateToken } = useContext(UserContext);

  const logoutHandler = () => {
    updateToken(null);
  };

  return (
    <nav className="bg-slate-200 py-4 px-10 font-mono ">
      <div className=" flex items-center justify-between ">
        <Link to={"/"}>
          <h1 className=" text-teal-600 font-bold text-4xl">SANote.io</h1>
        </Link>
        <div className="flex gap-3">
          {token ? (
            <>
              <Link to={"/create"} className="text-teal-600 font-medium">
                Share Notes
              </Link>
              <p
                className="text-teal-600 font-medium cursor-pointer"
                onClick={logoutHandler}
              >
                Logout
              </p>
            </>
          ) : (
            <>
              <Link to={"/login"} className="text-teal-600 font-medium">
                Login
              </Link>
              <Link to={"/register"} className="text-teal-600 font-medium">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {token && token.userName && (
        <p className="text-right text-sm text-teal-600">
          <span className="font-semibold">Login as </span> {token.userName}{" "}
        </p>
      )}
    </nav>
  );
};

export default Nav;
