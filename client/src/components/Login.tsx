import React, { ReactElement } from "react";
import Modal from "react-modal";
import loginVector from "../assets/login.jpg";
import { useAuth } from "../context/AuthContext";
import useInputState from "../hooks/useInputState";
import Input from "./Input";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function Login({ open, handleClose }: Props): ReactElement {
  const username = useInputState();
  const password = useInputState();
  const auth = useAuth();
  const [error, setError] = React.useState("");

  const closeHandler = () => {
    setError("");
    handleClose();
  };

  const handleSubmit = async () => {
    setError("");
    if (!username.value || !password.value)
      return setError("All fields are required");
    try {
      await auth?.login(username.value, password.value);
    } catch (err: any) {
      setError(err.response.data.message);
      username.handleReset();
      password.handleReset();
    }
  };

  return (
    <div>
      <Modal
        onRequestClose={closeHandler}
        className="login"
        overlayClassName="overlay"
        isOpen={open}
      >
        <aside className="left">
          <img src={loginVector} alt="Login" />
        </aside>
        <aside className="right">
          <h2>Login</h2>
          <h1>
            Hi, <span>Welcome!</span>
          </h1>
          {!!error && <div className="error">{error}</div>}
          <Input state={username} placeholder="Username" underline />
          <Input
            state={password}
            placeholder="Password"
            type="password"
            underline
          />
          <button onClick={handleSubmit} className="btn">
            Login <i className="fas fa-sign-in-alt"></i>
          </button>
        </aside>
      </Modal>
    </div>
  );
}
