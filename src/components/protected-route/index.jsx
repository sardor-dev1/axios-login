import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MyAccount from "../../pages/my-acount";

const ProtectedRoute = () => {
  const { userData } = useSelector((state) => state.user);
  console.log("userData", userData);

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return <MyAccount />;
};

export default ProtectedRoute;
