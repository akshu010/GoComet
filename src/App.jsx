import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./utils/firebase";
import { addUser, removeUser } from "./utils/userSlice";
import HomePage from "./components/HomePage";
import HotelPage from "./components/HotelPage";
import BookingPage from "./components/BookingPage";
import ErrorPage from "./components/Error";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";

const ProtectedRoute = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <RouterProvider router={appRouter} />;
};

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "hotel/:hotelId",
        element: <HotelPage />,
      },
      {
        path: "booking/:hotelId",
        element: <BookingPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default App;
