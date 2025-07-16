import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context";
import { Skeleton_Loader } from "../component_Admin/loader/Skeleton";

export default function RedirectIfLoggedIn({ children }) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) return null;

  const { loginData, isAuthLoading } = authContext;

  useEffect(() => {
    if (!isAuthLoading && loginData) {
      if (loginData.role === "admin") {
        navigate("/MasterAdmin");
      } else if (loginData.role === "user") {
        navigate("/MasterUser");
      }
    }
  }, [loginData, isAuthLoading, navigate]);


  if (isAuthLoading) return <Skeleton_Loader />;

  return children;
}
