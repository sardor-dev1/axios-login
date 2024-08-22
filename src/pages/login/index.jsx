import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, setUserError } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import "daisyui/dist/full.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (!response.ok) {
        throw new Error("User login failed!");
      }
      const userData = await response.json();
      dispatch(addUser(userData));
      navigate("/my-account");
    } catch (error) {
      dispatch(setUserError(error.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                id="username"
                type="text"
                placeholder="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`}
              disabled={!(userName && password) || loading}
            >
              {loading ? "In process..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
