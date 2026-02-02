import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [redirect, setRedirect] = useState(false);
  const authCookie = Cookies.get("authToken"); // Replace with your cookie name

  if (!authCookie) {
    // If cookie doesn't exist, redirect to login
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const verifyToken = async () => {
      const res = await fetch("http://localhost:3000/account/verify", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authCookie}`,
        },
      });

      if (res.status !== 200) {
        setRedirect(true);
      }
    };

    verifyToken();
  }, [authCookie]);

  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return children; // Render the protected component
};

export default ProtectedRoute;

