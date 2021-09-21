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

  const handleSubmit = async () => {
    // await auth?.login();
  };

  return (
    <div>
      <Modal
        onRequestClose={handleClose}
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
