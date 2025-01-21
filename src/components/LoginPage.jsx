/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import checkValidateData from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { LOGIN_IMG, LOGIN_PAGE_BG } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    console.log(message);
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/");
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: { LOGIN_IMG },
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                })
              );
              navigate("/");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("User not found");
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          console.log(user);
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("User not found");
        });
    }
  };
  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${LOGIN_PAGE_BG})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col bg-white bg-opacity-80 p-8 rounded-lg shadow-lg space-y-4 z-[10000]"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isSignInForm ? "Sign in" : "Sign up"}
        </h2>
        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="ml-2 text-lg font-semibold text-red-500">
          {errorMessage}
        </p>
        <button
          onClick={handleButtonClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSignInForm ? "Sign in" : "Sign up"}
        </button>
        <button onClick={toggleSignInForm}>
          {" "}
          <p className="text-blue-800">
            {" "}
            {isSignInForm
              ? "New here? Sign Up now...."
              : "Already a user? Sign in here.."}
          </p>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
