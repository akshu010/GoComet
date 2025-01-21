/* eslint-disable no-unused-vars */
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { HEADER_IMG } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="relative flex">
      <div className="p-4 flex justify-between w-[65%] items-center">
        <div className="flex items-center pt-1 ">
          <Link to="/">
            <img src={HEADER_IMG} alt="Book My Hotel Logo" />
          </Link>
        </div>
        <ul className="hidden md:flex gap-8 lg:gap-32 xl:gap-60 text-xl">
          <li className="hover:text-blue-500 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-blue-500 cursor-pointer">
            <Link to="/">Hotels</Link>
          </li>
          <li className="hover:text-blue-500 cursor-pointer">
            <Link to="/">Places</Link>
          </li>
        </ul>
      </div>
        <div className="flex justify-end pt-2 absolute right-5 w-[20%]">
          <img className="h-8 md:h-12" src={user?.photoURL} alt="" />
          <button
            onClick={handleSignOut}
            className="pl-2 hover:text-blue-500 text-sm md:text-base"
          >
            {user?.displayName ? (
              <span className="hidden md:inline">{`Sign Out, ${user.displayName}`}</span>
            ) : (
              "Sign Out"
            )}
          </button>
        </div>
    </div>
  );
};

export default Header;
