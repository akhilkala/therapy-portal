import React, { ReactElement } from "react";
import Login from "../components/Login";
import kidsImg from "../assets/kids.jpg";

interface Props {}

export default function Landing({}: Props): ReactElement {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const handleLoginClose = () => setLoginOpen(false);
  const handleLoginOpen = () => setLoginOpen(true);
  return (
    <>
      <div className="landing">
        <div
          style={{
            background: `url(${kidsImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="circle"
        ></div>
        <div className="top">
          <div className="left">
            <div className="logo"></div>
            <nav>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
          <button className="btn btn-login" onClick={handleLoginOpen}>
            Login <i className="fas fa-sign-in-alt"></i>
          </button>
        </div>
        <main>
          <h1>Manoonaya</h1>
          <h2>New Possibilites</h2>
          <p>
            We envisions a world in which children with special needs become an
            integral part of society, fully participate in social life and enjoy
            equal oppurtunities.
          </p>
          <div className="buttons">
            <a href="#services" className="btn">
              Our Services
            </a>
            <a href="#contact" className="btn">
              Contact
            </a>
          </div>
        </main>
        <a href="#about" className="bottom">
          <h4>Scroll down</h4>
          <div className="indicator"></div>
        </a>
        <Login open={loginOpen} handleClose={handleLoginClose} />
      </div>
      <div id="about" className="about">
        <h1>About us</h1>
        <p>
          Manonaya is a state-of-an-art multi-therapy center dedicated to
          empower children with special needs. It strongly asserts to focus on
          thier holistic development enabling them to be an asset to the
          inclusive Model of society. With identification, building, and
          supporting the abilities and skills of these children, generally
          considered as "differently-abled", the center works towards ensuring
          thier full participation and inclusion in society. Powered by a
          well-trained team of experienced mental health professionals and
          therapists, Manonaya is well-equiped to address any need concerning
          these children. <br />
        </p>
      </div>
      <div className="services">
        <h1>Services</h1>
      </div>
      <div className="mission">
        <h1>Our Mission</h1>
      </div>
    </>
  );
}
