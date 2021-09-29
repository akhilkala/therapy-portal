import React, { ReactElement } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import Animation from "../components/Animation";
import Feedback from "../components/Feedback";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useInputState from "../hooks/useInputState";

export default function User(): ReactElement {
  const auth = useAuth();
  useDocumentTitle(`Manonaya | ${auth?.user?.username}`);
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);
  return (
    <div className="user">
      <Feedback
        open={feedbackOpen}
        handleClose={() => setFeedbackOpen(false)}
      />
      <div className="top">
        <h1>Greetings, {auth?.user?.username}</h1>
        <div className="right">
          <button onClick={() => setFeedbackOpen(true)} className="btn">
            Give Feedback
          </button>
          <button onClick={auth?.logout} className="btn logout">
            Logout <i className="fas fa-sign-in-alt"></i>
          </button>
        </div>
      </div>
      <nav>
        <NavLink exact to="/" activeClassName="active-link">
          Your Data
        </NavLink>
        <NavLink to="/user-reports" activeClassName="active-link">
          Your Reports
        </NavLink>
      </nav>
      <main>
        <Switch>
          <Route exact path="/" component={UserData} />
          <Route path="/user-reports" component={UserReports} />
        </Switch>
      </main>
    </div>
  );
}

function UserData(): ReactElement {
  return (
    <div className="user-data">
      <Animation animation="user" loop={false} width={200} height={200} />
      <div className="item">
        <h4>Full Name:</h4>
        {"Akhil Kala"}
      </div>
      <div className="item">
        <h4>Username:</h4>
        {"akhilkala"}
      </div>
      <div className="item">
        <h4>Age:</h4>
        {"20"}
      </div>
      <div className="item">
        <h4>Gender:</h4>
        {"Male"}
      </div>
      <div className="item item--alt">
        <h4>Therapies needed:</h4>
        <br />
        <div className="sub-items">
          <div className="sub-item">
            <span>Vision Therapy</span>
            <br /> <h5>Faculty:</h5> Akhil Kala
          </div>
          <div className="sub-item">
            <span>Vision Therapy</span>
            <br /> <h5>Faculty:</h5> Akhil Kala
          </div>
          <div className="sub-item">
            <span>Vision Therapy</span>
            <br /> <h5>Faculty:</h5> Akhil Kala
          </div>
        </div>
      </div>
    </div>
  );
}

function UserReports(): ReactElement {
  const search = useInputState();
  return (
    <div className="user-reports">
      <h1>Reports</h1>
      <Input
        state={search}
        placeholder="Search for Therapy / Therapist"
        icon={<i style={{ cursor: "default" }} className="fas fa-search"></i>}
      />
      <main>
        <div className="cards">
          <div className="report-card">
            <div className="left">
              <h4>
                <span>{"Vision Therapy"}</span> - {"Akhil Kala"}
              </h4>
              <span>{"(21 / 2 / 14)"}</span>
            </div>
            <i className="fa fa-eye"></i>
          </div>
          <div className="report-card">
            <div className="left">
              <h4>
                <span>{"Vision Therapy"}</span> - {"Akhil Kala"}
              </h4>
              <span>{"(21 / 2 / 14)"}</span>
            </div>
            <i className="fa fa-eye"></i>
          </div>
        </div>
      </main>
    </div>
  );
}
