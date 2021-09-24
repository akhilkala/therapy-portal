import React, { ReactElement } from "react";
import Login from "../components/Login";

interface Props {}

export default function Landing({}: Props): ReactElement {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const handleLoginClose = () => setLoginOpen(false);
  const handleLoginOpen = () => setLoginOpen(true);

  return (
    <div className="landing">
      <div className="top">
        <div className="logo"></div>
        <nav></nav>
        <button onClick={handleLoginOpen}>login</button>
      </div>
      <h1>Manoonaya</h1>
      <Login open={loginOpen} handleClose={handleLoginClose} />
    </div>
  );
}
