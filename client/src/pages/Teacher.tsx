import React, { ReactElement } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import uploadImg from "../assets/upload.png";
import Input from "../components/Input";
import useInputState from "../hooks/useInputState";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useToasts } from "react-toast-notifications";
import { get, post } from "../utils/requests";
import Animation from "../components/Animation";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { getTherapy } from "../utils/utilities";

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

export default function Teacher(): ReactElement {
  useDocumentTitle("Manonaya | Therapist Panel");
  const auth = useAuth();
  return (
    <div className="teacher">
      <div className="top">
        <h1>Greetings, {auth?.user?.username}</h1>
        <button onClick={auth?.logout} className="btn">
          Logout <i className="fas fa-sign-in-alt"></i>
        </button>
      </div>
      <nav>
        <NavLink exact to="/" activeClassName="active-link">
          Patient Data
        </NavLink>
        <NavLink to="/upload-report" activeClassName="active-link">
          Upload Report
        </NavLink>
      </nav>
      <main>
        <Switch>
          <Route exact path="/" component={PatientData} />
          <Route path="/upload-report" component={UploadReport} />
        </Switch>
      </main>
    </div>
  );
}

const DEFAULT_OPTION = {
  value: "0",
  label: "Vision Therapy",
};

const DEFAULT_PLACEHOLDER = "No Report Chosen";

function UploadReport(): ReactElement {
  const username = useInputState();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [placeholder, setPlaceholder] = React.useState(DEFAULT_PLACEHOLDER);
  const [option, setOption] = React.useState(DEFAULT_OPTION);
  const [loading, setLoading] = React.useState(false);
  const { addToast } = useToasts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //@ts-ignore
    const file = fileRef.current.files[0];

    if (!username.value || !file)
      return addToast("All fields are required", { appearance: "error" });
    if (file.type !== "application/pdf")
      return addToast("File type not supported", { appearance: "error" });

    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("username", username.value);
    data.append("therapy", option.value);

    try {
      await post("/upload-report", data, {}, true);
      username.handleReset();
      return addToast("File uploaded successfully", { appearance: "success" });
    } catch (err: any) {
      return addToast(err.response.data.message, { appearance: "error" });
    } finally {
      setLoading(false);
    }
  };

  const setFileName = (e: any) => {
    setPlaceholder(e.target.files[0].name);
  };

  const handleSelect = (option: any) => {
    setOption(option);
  };

  return (
    <div className="upload-report">
      <form onSubmit={handleSubmit} className="left">
        <h1>Upload a Patient Report</h1>
        <Input state={username} placeholder="Patient Username" />
        <Dropdown
          options={options}
          value={option}
          placeholder="Select an option"
          className="dropdown"
          onChange={handleSelect}
        />
        <div className="file">
          <input
            style={{ display: "none" }}
            type="file"
            name="report"
            id="report"
            ref={fileRef}
            onChange={setFileName}
          />
          <div className="name">{placeholder}</div>
          <label htmlFor="report" className="btn">
            Upload
          </label>
        </div>
        <button disabled={loading} className="btn">
          Submit
        </button>
      </form>
      <div className="right">
        <img src={uploadImg} alt="Upload" />
      </div>
    </div>
  );
}

function PatientData(): ReactElement {
  const username = useInputState();
  const [loading, setLoading] = React.useState(false);
  const { addToast } = useToasts();
  const [data, setData] = React.useState<any>(null);
  const [history, setHistory] = React.useState<any>(null);

  React.useEffect(() => {
    if (!data) return;
    setHistory(getFormattedUserHistory()[0]);
  }, [data]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      if (!username.value)
        return addToast("Username is required", { appearance: "error" });

      const res = await get(`/user-data/${username.value}`);

      setData(res);
    } catch (err: any) {
      addToast(err.response.data.message, { appearance: "error" });
    } finally {
      setLoading(false);
    }
  };

  const getFormattedUserHistory = () => {
    if (!data) return [];
    return data?.history.map((history: any) => ({
      label: history.date.split("T")[0],
      value: history.fileUrl,
    }));
  };

  const handleHistoryChange = (option: any) => setHistory(option);

  return (
    <div className="patinet-data">
      <div className="top">
        <Input
          state={username}
          placeholder="Search for username"
          icon={<i style={{ cursor: "default" }} className="fas fa-search"></i>}
        />
        <button disabled={loading} onClick={handleSearch} className="btn">
          Search
        </button>
      </div>
      {loading && <Animation animation="loading2" />}
      {!!data && (
        <main className="main">
          <aside className="left">
            <Animation width={100} height={100} animation="user" loop={false} />{" "}
            <div className="item">
              <h4>Full Name:</h4>
              {data?.user?.fullName}
            </div>
            <div className="item">
              <h4>Username:</h4>
              {data?.user?.username}
            </div>
            <div className="item">
              <h4>Age:</h4>
              {data?.age}
            </div>
            <div className="item">
              <h4>Gender:</h4>
              {data?.gender}
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
            <div className="history">
              <h4>User History</h4>
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
          </aside>
          <aside>
            <section>
              <h4>User Reports</h4>
              <Dropdown
                options={[...options, { value: "8", label: "No Filter" }]}
                value={{ value: "8", label: "No Filter" }}
                placeholder="Select an option"
                className="dropdown"
              />
              <div className="cards">
                {data?.report
                  .filter((report: any) => {
                    return true;
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
            </section>
          </aside>
        </main>
      )}
    </div>
  );
}
