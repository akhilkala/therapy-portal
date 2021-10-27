import React, { ReactElement } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import Animation from "../components/Animation";
import Feedback from "../components/Feedback";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useFetch from "../hooks/useFetch";
import useInputState from "../hooks/useInputState";
import { getTherapy } from "../utils/utilities";
import Dropdown from "react-dropdown";
import { get } from "../utils/requests";
import "react-dropdown/style.css";

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
        <h1>Greetings, {auth?.user?.fullName.split(" ")[0]}</h1>
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
const options = [
  { value: "0", label: "Vision Therapy" },
  { value: "1", label: "Speech Therapy" },
  { value: "2", label: "Occupational Therapy" },
  { value: "3", label: "Play & Art Therapy" },
  { value: "4", label: "Counselling" },
  { value: "5", label: "Clinical Psycology" },
  { value: "6", label: "Special Education" },
  { value: "7", label: "Vocational Training" },
];

function UserData(): ReactElement {
  const auth = useAuth();
  const [history, setHistory] = React.useState<any>(null);
  const [therapists, setTherapists] = React.useState<any>([]);

  React.useEffect(() => {
    setHistory(getFormattedUserHistory()[0]);

    const getTherapists = async () => {
      auth?.user?.patient?.therapies.forEach(async (item: any) => {
        const therapies = await get(`/therapist-data/${item.therapist}`);
        therapies.option = options[item.therapy].label;
        console.log("INDIE", therapies);
        setTherapists((prev: any) => [...prev, therapies]);
      });
    };
    getTherapists();
  }, []);

  console.log("Therapists", therapists);

  const getFormattedUserHistory = () => {
    return auth?.user?.patient.history.map((history: any) => ({
      label: history.date.split("T")[0],
      value: history.fileUrl,
    }));
  };

  const handleHistoryChange = (option: any) => setHistory(option);
  console.log("User", auth?.user?.patient);

  return (
    <div className="user-data">
      <Animation animation="user" loop={false} width={200} height={200} />
      <div className="item">
        <h4>Full Name:</h4>
        {auth?.user?.fullName}
      </div>
      <div className="item">
        <h4>Username:</h4>
        {auth?.user?.username}
      </div>
      <div className="item">
        <h4>Age:</h4>
        {auth?.user?.patient.age}
      </div>
      <div className="item">
        <h4>Gender:</h4>
        {auth?.user?.patient.gender}
      </div>
      {!!getFormattedUserHistory().length && (
        <div className="history">
          <h4>History:</h4>
          <div className="flex">
            <Dropdown
              options={getFormattedUserHistory()}
              value={getFormattedUserHistory()[0]}
              placeholder="Select an option"
              className="dropdown"
              onChange={handleHistoryChange}
            />
            <a
              target="_blank"
              rel="noreferrer noopener"
              href={history?.value}
              className="btn"
            >
              View
            </a>
          </div>
        </div>
      )}
      <div className="item item--alt">
        <h4>Therapies needed:</h4>
        <br />
        <div className="sub-items">
          {therapists?.map((therapy: any) => (
            <div className="sub-item">
              <span>{therapy.option}</span>
              <br /> <h5>Faculty:</h5> {therapy.fullName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserReports(): ReactElement {
  const search = useInputState();
  const reportFetcher = useFetch("/reports");

  return (
    <div className="user-reports">
      <h1>Reports</h1>
      <Input
        state={search}
        placeholder="Search for Therapy / Therapist"
        icon={<i style={{ cursor: "default" }} className="fas fa-search"></i>}
      />
      <main>
        {reportFetcher.isLoading && <Animation animation="loading3" />}
        {!!reportFetcher.data && (
          <div className="cards">
            {reportFetcher.data
              .filter((report: any) => {
                const searchTerm =
                  report.therapist.fullName + " " + getTherapy(report.therapy);
                return searchTerm
                  .toLowerCase()
                  .includes(search.value.toLowerCase());
              })
              .map((report: any) => (
                <div className="report-card">
                  <div className="left">
                    <h4>
                      <span>{getTherapy(report.therapy)}</span> -{" "}
                      {report.therapist.fullName}
                    </h4>
                    <span>{`(${report.date.split("T")[0]})`}</span>
                  </div>
                  <a
                    href={report.fileUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <i className="fa fa-eye"></i>
                  </a>
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
