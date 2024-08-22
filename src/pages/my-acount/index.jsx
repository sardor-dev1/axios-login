import { useNavigate } from "react-router-dom";
const index = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-center">MY acount</h1>
      <button onClick={() => navigate("/")}>home</button>
    </div>
  );
};

export default index;
